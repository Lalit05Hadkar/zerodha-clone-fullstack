import React from "react";
import { Link } from "react-router-dom";

function Pricing() {
  return (
    <div className="container mt-5">
      <div className="row align-items-center">
        <div className="col-md-5">
          <h1 className="mb-3 fs-2">Unbeatable pricing</h1>
          <p className="text-muted">
            We pioneered the concept of discount broking and price transparency
            in India. Flat fees and no hidden charges.
          </p>
          <Link to="/pricing" style={{ textDecoration: "none", color: "#387ed1", fontWeight: "500" }}>
            See Pricing{" "}
            <i className="fa fa-long-arrow-right" aria-hidden="true"></i>
          </Link>
        </div>
        <div className="col-md-1"></div>
        <div className="col-md-6 mb-5">
          <div className="row text-center">
            <div className="col p-4 border rounded me-2">
              <h1 className="mb-3 fw-bold">₹0</h1>
              <p className="text-muted mb-0">
                Free equity delivery and direct mutual funds
              </p>
            </div>
            <div className="col p-4 border rounded">
              <h1 className="mb-3 fw-bold">₹20</h1>
              <p className="text-muted mb-0">Intraday and F&amp;O trades</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Pricing;
