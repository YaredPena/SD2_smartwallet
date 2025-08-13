<h1 align="center"> SMARTWALLET </h1>

## SCOPE

SmartWallet is a unified personal finance management application designed to give users a consolidated view of all their financial accounts. It simplifies expense tracking, budgeting, and provides actionable insights to help users make smarter spending decisions.

<p align="center">
<img src="https://github.com/willofcode/Smartwallet/blob/main/demo.gif"/>
</p>

## TECH STACK

![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge\&logo=react\&logoColor=%2361DAFB)
![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge\&logo=vite\&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge\&logo=tailwind-css\&logoColor=white)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge\&logo=node.js\&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge\&logo=express\&logoColor=%2361DAFB)
![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge\&logo=mongodb\&logoColor=white)

## PROJECT OVERVIEW

SmartWallet aggregates transaction data from multiple credit cards and bank accounts using the Plaid API, categorizes expenses, and visualizes spending patterns. Users can set monthly budgets, track progress in real-time, and receive personalized insights powered by an AI-driven advisor.

## KEY FEATURES

* **Account Aggregation**: Connect unlimited bank and credit card accounts to view all transactions in one dashboard.
* **Real-time Transactions**: Fetch and display recent transactions with filtering by account, date, and category.
* **Budgeting Tools**: Create and manage monthly budgets for different categories, with visual progress indicators.
* **Spending Insights**: AI-driven recommendations to help optimize spending habits and identify saving opportunities.
* **Responsive Design**: Built with React, Vite, and TailwindCSS for lightning-fast performance and a seamless user experience on any device.

## OUR SOLUTION

Our approach leverages a modern MERN stack architecture:

1. **Frontend**: A React single-page application bootstrapped with Vite and styled with TailwindCSS for rapid development and great UX.
2. **Backend**: An Express.js server handles API requests, user authentication, and communicates securely with the Plaid API.
3. **Database**: MongoDB stores user profiles, linked account metadata, budgets, and categorized transactions.
4. **AI Advisor**: A modular chatbot component provides contextual spending advice by analyzing historical transaction data.

This modular design ensures each layer can scale independently and allows for easy integration of additional features in the future.

## CHALLENGES

* **API Integration**: Handling Plaid’s authentication flow, token exchange, and webhook events required careful error handling and security considerations.
* **Data Normalization**: Mapping and categorizing transactions from disparate financial institutions into a consistent schema.
* **Real-time Updates**: Ensuring that transactions and budget progress reflect immediately in the UI without compromising performance.
* **Security & Compliance**: Protecting sensitive user data with secure storage, environment variables, and JWT-based authentication.

## ACKNOWLEDGMENTS

* [Plaid](https://plaid.com/) for providing the financial API connectivity.
* [React](https://reactjs.org/) and [Vite](https://vitejs.dev/) for the frontend framework and tooling.
* [TailwindCSS](https://tailwindcss.com/) for utility-first styling.
* [Node.js](https://nodejs.org/) and [Express.js](https://expressjs.com/) for the backend server.
* [MongoDB](https://www.mongodb.com/) for the NoSQL database.
* Inspiration from open-source finance dashboards and budgeting apps.

### Contributors
<p>Yared Pena</p>
<a href="https://github.com/YaredPena">
  <img src="https://github.com/YaredPena.png?size=100" width="100" height="100" style="border-radius: 50%;" alt="Yared Pena" />
</a>
<p>William Ng</p>
<a href="https://github.com/willofcode">
  <img src="https://github.com/willofcode.png?size=100" width="100" height="100" style="border-radius: 50%;" alt="William Ng" />
</a>
<p>Thamida Choudhury</p>
<a href="https://github.com/thamidachoudhury1">
  <img src="https://github.com/thamidachoudhury1.png?size=100" width="100" height="100" style="border-radius: 50%;" alt="Thamida Choudhury" />
</a>
<p>Sajed Atwa</p>
<a href="https://github.com/SajedAtwa">
  <img src="https://github.com/SajedAtwa.png?size=100" width="100" height="100" style="border-radius: 50%;" alt="Sajed Atwa" />
</a>



