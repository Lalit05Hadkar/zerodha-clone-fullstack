# Zerodha Trading Engine - REST API Service

High-performance Express.js REST API servicing market data, order lifecycle processing, and trader balances.

## API Endpoints
- `GET /allHoldings`: Returns all current stock holdings.
- `GET /allPositions`: Returns open intraday positions.
- `GET /allOrders`: Returns complete order history.
- `POST /newOrder`: Processes buy/sell equity trades.
- `GET /userFunds`: Returns trading account capital and margin status.
- `POST /addFunds`: Simulates depositing money via UPI.
- `POST /withdrawFunds`: Simulates funds withdrawal to linked bank account.

## Development
```bash
npm install
npm start
```
Runs at `http://localhost:3002`.
