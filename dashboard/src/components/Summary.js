import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import GeneralContext from "./GeneralContext";
import { holdings as defaultHoldings } from "../data/data";

const Summary = () => {
  const [userName, setUserName] = useState("Trader");
  const [funds, setFunds] = useState({
    availableMargin: 4043.10,
    usedMargin: 3757.30,
    openingBalance: 4043.10,
  });
  const [holdingsData, setHoldingsData] = useState(defaultHoldings);

  const { refreshKey } = useContext(GeneralContext);

  useEffect(() => {
    // 1. Fetch user
    axios
      .get("http://localhost:3002/user")
      .then((res) => {
        if (res.data && res.data.name) setUserName(res.data.name);
      })
      .catch(() => {});

    // 2. Fetch funds
    axios
      .get("http://localhost:3002/funds")
      .then((res) => {
        if (res.data) setFunds(res.data);
      })
      .catch(() => {});

    // 3. Fetch holdings
    axios
      .get("http://localhost:3002/allHoldings")
      .then((res) => {
        if (res.data && res.data.length > 0) {
          setHoldingsData(res.data);
        }
      })
      .catch(() => {});
  }, [refreshKey]);

  const totalInvestment = holdingsData.reduce(
    (acc, stock) => acc + (Number(stock.avg) || 0) * (Number(stock.qty) || 0),
    0
  );
  const currentValue = holdingsData.reduce(
    (acc, stock) => acc + (Number(stock.price) || 0) * (Number(stock.qty) || 0),
    0
  );
  const totalProfit = currentValue - totalInvestment;
  const profitPercentage =
    totalInvestment > 0 ? (totalProfit / totalInvestment) * 100 : 0;
  const isOverallProfit = totalProfit >= 0;

  return (
    <>
      <div className="username">
        <h6>Hi, {userName}!</h6>
        <hr className="divider" />
      </div>

      <div className="section">
        <span>
          <p>Equity</p>
        </span>

        <div className="data">
          <div className="first">
            <h3>₹{(funds.availableMargin / 1000).toFixed(2)}k</h3>
            <p>Margin available</p>
          </div>
          <hr />

          <div className="second">
            <p>
              Margins used <span>₹{(funds.usedMargin / 1000).toFixed(2)}k</span>
            </p>
            <p>
              Opening balance <span>₹{(funds.openingBalance / 1000).toFixed(2)}k</span>
            </p>
          </div>
        </div>
        <hr className="divider" />
      </div>

      <div className="section">
        <span>
          <p>Holdings ({holdingsData.length})</p>
        </span>

        <div className="data">
          <div className="first">
            <h3 className={isOverallProfit ? "profit" : "loss"}>
              {isOverallProfit ? "+" : ""}₹{(totalProfit / 1000).toFixed(2)}k{" "}
              <small>
                ({isOverallProfit ? "+" : ""}{profitPercentage.toFixed(2)}%)
              </small>
            </h3>
            <p>P&L</p>
          </div>
          <hr />

          <div className="second">
            <p>
              Current Value <span>₹{(currentValue / 1000).toFixed(2)}k</span>
            </p>
            <p>
              Investment <span>₹{(totalInvestment / 1000).toFixed(2)}k</span>
            </p>
          </div>
        </div>
        <hr className="divider" />
      </div>
    </>
  );
};

export default Summary;
