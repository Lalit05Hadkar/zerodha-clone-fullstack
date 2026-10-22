import React from "react";

function Education() {
  return (
    <div className="container mt-5 mb-5">
      <div className="row align-items-center">
        <div className="col-md-6 text-center">
          <img src="media/images/education.svg" style={{ width: "80%" }} alt="Zerodha Varsity Education" />
        </div>
        <div className="col-md-6 p-4">
          <h1 className="mb-3 fs-2">Free and open market education</h1>
          <p className="text-muted">
            Varsity, the largest online stock market education book in the world
            covering everything from the basics to advanced trading.
          </p>
          <a
            href="https://zerodha.com/varsity"
            target="_blank"
            rel="noreferrer"
            style={{ textDecoration: "none", color: "#387ed1", fontWeight: "500" }}
          >
            Varsity <i className="fa fa-long-arrow-right" aria-hidden="true"></i>
          </a>
          <p className="mt-5 text-muted">
            TradingQ&amp;A, the most active trading and investment community in
            India for all your market related queries.
          </p>
          <a
            href="https://tradingqna.com"
            target="_blank"
            rel="noreferrer"
            style={{ textDecoration: "none", color: "#387ed1", fontWeight: "500" }}
          >
            TradingQ&amp;A <i className="fa fa-long-arrow-right" aria-hidden="true"></i>
          </a>
        </div>
      </div>
    </div>
  );
}

export default Education;
