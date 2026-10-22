require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const { HoldingsModel } = require("./model/HoldingsModel");
const { PositionsModel } = require("./model/PositionsModel");
const { OrdersModel } = require("./model/OrdersModel");

const PORT = process.env.PORT || 3002;
const uri = process.env.MONGO_URL;

const app = express();

app.use(cors());
app.use(bodyParser.json());

let tempHoldings = [
  {
    name: "BHARTIARTL",
    qty: 2,
    avg: 538.05,
    price: 541.15,
    net: "+0.58%",
    day: "+2.99%",
  },
  {
    name: "HDFCBANK",
    qty: 2,
    avg: 1383.4,
    price: 1522.35,
    net: "+10.04%",
    day: "+0.11%",
  },
  {
    name: "HINDUNILVR",
    qty: 1,
    avg: 2335.85,
    price: 2417.4,
    net: "+3.49%",
    day: "+0.21%",
  },
  {
    name: "INFY",
    qty: 1,
    avg: 1350.5,
    price: 1555.45,
    net: "+15.18%",
    day: "-1.60%",
    isLoss: true,
  },
  {
    name: "ITC",
    qty: 5,
    avg: 202.0,
    price: 207.9,
    net: "+2.92%",
    day: "+0.80%",
  },
  {
    name: "KPITTECH",
    qty: 5,
    avg: 250.3,
    price: 266.45,
    net: "+6.45%",
    day: "+3.54%",
  },
  {
    name: "M&M",
    qty: 2,
    avg: 809.9,
    price: 779.8,
    net: "-3.72%",
    day: "-0.01%",
    isLoss: true,
  },
  {
    name: "RELIANCE",
    qty: 1,
    avg: 2193.7,
    price: 2112.4,
    net: "-3.71%",
    day: "+1.44%",
  },
  {
    name: "SBIN",
    qty: 4,
    avg: 324.35,
    price: 430.2,
    net: "+32.63%",
    day: "-0.34%",
    isLoss: true,
  },
  {
    name: "SGBMAY29",
    qty: 2,
    avg: 4727.0,
    price: 4719.0,
    net: "-0.17%",
    day: "+0.15%",
  },
  {
    name: "TATAPOWER",
    qty: 5,
    avg: 104.2,
    price: 124.15,
    net: "+19.15%",
    day: "-0.24%",
    isLoss: true,
  },
  {
    name: "TCS",
    qty: 1,
    avg: 3041.7,
    price: 3194.8,
    net: "+5.03%",
    day: "-0.25%",
    isLoss: true,
  },
  {
    name: "WIPRO",
    qty: 4,
    avg: 489.3,
    price: 577.75,
    net: "+18.08%",
    day: "+0.32%",
  },
];

let tempPositions = [
  {
    product: "CNC",
    name: "EVEREADY",
    qty: 2,
    avg: 316.27,
    price: 312.35,
    net: "+0.58%",
    day: "-1.24%",
    isLoss: true,
  },
  {
    product: "CNC",
    name: "JUBLFOOD",
    qty: 1,
    avg: 3124.75,
    price: 3082.65,
    net: "+10.04%",
    day: "-1.35%",
    isLoss: true,
  },
];

let inMemoryOrders = [
  { name: "TATAPOWER", qty: 10, price: 124.15, mode: "BUY", _id: "1792664011707" }
];

let userFunds = {
  availableMargin: 4043.10,
  usedMargin: 3757.30,
  availableCash: 4043.10,
  openingBalance: 4043.10,
  payin: 4064.00,
  span: 0.00,
  deliveryMargin: 0.00,
  exposure: 0.00,
  optionsPremium: 0.00,
  collateralLiquid: 0.00,
  collateralEquity: 0.00,
  totalCollateral: 0.00,
};

let usersList = [
  { id: "1", name: "Lalit Hadkar", email: "lalit@zerodha.local", phone: "9876543210", username: "LH0505" }
];

// Seed database helper
async function seedInitialData() {
  try {
    const holdingsCount = await HoldingsModel.countDocuments();
    if (holdingsCount === 0) {
      console.log("Seeding initial holdings...");
      await HoldingsModel.insertMany(tempHoldings);
    }
    const positionsCount = await PositionsModel.countDocuments();
    if (positionsCount === 0) {
      console.log("Seeding initial positions...");
      await PositionsModel.insertMany(tempPositions);
    }
  } catch (err) {
    console.log("Seeding error:", err.message);
  }
}

app.get("/addHoldings", async (req, res) => {
  try {
    if (mongoose.connection.readyState === 1) {
      await HoldingsModel.deleteMany({});
      await HoldingsModel.insertMany(tempHoldings);
    }
    res.send("Holdings added successfully!");
  } catch (err) {
    res.status(500).send("Error adding holdings: " + err.message);
  }
});

app.get("/addPositions", async (req, res) => {
  try {
    if (mongoose.connection.readyState === 1) {
      await PositionsModel.deleteMany({});
      await PositionsModel.insertMany(tempPositions);
    }
    res.send("Positions added successfully!");
  } catch (err) {
    res.status(500).send("Error adding positions: " + err.message);
  }
});

app.get("/allHoldings", async (req, res) => {
  try {
    if (mongoose.connection.readyState === 1) {
      let allHoldings = await HoldingsModel.find({});
      if (allHoldings && allHoldings.length > 0) {
        return res.json(allHoldings);
      }
    }
  } catch (err) {
    console.log("Error querying DB for holdings:", err.message);
  }
  res.json(tempHoldings);
});

app.get("/allPositions", async (req, res) => {
  try {
    if (mongoose.connection.readyState === 1) {
      let allPositions = await PositionsModel.find({});
      if (allPositions && allPositions.length > 0) {
        return res.json(allPositions);
      }
    }
  } catch (err) {
    console.log("Error querying DB for positions:", err.message);
  }
  res.json(tempPositions);
});

app.get("/allOrders", async (req, res) => {
  try {
    if (mongoose.connection.readyState === 1) {
      let allOrders = await OrdersModel.find({});
      return res.json(allOrders);
    }
  } catch (err) {
    console.log("Error querying DB for orders:", err.message);
  }
  res.json(inMemoryOrders);
});

app.post("/newOrder", async (req, res) => {
  const stockName = req.body.name;
  const qty = Number(req.body.qty) || 1;
  const price = Number(req.body.price) || 100;
  const mode = req.body.mode || "BUY";

  const orderData = {
    name: stockName,
    qty: qty,
    price: price,
    mode: mode,
  };

  // 1. Save order to list
  try {
    if (mongoose.connection.readyState === 1) {
      let newOrder = new OrdersModel(orderData);
      await newOrder.save();
    } else {
      inMemoryOrders.unshift({ ...orderData, _id: Date.now().toString(), time: new Date().toLocaleTimeString() });
    }
  } catch (err) {
    inMemoryOrders.unshift({ ...orderData, _id: Date.now().toString(), time: new Date().toLocaleTimeString() });
  }

  // 2. Update holdings accordingly
  const orderCost = qty * price;
  if (mode === "BUY") {
    // Check if user already owns this stock
    const existingIndex = tempHoldings.findIndex(
      (h) => h.name.toUpperCase() === stockName.toUpperCase()
    );

    if (existingIndex !== -1) {
      const existing = tempHoldings[existingIndex];
      const newTotalQty = existing.qty + qty;
      const newAvg = ((existing.qty * existing.avg) + (qty * price)) / newTotalQty;
      tempHoldings[existingIndex] = {
        ...existing,
        qty: newTotalQty,
        avg: Number(newAvg.toFixed(2)),
        price: price,
      };
    } else {
      tempHoldings.push({
        name: stockName,
        qty: qty,
        avg: price,
        price: price,
        net: "+0.00%",
        day: "+0.00%",
        isLoss: false,
      });
    }

    // Deduct funds
    userFunds.availableMargin = Math.max(0, userFunds.availableMargin - orderCost);
    userFunds.usedMargin += orderCost;
    userFunds.availableCash = Math.max(0, userFunds.availableCash - orderCost);
  } else if (mode === "SELL") {
    const existingIndex = tempHoldings.findIndex(
      (h) => h.name.toUpperCase() === stockName.toUpperCase()
    );

    if (existingIndex !== -1) {
      const existing = tempHoldings[existingIndex];
      if (existing.qty <= qty) {
        tempHoldings.splice(existingIndex, 1);
      } else {
        tempHoldings[existingIndex] = {
          ...existing,
          qty: existing.qty - qty,
          price: price,
        };
      }
    }

    // Add back proceeds to funds
    userFunds.availableMargin += orderCost;
    userFunds.usedMargin = Math.max(0, userFunds.usedMargin - orderCost);
    userFunds.availableCash += orderCost;
  }

  res.json({ success: true, message: "Order placed successfully!", order: orderData });
});

// Funds endpoints
app.get("/funds", (req, res) => {
  res.json(userFunds);
});

app.post("/addFunds", (req, res) => {
  const amount = Number(req.body.amount) || 0;
  if (amount > 0) {
    userFunds.availableMargin += amount;
    userFunds.availableCash += amount;
    userFunds.payin += amount;
    return res.json({ success: true, message: `₹${amount} added successfully!`, funds: userFunds });
  }
  res.status(400).json({ success: false, message: "Invalid amount" });
});

app.post("/withdrawFunds", (req, res) => {
  const amount = Number(req.body.amount) || 0;
  if (amount > 0 && amount <= userFunds.availableCash) {
    userFunds.availableMargin -= amount;
    userFunds.availableCash -= amount;
    return res.json({ success: true, message: `₹${amount} withdrawn successfully!`, funds: userFunds });
  }
  res.status(400).json({ success: false, message: "Insufficient balance or invalid amount" });
});

// User authentication endpoints
app.post("/signup", (req, res) => {
  const { name, phone, email } = req.body;
  const user = {
    id: (usersList.length + 1).toString(),
    name: name || "Trader",
    phone: phone || "9999999999",
    email: email || "user@zerodha.local",
    username: "ZU" + Math.floor(1000 + Math.random() * 9000),
  };
  usersList.push(user);
  res.json({ success: true, message: "Account created successfully!", user });
});

app.get("/user", (req, res) => {
  res.json(usersList[0]);
});

app.listen(PORT, "0.0.0.0", async () => {
  console.log(`Zerodha backend running on port ${PORT}`);
  if (uri && !uri.includes("<<your_mongoDB_url_here>>")) {
    try {
      await mongoose.connect(uri);
      console.log("Connected to MongoDB successfully!");
      await seedInitialData();
    } catch (err) {
      console.log("MongoDB connection failed:", err.message);
      console.log("Using built-in Zerodha data fallback.");
    }
  } else {
    console.log("No MONGO_URL configured. Using built-in Zerodha stock data fallback.");
  }
});
