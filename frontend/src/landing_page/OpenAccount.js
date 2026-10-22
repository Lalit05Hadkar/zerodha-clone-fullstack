import React from "react";
import { Link } from "react-router-dom";

function OpenAccount() {
  return (
    <div className="container p-5 mb-5">
      <div className="row text-center">
        <h1 className="mt-5 fs-2">Open a Zerodha account</h1>
        <p className="text-muted mt-2">
          Modern platforms and apps, ₹0 investments, and flat ₹20 intraday and F&amp;O trades.
        </p>
        <Link
          to="/signup"
          className="p-2 btn btn-primary fs-5 mb-5 mt-3"
          style={{ width: "220px", margin: "0 auto", backgroundColor: "#387ed1", borderColor: "#387ed1" }}
        >
          Sign up Now
        </Link>
      </div>
    </div>
  );
}

export default OpenAccount;
