# Personal Finance Tracker API

## Overview

This API provides endpoints for managing personal finance data including users, transactions, categories, and budgets.

## Base URL

```
http://localhost:3000
```

## Available Scripts

- `npm run dev:api` - Start JSON Server only
- `npm run dev:full` - Start both Vue.js app and JSON Server
- `npm run json-server` - Start JSON Server (alias for dev:api)

## Endpoints

### Users

- `GET /users` - Get all users
- `GET /users/:id` - Get user by ID
- `POST /users` - Create new user
- `PUT /users/:id` - Update user
- `DELETE /users/:id` - Delete user

### Transactions

- `GET /transactions` - Get all transactions
- `GET /transactions/:id` - Get transaction by ID
- `GET /transactions?userId=:userId` - Get transactions by user
- `GET /transactions?category=:category` - Get transactions by category
- `GET /transactions?date_gte=:startDate&date_lte=:endDate` - Get transactions by date range
- `POST /transactions` - Create new transaction
- `PUT /transactions/:id` - Update transaction
- `PATCH /transactions/:id` - Partially update transaction
- `DELETE /transactions/:id` - Delete transaction

### Categories

- `GET /categories` - Get all categories
- `GET /categories?type=income` - Get income categories
- `GET /categories?type=expense` - Get expense categories
- `POST /categories` - Create new category

### Budgets

- `GET /budgets` - Get all budgets
- `GET /budgets?userId=:userId` - Get budgets by user
- `POST /budgets` - Create new budget
- `PUT /budgets/:id` - Update budget
- `PATCH /budgets/:id` - Partially update budget
- `DELETE /budgets/:id` - Delete budget

## Custom Routes

- `GET /users/:id/transactions` - Get all transactions for a user
- `GET /users/:id/budgets` - Get all budgets for a user
- `GET /transactions/category/:category` - Get transactions by category
- `GET /categories/income` - Get income categories
- `GET /categories/expense` - Get expense categories

## Data Models

### User

```json
{
  "id": 1,
  "username": "demo@example.com",
  "email": "demo@example.com",
  "name": "Demo User",
  "createdAt": "2025-08-21T00:00:00Z"
}
```

### Transaction

```json
{
  "id": 1,
  "userId": 1,
  "type": "expense",
  "amount": 25.99,
  "category": "Food",
  "description": "Lunch at cafe",
  "date": "2025-08-20",
  "createdAt": "2025-08-20T12:30:00Z"
}
```

### Category

```json
{
  "id": 1,
  "name": "Food",
  "type": "expense",
  "color": "#ef4444",
  "icon": "🍽️"
}
```

### Budget

```json
{
  "id": 1,
  "userId": 1,
  "categoryId": 1,
  "amount": 300.00,
  "period": "monthly",
  "startDate": "2025-08-01",
  "endDate": "2025-08-31",
  "createdAt": "2025-08-01T00:00:00Z"
}
```

## Example API Usage

### Create a Transaction

```javascript
import { transactionApi } from './src/services/api.ts'

const newTransaction = await transactionApi.create({
  userId: 1,
  type: 'expense',
  amount: 50.00,
  category: 'Food',
  description: 'Dinner at restaurant',
  date: '2025-08-21'
})
```

### Get User Transactions

```javascript
import { transactionApi } from './src/services/api.ts'

const userTransactions = await transactionApi.getAll(1)
```

### Get Transactions by Date Range

```javascript
import { transactionApi } from './src/services/api.ts'

const monthlyTransactions = await transactionApi.getByDateRange(
  '2025-08-01',
  '2025-08-31',
  1
)
```

## Error Handling

The API client includes built-in error handling and will throw errors for failed requests. Make sure to wrap API calls in try-catch blocks:

```javascript
try {
  const transactions = await transactionApi.getAll()
} catch (error) {
  console.error('Failed to fetch transactions:', error)
}
```

## Development Workflow

1. Start the JSON Server: `npm run dev:api`
2. Start the Vue.js app: `npm run dev`
3. Or start both together: `npm run dev:full`

The JSON Server will be available at `http://localhost:3001` and the Vue.js app at `http://localhost:5173`.
