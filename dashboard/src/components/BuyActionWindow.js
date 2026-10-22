import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import GeneralContext from "./GeneralContext";
import { watchlist } from "../data/data";
import { API_BASE_URL } from "../config";
import "./BuyActionWindow.css";

const BuyActionWindow = ({ uid, mode = "BUY" }) => {
  const stockItem = watchlist.find((s) => s.name === uid) || { price: 100.0 };
  const [stockQuantity, setStockQuantity] = useState(1);
  const [stockPrice, setStockPrice] = useState(stockItem.price || 100.0);
  const [orderType, setOrderType] = useState("LIMIT"); // MARKET or LIMIT
  const [productType, setProductType] = useState("CNC"); // CNC or MIS
  const [statusMessage, setStatusMessage] = useState("");

  const { closeBuyWindow, triggerRefresh } = useContext(GeneralContext);

  useEffect(() => {
    if (stockItem && stockItem.price) {
      setStockPrice(stockItem.price);
    }
  }, [uid, stockItem]);

  const isBuy = mode === "BUY";
  const headerBg = isBuy ? "#4184f3" : "#ff5722";
  const btnClass = isBuy ? "btn btn-blue" : "btn";
  const btnStyle = isBuy ? {} : { backgroundColor: "#ff5722" };

  const handleOrderSubmit = () => {
    setStatusMessage("Placing order...");
    axios
      .post(`${API_BASE_URL}/newOrder`, {
        name: uid,
        qty: Number(stockQuantity),
        price: Number(stockPrice),
        mode: mode,
      })
      .then((res) => {
        setStatusMessage("Order placed successfully!");
        if (triggerRefresh) {
          triggerRefresh();
        }
        setTimeout(() => {
          closeBuyWindow();
        }, 500);
      })
      .catch((err) => {
        console.log("Order error:", err);
        if (triggerRefresh) {
          triggerRefresh();
        }
        closeBuyWindow();
      });
  };

  const marginRequired = (Number(stockQuantity) * Number(stockPrice)).toFixed(2);

  return (
    <div className="container" id="buy-window" draggable="true" style={{ boxShadow: "0 8px 30px rgba(0,0,0,0.18)" }}>
      <div className="header" style={{ background: headerBg }}>
        <h3>
          {mode} {uid} <span>x {stockQuantity} Qty</span>
        </h3>
        <div className="market-options">
          <label>
            <input
              type="radio"
              name="market"
              value="BSE"
              defaultChecked
            />
            BSE: ₹{stockPrice}
          </label>
          <label style={{ marginLeft: "15px" }}>
            <input
              type="radio"
              name="market"
              value="NSE"
            />
            NSE: ₹{stockPrice}
          </label>
        </div>
      </div>

      <div className="regular-order">
        <div className="order-validity" style={{ marginBottom: "15px" }}>
          <label>
            <input
              type="radio"
              name="product"
              checked={productType === "CNC"}
              onChange={() => setProductType("CNC")}
            />
            Longterm <span>CNC</span>
          </label>
          <label>
            <input
              type="radio"
              name="product"
              checked={productType === "MIS"}
              onChange={() => setProductType("MIS")}
            />
            Intraday <span>MIS</span>
          </label>
        </div>

        <div className="inputs">
          <fieldset>
            <legend>Qty.</legend>
            <input
              type="number"
              name="qty"
              id="qty"
              min="1"
              onChange={(e) => setStockQuantity(Math.max(1, Number(e.target.value)))}
              value={stockQuantity}
            />
          </fieldset>
          <fieldset>
            <legend>Price</legend>
            <input
              type="number"
              name="price"
              id="price"
              step="0.05"
              disabled={orderType === "MARKET"}
              onChange={(e) => setStockPrice(e.target.value)}
              value={stockPrice}
            />
          </fieldset>
        </div>

        <div className="order-validity" style={{ marginTop: "10px" }}>
          <label>
            <input
              type="radio"
              name="orderType"
              checked={orderType === "LIMIT"}
              onChange={() => setOrderType("LIMIT")}
            />
            Limit
          </label>
          <label>
            <input
              type="radio"
              name="orderType"
              checked={orderType === "MARKET"}
              onChange={() => {
                setOrderType("MARKET");
                if (stockItem) setStockPrice(stockItem.price);
              }}
            />
            Market
          </label>
        </div>

        {statusMessage && (
          <p style={{ color: "#2e7d32", fontSize: "0.85rem", marginTop: "10px" }}>
            {statusMessage}
          </p>
        )}
      </div>

      <div className="buttons">
        <span>Margin required: ₹{marginRequired}</span>
        <div>
          <Link
            className={btnClass}
            style={btnStyle}
            onClick={handleOrderSubmit}
          >
            {mode}
          </Link>
          <Link to="#" className="btn btn-grey" onClick={closeBuyWindow}>
            Cancel
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BuyActionWindow;
