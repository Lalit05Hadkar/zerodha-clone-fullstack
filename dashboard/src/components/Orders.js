import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import GeneralContext from "./GeneralContext";

const Orders = () => {
  const [allOrders, setAllOrders] = useState([]);
  const { refreshKey } = useContext(GeneralContext);

  const fetchOrders = () => {
    axios
      .get("http://localhost:3002/allOrders")
      .then((res) => {
        if (res.data) {
          setAllOrders(res.data);
        }
      })
      .catch((err) => {
        console.log("Could not load orders from backend:", err);
      });
  };

  useEffect(() => {
    fetchOrders();
  }, [refreshKey]);

  return (
    <div className="orders">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h3 className="title">Orders ({allOrders.length})</h3>
        <button
          onClick={fetchOrders}
          style={{
            background: "transparent",
            border: "1px solid #ccc",
            borderRadius: "4px",
            padding: "4px 10px",
            cursor: "pointer",
            fontSize: "12px",
            color: "#666"
          }}
        >
          ↻ Refresh
        </button>
      </div>

      {allOrders.length === 0 ? (
        <div className="no-orders">
          <p>You haven't placed any orders today</p>
          <Link to={"/"} className="btn">
            Get started
          </Link>
        </div>
      ) : (
        <div className="order-table" style={{ marginTop: "15px" }}>
          <table>
            <thead>
              <tr>
                <th>Instrument</th>
                <th>Qty.</th>
                <th>Price</th>
                <th>Status</th>
                <th>Mode</th>
              </tr>
            </thead>
            <tbody>
              {allOrders.map((order, index) => (
                <tr key={index}>
                  <td style={{ fontWeight: 500 }}>{order.name}</td>
                  <td>{order.qty}</td>
                  <td>₹{Number(order.price).toFixed(2)}</td>
                  <td>
                    <span style={{ color: "#2e7d32", fontSize: "12px", fontWeight: "500" }}>
                      ● COMPLETE
                    </span>
                  </td>
                  <td>
                    <span
                      style={{
                        padding: "2px 8px",
                        borderRadius: "4px",
                        fontSize: "12px",
                        fontWeight: "600",
                        backgroundColor: order.mode === "BUY" ? "#e8f5e9" : "#ffebee",
                        color: order.mode === "BUY" ? "#2e7d32" : "#c62828",
                      }}
                    >
                      {order.mode || "BUY"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Orders;
