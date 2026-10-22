# Zerodha Kite Full-Stack Trading & Investment Platform

[![Author](https://img.shields.io/badge/Author-Lalit%20Hadkar-blue?style=for-the-badge&logo=github)](https://github.com/Lalit05Hadkar)
[![React](https://img.shields.io/badge/Frontend-React%2018-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![Node.js](https://img.shields.io/badge/Backend-Node.js%20%7C%20Express-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/Database-MongoDB%20Atlas-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](LICENSE)

A production-grade, high-performance financial technology application replicating the complete **Zerodha & Kite** trading ecosystem. Built with a decoupled multi-tier architecture featuring a public landing platform, real-time trading terminal, interactive portfolio analytics, and a RESTful backend API.

---

## 🌟 Live Features & Capabilities

### 1. 📈 Kite Web Trading Terminal (`http://localhost:3001`)
- **Live Stock Watchlist**:
  - Real-time stock search and dynamic filtering by ticker or company name.
  - Simulated live market price ticks with visual up/down indicators.
  - Instant Buy/Sell action triggers with contextual market depth actions.
- **Order Execution Engine**:
  - Modal trading window supporting both **BUY** and **SELL** orders.
  - Automatic pre-fill of latest market price and real-time margin requirement calculations (`Price × Qty`).
  - Seamless balance validation, order logging, and instant holding updates.
- **Portfolio & Holdings Management**:
  - Aggregated metrics: **Total Investment**, **Current Portfolio Value**, **Net P&L (₹)**, and **Profit Percentage (%)**.
  - Visual asset allocation powered by **Chart.js** & **React-Chartjs-2**.
- **Positions Tracker**:
  - Real-time tracking of intraday and derivative positions with live P&L computation.
- **Capital & Funds Management**:
  - Integrated digital wallet simulation with **Instant Add Funds** (UPI presets: `+₹1,000`, `+₹5,000`, `+₹10,000`).
  - Safe fund withdrawals with overdraft prevention and balance persistence.
- **Zerodha Apps Ecosystem (Hub)**:
  - Interactive partner marketplace featuring **Smallcase**, **Streak**, **Sensibull**, **Ditto**, **GoldenPi**, and **Zerodha Fund House** with dynamic category filtering.
- **Trader Profile**:
  - Personalized account view for **Lalit Hadkar** (`LH0505`) with quick links, avatar, and status metrics.

---

### 2. 🌐 Public Platform & Onboarding Portal (`http://localhost:3000`)
- **Modern Responsive Design**:
  - Pixel-perfect navigation, interactive feature showcases, pricing calculators, and brokerage comparison tables.
- **Support & Ticket Center**:
  - Interactive search and categorization for account opening, trading, margins, and depository services.
- **Frictionless 3-Step Client Signup**:
  - Step 1: Mobile number validation.
  - Step 2: Instant OTP verification (Demo code: `1234`).
  - Step 3: Automated Client ID generation and direct one-click redirect to the Kite Trading Terminal.

---

### 3. ⚙️ REST API Engine (`http://localhost:3002`)
- High-throughput Express.js REST API with CORS enabled.
- Mongoose schemas modeling `Holdings`, `Positions`, `Orders`, and `Funds`.
- MongoDB Atlas cloud database support with fail-safe local fallback data.

---

## 🏗️ System Architecture

```text
zerodha/
├── frontend/                 # Public Landing Page & User Onboarding (Port 3000)
│   ├── public/               # Static assets, branding icons, HTML template
│   └── src/
│       ├── landing_page/     # Home, About, Products, Pricing, Support, Signup
│       └── index.js          # App entrypoint & routing
│
├── dashboard/                # Kite Web Trading Terminal (Port 3001)
│   ├── public/               # Dashboard assets, market icons
│   └── src/
│       ├── components/       # WatchList, Holdings, Orders, Funds, Apps, Menu
│       └── index.js          # Dashboard routing & state provider
│
├── backend/                  # REST API Service (Port 3002)
│   ├── model/                # Mongoose models (Holdings, Orders, Positions, Funds)
│   ├── schemas/              # Schema definitions
│   └── index.js              # Express app, routes, and DB connector
│
├── run-all.js                # Unified Node.js multi-service process runner
├── start-all.bat             # Windows one-click desktop launcher
└── package.json              # Monorepo root scripts & metadata
```

---

## 🛠️ Technology Stack

| Domain | Technology | Description |
|---|---|---|
| **Frontend Platform** | React 18, React Router v6 | Declarative component hierarchy and client-side routing |
| **Trading Terminal** | React 18, Material UI (MUI v5) | Stock terminal UI, data tables, and modal dialogues |
| **Data Visualization** | Chart.js, React-Chartjs-2 | Portfolio asset distribution and P&L charts |
| **Styling & Icons** | Vanilla CSS, Bootstrap 5, FontAwesome 6 | Custom responsive layout and financial indicators |
| **Backend & API** | Node.js, Express.js | REST endpoints, middleware, and request validation |
| **Database** | MongoDB, Mongoose 8 | Document storage for holdings, trades, and account funds |
| **Process Orchestration** | Node.js Child Process (`run-all.js`) | Concurrent execution of backend, dashboard, and frontend |

---

## 🚀 Quick Start & Installation

### Prerequisites
- [Node.js](https://nodejs.org/) (v16 or higher recommended)
- [Git](https://git-scm.com/)

### 1. Clone the Repository
```bash
git clone https://github.com/Lalit05Hadkar/zerodha-clone-fullstack.git
cd zerodha-clone-fullstack
```

### 2. Install Dependencies
Install dependencies across all 3 workspaces:
```bash
# Root
npm install

# Backend
cd backend && npm install && cd ..

# Frontend
cd frontend && npm install && cd ..

# Dashboard
cd dashboard && npm install && cd ..
```

### 3. Launch the Complete Ecosystem

#### Option A: One-Command Runner (All Platforms)
From the root directory:
```bash
npm start
```
*(Runs `node run-all.js` which boots Backend on `3002`, Dashboard on `3001`, and Frontend on `3000` simultaneously with colored terminal logging.)*

#### Option B: Windows Double-Click Launcher
Double-click `start-all.bat` from File Explorer.

#### Option C: Run Services Individually
```bash
# Terminal 1 - Backend API (Port 3002)
cd backend
npm start

# Terminal 2 - Kite Dashboard (Port 3001)
cd dashboard
npm start

# Terminal 3 - Frontend Landing (Port 3000)
cd frontend
npm start
```

---

## 📡 REST API Reference

| Method | Endpoint | Description | Payload Example |
|---|---|---|---|
| `GET` | `/allHoldings` | Retrieve active portfolio stock holdings | `None` |
| `GET` | `/allPositions` | Retrieve open intraday and derivative positions | `None` |
| `GET` | `/allOrders` | Retrieve history of executed trades | `None` |
| `POST` | `/newOrder` | Execute a new BUY or SELL order | `{ "name": "INFY", "qty": 5, "price": 1555.45, "mode": "BUY" }` |
| `GET` | `/userFunds` | Fetch current equity balance & available margin | `None` |
| `POST` | `/addFunds` | Credit cash to trading account via UPI | `{ "amount": 5000 }` |
| `POST` | `/withdrawFunds`| Withdraw funds back to bank account | `{ "amount": 2000 }` |

---

## 👨‍💻 Author & Attribution

Developed with ❤️ by **Lalit Hadkar**

- **GitHub Profile**: [@Lalit05Hadkar](https://github.com/Lalit05Hadkar)
- **Portfolio / Inquiries**: [Contact via GitHub](https://github.com/Lalit05Hadkar)

---

## 📄 License
This project is open-source and available under the [MIT License](LICENSE).
