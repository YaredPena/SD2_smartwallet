const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = express.Router();
const User = require("../models/User"); 
const { plaidClient, Products } = require('../config/plaidConfig');
const JWT_SECRET = process.env.JWT_SECRET;

/// Please review JWT and Bcrypt implementation

// stole this from plaid quickstart
const PLAID_PRODUCTS = (process.env.PLAID_PRODUCTS || Products.Transactions).split(
  ',',
);

const PLAID_COUNTRY_CODES = (process.env.PLAID_COUNTRY_CODES || 'US').split(
  ',',
);

// 200 Implemented JWT for session management and Bcrypt for hashing
// fixed for existing user
router.post("/signup", async (req, res) => {
  let { email, password } = req.body;
  let newUser = new User({ email, password });

  try {
    const existingUser = await User.findOne({ email }); // Check if user exists
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10); // Hash password
    const newUser = new User({ email, password: hashedPassword });

    const user = await newUser.save();
    console.log("User created with ID:", user.userId);
    res.send({ message: `User created with ID: ${user.userId}`, userId: user.userId });
  } catch (error) {
    res.status(500).send({ message: `Error creating user: ${error.message}` });
  }
});

//200 (ISSUE #2: userid not retained after signin)
// jwt token implementation 
router.post("/login", async (req, res) => {
  let { email, password } = req.body;

  try {
    const user = await User.findOne({ email, password });

    if (!user) {
      return res.status(400).send({ message: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }
    // Generate JWT Token
    const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '1h' });

    res.json({ message: 'Login successful for user id', token, userId: user._id });
    res.send({ id: user.userId });
  } catch (error) {
    res.status(500).send({ message: `Error during login: ${error.message}` });
  }
});

// 200 (ISSUE #3: user logout endpoint just returns a message, no actual logout functionality)
// can be handled on client side by clearing token
router.post('/logout', async (req, res) => {
  
  try { 
    await res.send('hi logout'); // message

    console.log("Logout successful for user ID:", user.userId);
    res.send({ id: user.userId });

  } catch(error) {
    res.status(500).send ({ message: `Error logging user out: ${error.message}` });
  }

});

//200 works
router.post("/create_link_token", async (req, res) => {
  const { uid } = req.body;

  if (!uid) {
    return res.status(400).json({ error: "User ID is required" });
  }

  try {
    console.log("Received UID:", uid); 

    const response = await plaidClient.linkTokenCreate({
      client_id: process.env.PLAID_CLIENT_ID,
      secret: process.env.PLAID_SECRET,
      user: {
        client_user_id: uid,
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

// 200 (For testing needs access token, check access token endpoint)
// works, client-side
router.post('/get_transactions', async (req, res) => {
  const { access_token } = req.body;

  try {
    let cursor = null;
    let hasMore = true;
    let allTransactions = []; // initially the array will hold 0 transactions.

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

    console.log("Transactions fetched:", allTransactions);

    res.send({ transactions: allTransactions });
  } catch (error) {
    console.error('Error fetching transactions:', error.response ? error.response.data : error.message);
    res.status(500).json({ error: "Can't Get Transaction history" });
  }
});

module.exports = router;

/*

// test endpoint to see if I get anything

/*
CREATE --> POST tasks to my db (Make a new task) 200 / 400(client side error, bad input)
READ   --> GET tasks from my db (Get all tasks or one specific task) 200 / 500(server side error like if an API call fails)
UPDATE --> PATCH tasks in my db (Update one specific task) 200 / 400(client side error, bad input)
DELETE --> DELETE tasks from my db (Delete one specific task) 200 / 400(client side error, bad input)

router.get('/get', (req, res) => {
    res.json({ message: "Hello World! YOUR BACKEND IS CONNECTED BUT NOT PROPERLY!!" });
  });

router.patch('/update', (req, res) => {
    res.json({ message: 'Got a UPDATE request'});
  });

router.delete('/delete', (req, res) => {
    res.json({ message: 'Got a DELETE request'});
  });

*/

/*
console.log(PLAID_PRODUCTS);
console.log(PLAID_COUNTRY_CODES);
*/