import React from "react";

function Brokerage() {
  return (
    <div className="container">
      <div className="row p-4 mt-5 border-top">
        <div className="col-md-8 p-4">
          <a
            href="https://zerodha.com/brokerage-calculator"
            target="_blank"
            rel="noreferrer"
            style={{ textDecoration: "none", color: "#387ed1" }}
          >
            <h3 className="fs-5 mb-4">Brokerage calculator ↗</h3>
          </a>
          <ul
            style={{ textAlign: "left", lineHeight: "2.2", fontSize: "13px" }}
            className="text-muted"
          >
            <li>
              Call &amp; Trade and RMS auto-squareoff: Additional charges of ₹50 +
              GST per order.
            </li>
            <li>Digital contract notes will be sent via e-mail.</li>
            <li>
              Physical copies of contract notes, if required, shall be charged
              ₹20 per contract note. Courier charges apply.
            </li>
            <li>
              For NRI account (non-PIS), 0.5% or ₹100 per executed order for
              equity (whichever is lower).
            </li>
            <li>
              For NRI account (PIS), 0.5% or ₹200 per executed order for equity
              (whichever is lower).
            </li>
            <li>
              If the account is in debit balance, any order placed will be
              charged ₹40 per executed order instead of ₹20 per executed order.
            </li>
          </ul>
        </div>
        <div className="col-md-4 p-4 text-center">
          <a
            href="https://zerodha.com/charges#tab-equities"
            target="_blank"
            rel="noreferrer"
            style={{ textDecoration: "none", color: "#387ed1" }}
          >
            <h3 className="fs-5">List of charges ↗</h3>
          </a>
        </div>
      </div>
    </div>
  );
}

export default Brokerage;
