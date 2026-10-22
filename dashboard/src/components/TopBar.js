import React, { useState, useEffect } from "react";
import Menu from "./Menu";

const TopBar = () => {
  const [nifty, setNifty] = useState({
    points: 24472.8,
    percent: "+0.42%",
    isUp: true,
  });

  const [sensex, setSensex] = useState({
    points: 80185.35,
    percent: "+0.39%",
    isUp: true,
  });

  // Simulated index tick
  useEffect(() => {
    const timer = setInterval(() => {
      const deltaNifty = (Math.random() * 4 - 1.8);
      const deltaSensex = (Math.random() * 12 - 5.5);

      setNifty((prev) => ({
        points: Number((prev.points + deltaNifty).toFixed(2)),
        percent: deltaNifty >= 0 ? "+0.43%" : "+0.41%",
        isUp: deltaNifty >= 0,
      }));

      setSensex((prev) => ({
        points: Number((prev.points + deltaSensex).toFixed(2)),
        percent: deltaSensex >= 0 ? "+0.40%" : "+0.38%",
        isUp: deltaSensex >= 0,
      }));
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="topbar-container">
      <div className="indices-container">
        <div className="nifty">
          <p className="index">NIFTY 50</p>
          <p className="index-points" style={{ color: nifty.isUp ? "#2e7d32" : "#c62828" }}>
            {nifty.points.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
          </p>
          <p className="percent" style={{ color: nifty.isUp ? "#2e7d32" : "#c62828", fontSize: "11px" }}>
            {nifty.percent}
          </p>
        </div>
        <div className="sensex">
          <p className="index">SENSEX</p>
          <p className="index-points" style={{ color: sensex.isUp ? "#2e7d32" : "#c62828" }}>
            {sensex.points.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
          </p>
          <p className="percent" style={{ color: sensex.isUp ? "#2e7d32" : "#c62828", fontSize: "11px" }}>
            {sensex.percent}
          </p>
        </div>
      </div>

      <Menu />
    </div>
  );
};

export default TopBar;
