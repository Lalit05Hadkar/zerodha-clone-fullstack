import React from "react";

function Team() {
  return (
    <div className="container">
      <div className="row p-3 mt-5 border-top">
        <h1 className="text-center">People</h1>
      </div>

      <div
        className="row p-3 text-muted align-items-center"
        style={{ lineHeight: "1.8", fontSize: "1.1em" }}
      >
        <div className="col-md-6 p-4 text-center">
          <img
            src="media/images/nithinKamath.jpg"
            alt="Nithin Kamath - Founder & CEO"
            style={{ borderRadius: "100%", width: "55%", maxWidth: "260px" }}
          />
          <h4 className="mt-4 text-dark">Nithin Kamath</h4>
          <h6 className="text-muted">Founder, CEO</h6>
        </div>
        <div className="col-md-6 p-4">
          <p>
            Nithin bootstrapped and founded Zerodha in 2010 to overcome the
            hurdles he faced during his decade long stint as a trader. Today,
            Zerodha has changed the landscape of the Indian broking industry.
          </p>
          <p>
            He is a member of the SEBI Secondary Market Advisory Committee
            (SMAC) and the Market Data Advisory Committee (MDAC).
          </p>
          <p>Playing basketball is his zen.</p>
          <p>
            Connect on{" "}
            <a href="https://nithinkamath.me" target="_blank" rel="noreferrer" style={{ textDecoration: "none", color: "#387ed1" }}>
              Homepage
            </a>{" "}
            /{" "}
            <a href="https://tradingqna.com" target="_blank" rel="noreferrer" style={{ textDecoration: "none", color: "#387ed1" }}>
              TradingQnA
            </a>{" "}
            /{" "}
            <a href="https://twitter.com/nithinkamath" target="_blank" rel="noreferrer" style={{ textDecoration: "none", color: "#387ed1" }}>
              Twitter
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Team;
