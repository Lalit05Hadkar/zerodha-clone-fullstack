import React, { useState } from "react";

const appsList = [
  {
    name: "Smallcase",
    desc: "Thematic investment platforms helping you invest in diversified baskets of stocks and ETFs.",
    logo: "media/images/smallcaseLogo.png",
    category: "Investments",
    tag: "Popular",
    link: "https://smallcase.zerodha.com",
  },
  {
    name: "Streak",
    desc: "Systematic trading platform that allows you to create, backtest, and deploy algorithmic trading strategies with zero coding.",
    logo: "media/images/streakLogo.png",
    category: "Algo Trading",
    tag: "Trending",
    link: "https://streak.tech",
  },
  {
    name: "Sensibull",
    desc: "Options trading platform with ready-made option strategies, options chain analysis, and profit/loss simulators.",
    logo: "media/images/sensibullLogo.svg",
    category: "Derivatives",
    tag: "Essential",
    link: "https://sensibull.com",
  },
  {
    name: "Ditto",
    desc: "Personalized insurance advisory with zero spam. Understand term insurance and health insurance policies easily.",
    logo: "media/images/dittoLogo.png",
    category: "Insurance",
    tag: "Advisory",
    link: "https://joinditto.in",
  },
  {
    name: "GoldenPi",
    desc: "Online platform for individual investors to easily invest in high-yield corporate bonds and debentures.",
    logo: "media/images/goldenpiLogo.png",
    category: "Fixed Income",
    tag: "Bonds",
    link: "https://goldenpi.com",
  },
  {
    name: "Zerodha Fund House",
    desc: "Simple, transparent, low-cost passive index funds and ETFs designed to help long-term investors create wealth.",
    logo: "media/images/zerodhaFundhouse.png",
    category: "Mutual Funds",
    tag: "Direct",
    link: "https://zerodhafundhouse.com",
  },
];

const Apps = () => {
  const [activeFilter, setActiveFilter] = useState("All");

  const categories = ["All", "Investments", "Algo Trading", "Derivatives", "Fixed Income", "Insurance"];

  const filteredApps =
    activeFilter === "All"
      ? appsList
      : appsList.filter((app) => app.category === activeFilter);

  return (
    <div style={{ padding: "10px 0" }}>
      <div style={{ marginBottom: "25px" }}>
        <h3 className="title" style={{ marginBottom: "6px" }}>
          Zerodha Ecosystem Apps
        </h3>
        <p style={{ color: "#666", fontSize: "14px" }}>
          Extend your trading and investment experience with partner platforms powered by Zerodha's Kite APIs.
        </p>
      </div>

      <div style={{ display: "flex", gap: "8px", marginBottom: "25px", flexWrap: "wrap" }}>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveFilter(cat)}
            style={{
              padding: "6px 14px",
              borderRadius: "20px",
              border: activeFilter === cat ? "1px solid #4184f3" : "1px solid #ddd",
              background: activeFilter === cat ? "#4184f3" : "#fff",
              color: activeFilter === cat ? "#fff" : "#555",
              cursor: "pointer",
              fontSize: "13px",
              fontWeight: activeFilter === cat ? "500" : "400",
              transition: "all 0.2s",
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
          gap: "20px",
        }}
      >
        {filteredApps.map((app, index) => (
          <div
            key={index}
            style={{
              background: "#fff",
              border: "1px solid #e0e0e0",
              borderRadius: "8px",
              padding: "20px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
              transition: "transform 0.2s, box-shadow 0.2s",
            }}
          >
            <div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "12px",
                }}
              >
                <img
                  src={app.logo}
                  alt={app.name}
                  style={{ height: "32px", maxWidth: "120px", objectFit: "contain" }}
                />
                <span
                  style={{
                    background: "#e3f2fd",
                    color: "#1976d2",
                    fontSize: "11px",
                    fontWeight: "600",
                    padding: "3px 8px",
                    borderRadius: "12px",
                  }}
                >
                  {app.tag}
                </span>
              </div>
              <h4 style={{ margin: "10px 0 6px 0", fontSize: "16px", color: "#333" }}>
                {app.name}
              </h4>
              <p style={{ color: "#666", fontSize: "13px", lineHeight: "1.5", margin: 0 }}>
                {app.desc}
              </p>
            </div>

            <div style={{ marginTop: "20px", paddingTop: "15px", borderTop: "1px solid #f0f0f0" }}>
              <a
                href={app.link}
                target="_blank"
                rel="noreferrer"
                style={{
                  display: "inline-block",
                  padding: "8px 16px",
                  background: "#4184f3",
                  color: "#fff",
                  textDecoration: "none",
                  borderRadius: "4px",
                  fontSize: "13px",
                  fontWeight: "500",
                }}
              >
                Open {app.name} ↗
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Apps;
