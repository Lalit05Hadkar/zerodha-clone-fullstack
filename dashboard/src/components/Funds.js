import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import GeneralContext from "./GeneralContext";

const Funds = () => {
  const [funds, setFunds] = useState({
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
  });

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isWithdrawModalOpen, setIsWithdrawModalOpen] = useState(false);
  const [amountInput, setAmountInput] = useState(5000);
  const [toastMessage, setToastMessage] = useState("");

  const { refreshKey, triggerRefresh } = useContext(GeneralContext);

  const fetchFunds = () => {
    axios
      .get("http://localhost:3002/funds")
      .then((res) => {
        if (res.data) setFunds(res.data);
      })
      .catch((err) => console.log("Error fetching funds:", err));
  };

  useEffect(() => {
    fetchFunds();
  }, [refreshKey]);

  const handleAddFunds = (e) => {
    e.preventDefault();
    if (amountInput > 0) {
      axios
        .post("http://localhost:3002/addFunds", { amount: Number(amountInput) })
        .then((res) => {
          if (res.data.funds) setFunds(res.data.funds);
          setToastMessage(`₹${amountInput} deposited successfully via UPI!`);
          setIsAddModalOpen(false);
          if (triggerRefresh) triggerRefresh();
          setTimeout(() => setToastMessage(""), 4000);
        })
        .catch((err) => {
          setFunds((prev) => ({
            ...prev,
            availableMargin: prev.availableMargin + Number(amountInput),
            availableCash: prev.availableCash + Number(amountInput),
          }));
          setIsAddModalOpen(false);
        });
    }
  };

  const handleWithdrawFunds = (e) => {
    e.preventDefault();
    if (amountInput > 0 && amountInput <= funds.availableCash) {
      axios
        .post("http://localhost:3002/withdrawFunds", { amount: Number(amountInput) })
        .then((res) => {
          if (res.data.funds) setFunds(res.data.funds);
          setToastMessage(`₹${amountInput} withdrawal initiated to linked bank account!`);
          setIsWithdrawModalOpen(false);
          if (triggerRefresh) triggerRefresh();
          setTimeout(() => setToastMessage(""), 4000);
        })
        .catch((err) => {
          setFunds((prev) => ({
            ...prev,
            availableMargin: Math.max(0, prev.availableMargin - Number(amountInput)),
            availableCash: Math.max(0, prev.availableCash - Number(amountInput)),
          }));
          setIsWithdrawModalOpen(false);
        });
    }
  };

  return (
    <>
      {toastMessage && (
        <div
          style={{
            background: "#e8f5e9",
            color: "#2e7d32",
            padding: "10px 20px",
            borderRadius: "4px",
            marginBottom: "15px",
            border: "1px solid #c8e6c9",
            fontWeight: "500",
          }}
        >
          ✓ {toastMessage}
        </div>
      )}

      <div className="funds">
        <p>Instant, zero-cost fund transfers with UPI</p>
        <button
          className="btn btn-green"
          onClick={() => {
            setAmountInput(5000);
            setIsAddModalOpen(true);
          }}
          style={{ cursor: "pointer", border: "none" }}
        >
          Add funds
        </button>
        <button
          className="btn btn-blue"
          onClick={() => {
            setAmountInput(1000);
            setIsWithdrawModalOpen(true);
          }}
          style={{ cursor: "pointer", border: "none", marginLeft: "10px" }}
        >
          Withdraw
        </button>
      </div>

      {/* Add Funds Modal */}
      {isAddModalOpen && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0,0,0,0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000,
          }}
        >
          <div
            style={{
              background: "#fff",
              padding: "30px",
              borderRadius: "8px",
              width: "420px",
              boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
            }}
          >
            <h4 style={{ margin: "0 0 15px 0" }}>Add Funds to Trading Account</h4>
            <p style={{ color: "#666", fontSize: "14px" }}>Instant UPI / Net Banking Transfer</p>

            <form onSubmit={handleAddFunds}>
              <div style={{ marginBottom: "15px" }}>
                <label style={{ display: "block", marginBottom: "6px", fontSize: "13px", color: "#444" }}>
                  Amount (₹)
                </label>
                <input
                  type="number"
                  min="100"
                  step="100"
                  value={amountInput}
                  onChange={(e) => setAmountInput(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "10px",
                    border: "1px solid #ccc",
                    borderRadius: "4px",
                    fontSize: "16px",
                    boxSizing: "border-box",
                  }}
                  required
                />
              </div>

              <div style={{ display: "flex", gap: "8px", marginBottom: "20px" }}>
                {[1000, 5000, 10000, 25000].map((amt) => (
                  <button
                    key={amt}
                    type="button"
                    onClick={() => setAmountInput(amt)}
                    style={{
                      padding: "6px 12px",
                      background: "#f0f0f0",
                      border: "1px solid #ddd",
                      borderRadius: "4px",
                      cursor: "pointer",
                      fontSize: "12px",
                    }}
                  >
                    +₹{amt.toLocaleString()}
                  </button>
                ))}
              </div>

              <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px" }}>
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  style={{
                    padding: "8px 18px",
                    background: "#eee",
                    border: "none",
                    borderRadius: "4px",
                    cursor: "pointer",
                  }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  style={{
                    padding: "8px 20px",
                    background: "#4184f3",
                    color: "#fff",
                    border: "none",
                    borderRadius: "4px",
                    cursor: "pointer",
                    fontWeight: 500,
                  }}
                >
                  Deposit Now
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Withdraw Modal */}
      {isWithdrawModalOpen && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0,0,0,0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000,
          }}
        >
          <div
            style={{
              background: "#fff",
              padding: "30px",
              borderRadius: "8px",
              width: "420px",
              boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
            }}
          >
            <h4 style={{ margin: "0 0 15px 0" }}>Withdraw Funds</h4>
            <p style={{ color: "#666", fontSize: "14px" }}>
              Available withdrawable cash: <strong>₹{funds.availableCash.toFixed(2)}</strong>
            </p>

            <form onSubmit={handleWithdrawFunds}>
              <div style={{ marginBottom: "20px" }}>
                <label style={{ display: "block", marginBottom: "6px", fontSize: "13px", color: "#444" }}>
                  Amount to Withdraw (₹)
                </label>
                <input
                  type="number"
                  min="100"
                  max={funds.availableCash}
                  value={amountInput}
                  onChange={(e) => setAmountInput(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "10px",
                    border: "1px solid #ccc",
                    borderRadius: "4px",
                    fontSize: "16px",
                    boxSizing: "border-box",
                  }}
                  required
                />
              </div>

              <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px" }}>
                <button
                  type="button"
                  onClick={() => setIsWithdrawModalOpen(false)}
                  style={{
                    padding: "8px 18px",
                    background: "#eee",
                    border: "none",
                    borderRadius: "4px",
                    cursor: "pointer",
                  }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  style={{
                    padding: "8px 20px",
                    background: "#4184f3",
                    color: "#fff",
                    border: "none",
                    borderRadius: "4px",
                    cursor: "pointer",
                    fontWeight: 500,
                  }}
                >
                  Confirm Withdrawal
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="row">
        <div className="col">
          <span>
            <p>Equity</p>
          </span>

          <div className="table">
            <div className="data">
              <p>Available margin</p>
              <p className="imp colored">₹{funds.availableMargin.toFixed(2)}</p>
            </div>
            <div className="data">
              <p>Used margin</p>
              <p className="imp">₹{funds.usedMargin.toFixed(2)}</p>
            </div>
            <div className="data">
              <p>Available cash</p>
              <p className="imp">₹{funds.availableCash.toFixed(2)}</p>
            </div>
            <hr />
            <div className="data">
              <p>Opening Balance</p>
              <p>₹{funds.openingBalance.toFixed(2)}</p>
            </div>
            <div className="data">
              <p>Payin</p>
              <p>₹{funds.payin.toFixed(2)}</p>
            </div>
            <div className="data">
              <p>SPAN</p>
              <p>₹{funds.span.toFixed(2)}</p>
            </div>
            <div className="data">
              <p>Delivery margin</p>
              <p>₹{funds.deliveryMargin.toFixed(2)}</p>
            </div>
            <div className="data">
              <p>Exposure</p>
              <p>₹{funds.exposure.toFixed(2)}</p>
            </div>
            <div className="data">
              <p>Options premium</p>
              <p>₹{funds.optionsPremium.toFixed(2)}</p>
            </div>
            <hr />
            <div className="data">
              <p>Collateral (Liquid funds)</p>
              <p>₹{funds.collateralLiquid.toFixed(2)}</p>
            </div>
            <div className="data">
              <p>Collateral (Equity)</p>
              <p>₹{funds.collateralEquity.toFixed(2)}</p>
            </div>
            <div className="data">
              <p>Total Collateral</p>
              <p>₹{funds.totalCollateral.toFixed(2)}</p>
            </div>
          </div>
        </div>

        <div className="col">
          <div className="commodity">
            <p>You don't have a commodity account</p>
            <button
              className="btn btn-blue"
              onClick={() => setToastMessage("Commodity segment activation request submitted!")}
              style={{ border: "none", cursor: "pointer", marginTop: "10px" }}
            >
              Open Account
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Funds;
