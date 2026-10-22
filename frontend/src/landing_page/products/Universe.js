import React from "react";
import { Link } from "react-router-dom";

function Universe() {
  const partners = [
    {
      img: "media/images/zerodhaFundhouse.png",
      text: "Our asset management venture that is creating simple and transparent index funds to help you save for your goals.",
      style: { width: "180px", height: "45px", objectFit: "contain" },
    },
    {
      img: "media/images/sensibullLogo.svg",
      text: "Options trading platform that lets you create strategies, analyze positions, and examine data points like open interest.",
      style: { width: "160px", height: "45px", objectFit: "contain" },
    },
    {
      img: "media/images/goldenpiLogo.png",
      text: "Investment platform offering bonds and fixed-yield instruments to retail investors.",
      style: { width: "160px", height: "45px", objectFit: "contain" },
    },
    {
      img: "media/images/streakLogo.png",
      text: "Systematic trading platform that allows you to create and backtest strategies without coding.",
      style: { width: "140px", height: "45px", objectFit: "contain" },
    },
    {
      img: "media/images/smallcaseLogo.png",
      text: "Thematic investing platform that helps you invest in diversified baskets of stocks on ideas.",
      style: { width: "150px", height: "45px", objectFit: "contain" },
    },
    {
      img: "media/images/dittoLogo.png",
      text: "Personalized advice on life and health insurance. No spam and no mis-selling.",
      style: { width: "120px", height: "45px", objectFit: "contain" },
    },
  ];

  return (
    <div className="container mt-5">
      <div className="row text-center">
        <h1 className="fs-2 mb-3">The Zerodha Universe</h1>
        <p className="text-muted">
          Extend your trading and investment experience even further with our
          partner platforms
        </p>

        <div className="row mt-4">
          {partners.map((partner, index) => (
            <div className="col-md-4 p-4 mt-3" key={index}>
              <div style={{ minHeight: "55px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <img src={partner.img} alt="Zerodha Partner" style={partner.style} />
              </div>
              <p className="text-muted mt-3" style={{ fontSize: "12px", lineHeight: "1.6" }}>
                {partner.text}
              </p>
            </div>
          ))}
        </div>

        <Link
          to="/signup"
          className="p-2 btn btn-primary fs-5 mb-5 mt-4 text-decoration-none"
          style={{ width: "220px", margin: "0 auto", backgroundColor: "#387ed1", borderColor: "#387ed1" }}
        >
          Signup Now
        </Link>
      </div>
    </div>
  );
}

export default Universe;
