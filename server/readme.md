# Getting Started

## Overview

This backend server is implemented using **Node.js**, **Express.js**, and integrates with the **Plaid API** to enable financial data aggregation. Currently, endpoints for user registration, login, logout, and retrieving transactions from financial institutions are operational. Future implementation currently in progress will include user authentication via **JWT** and **bcrypt**.

## Features

- **User Authentication** (Signup, Login, Logout) with **JWT & Bcrypt**
- **Plaid API Integration** for financial data aggregation
- **Secure Access Token Management**
- **Transaction Retrieval & Syncing**
- **Basic CRUD Test Endpoints**

---

## Installation

### Prerequisites

Ensure you have the following installed:

- **Node.js** (v14 or later)
- **MongoDB** (Local or Atlas)
- **Plaid Developer Account**

### Setup Instructions

1. **Clone the repository:**
   ```sh
   git clone https://github.com/YaredPena/SD2_smartwallet.git
   cd server
   ```
2. **Install dependencies:**
   ```sh
   npm install
   ```
3. **Set up environment variables:** Create a `.env` file in the root directory and add:
   ```env
   PORT=5000
   MONGO_URI=your_mongo_connection_string
   JWT_SECRET=your_jwt_secret
   BCRYPT_SALT_ROUNDS=10
   PLAID_CLIENT_ID=your_plaid_client_id
   PLAID_SECRET=your_plaid_secret
   PLAID_ENV=sandbox
   PLAID_PRODUCTS=transactions
   PLAID_COUNTRY_CODES=US
   ```
4. **Start the server:**
   ```sh
   npm start
   ```

---

## API Endpoints

### User Authentication

#### 1. **Signup**

**Endpoint:** `POST /signup`

- Creates a new user in the database.
- Hashes the password using bcrypt.

```json
{
  "email": "user@example.com",
  "password": "securepassword"
}
```

**Response:**

```json
{
  "message": "User created successfully",
  "userId": "123456"
}
```

#### 2. **Login**

**Endpoint:** `POST /login`

- Validates user credentials.
- Returns a JWT token for session authentication.

```json
{
  "email": "user@example.com",
  "password": "securepassword"
}
```

**Response:**

```json
{
  "id": "123456",
  "token": "jwt_token_here"
}
```

#### 3. **Logout** (To be implemented)

**Endpoint:** `POST /logout`

- Needs JWT invalidation.

---

### Plaid API Integration

#### 4. **Create Link Token**

**Endpoint:** `POST /create_link_token`

- Generates a Plaid Link Token.

```json
{
  "uid": "123456"
}
```

**Response:**

```json
{
  "link_token": "plaid-link-token"
}
```

#### 5. **Exchange Public Token for Access Token**

**Endpoint:** `POST /get_access_token`

- Converts a short-lived public token into a long-lived access token.

```json
{
  "public_token": "plaid-public-token"
}
```

**Response:**

```json
{
  "access_token": "plaid-access-token",
  "item_id": "plaid-item-id"
}
```

#### 6. **Fetch Transactions**

**Endpoint:** `POST /get_transactions`

- Retrieves user transactions from their linked financial accounts.

```json
{
  "access_token": "plaid-access-token"
}
```

**Response:**

```json
{
  "transactions": [
    {
      "date": "2023-01-01",
      "amount": 100.50,
      "merchant": "Amazon"
    }
  ]
}
```

---

## In-progress (WIP)

- **Implement JWT for authentication**: Replace session-based authentication with JWT.
- **Use bcrypt to hash passwords**: Currently, passwords are stored in plaintext.
- **Implement Logout Endpoint**: Add functionality to invalidate JWT tokens.

---

## Testing API Endpoints

Use **Postman** or **cURL** to test the API:

```sh
curl -X POST http://localhost:5000/signup \
     -H "Content-Type: application/json" \
     -d '{"email": "test@example.com", "password": "securepassword"}'
```

---



