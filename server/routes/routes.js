const express = require('express');
const router = express.Router();
const User = require("../models/User"); 
const { plaidClient, Products } = require('../config/plaidConfig');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const authMiddleware = require("../middleware/authMiddleware");
const SECRET_KEY = process.env.JWT_SECRET_KEY

// stole this from plaid quickstart
const PLAID_PRODUCTS = (process.env.PLAID_PRODUCTS || Products.Transactions).split(
  ',',
);

const PLAID_COUNTRY_CODES = (process.env.PLAID_COUNTRY_CODES || 'US').split(
  ',',
);

/*    ********        AUTH ENDPOINTS        *******       */

//200
router.post("/signup", async (req, res) => {
  let { firstName,
        lastName,
        email, 
        password 
      } = req.body;

    try {

      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).send({ message: "User exists" });
      };

      //hashing --> bcrypt 
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      let newUser = new User({ firstName, lastName, email, password: hashedPassword });
      const user = await newUser.save();

      const token = jwt.sign({ userId: user.userId }, SECRET_KEY, {expiresIn: "3h" });

      console.log("User created with ID:", user.userId);
      res.status(200).send({ message: `User created with ID: ${user.userId}`, userId: user.userId, token });
    } catch (error) {
      res.status(500).send({ message: `Error creating user: ${error.message}` });
    }
});

//200 (psuedo 400)  
router.post("/login", async (req, res) => {
  let { 
        email, 
        password 
      } = req.body;

  try {
    const user = await User.findOne({ email });
    console.log('User found:', user);

    if (!user) {
      return res.status(400).send({ message: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    console.log('Password match:', isMatch);

    if (!isMatch) {
      return res.status(400).send({ message: "Invalid email or password" });
    }

    const token = jwt.sign({ userId: user.userId }, process.env.JWT_SECRET_KEY, { expiresIn: "1h" });

    console.log("Login successful for user ID:", user.userId);
    res.status(200).send({ message: "Login successful", userId: user.userId, token });

  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).send({ message: `Error during login: ${error.message}` });
  }
});


/// DELETE ONCE POST CI/CD PIPELINE IS BUILT ///
router.get('/', async (req, res) => {
  try{
    await res.send({ message: "hi Test endpoint"})
  } catch (error) {
    res.status(500).json({
      message: error.message
  });
  }
});

router.get('/getUser/:id',  async (req, res) => {

  try{
    const user = await User.findOne({ userId: req.params.id });

    if(!user) {

      return res.status(404).send({ message: "user not found" });
    }

    res.json({ firstName: user.firstName,
               lastName: user.lastName,
               email: user.email
     });

  } catch(error){
      res.status(500).json({
          message: error.message
      });
  }
});

router.post('/logout',  (req, res) => {
  res.send({ messeage: "Logout successful" });
});

/*    ********        ********        *******       */



/*    ********        PLAID ENDPOINTS        *******       */
//200
router.post("/create_link_token", authMiddleware, async (req, res) => {
  const { uid } = req.body;

  if (!uid && !req.user?.userId) {
    return res.status(400).json({ error: "User ID is required" });
  }

  try {
    const userId = req.user?.userId || uid;

    console.log("Received UID:", userId);

    const response = await plaidClient.linkTokenCreate({
      client_id: process.env.PLAID_CLIENT_ID,
      secret: process.env.PLAID_SECRET,
      user: {
        client_user_id: userId,
      },
      client_name: "SmartWallet",
      products: PLAID_PRODUCTS,
      country_codes: PLAID_COUNTRY_CODES,
      language: "en",
    });

    res.json({ link_token: response.data.link_token });
  } catch (error) {
    console.error('Create Token Error:', error.response?.data || error);
    res.status(500).json({ error: "Can't Create Public Token" });
  }
});


// 200 (For testing REQUIRES public token, no real reason to save this in a db, public tokens expire in about 30 mins.)
// works client-side
router.post('/get_access_token', async (req, res) => {
  const { public_token } = req.body;
  try {
    const response = await plaidClient.itemPublicTokenExchange({
      public_token,
    });
    const { access_token, item_id } = response.data;

    console.log("Access token received:", access_token);
    console.log("Item ID received:", item_id);

    res.send({ access_token, item_id });
  } catch (error) {
    console.error('Error exchanging token:', error.response ? error.response.data : error.message);
    res.status(500).json({ error: "Can't Get Access Token" });
  }
});

// 200 
// works, client-side
router.post('/get_transactions', async (req, res) => {
  const { access_token } = req.body;

  try {
    let cursor = null;
    let hasMore = true;
    let allTransactions = [];

    while (hasMore) {
      const transactionResponse = await plaidClient.transactionsSync({
        access_token,
        cursor,
      });

      const { added, modified, removed, next_cursor } = transactionResponse.data;
      allTransactions = allTransactions.concat(added);
      cursor = next_cursor;
      hasMore = transactionResponse.data.has_more;
    }

    const accountsResponse = await plaidClient.accountsGet({ access_token });
    const accounts = accountsResponse.data.accounts;

    console.log("Transactions fetched:", allTransactions);
    console.log("Accounts fetched:", accounts);

    res.json({ transactions: allTransactions, accounts });
  } catch (error) {
    console.error('Error fetching transactions:', error.response ? error.response.data : error.message);
    res.status(500).json({ error: "Can't Get Transaction history" });
  }
});

/*    ********        ********        *******       */
module.exports = router;