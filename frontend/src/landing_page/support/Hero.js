import React, { useState } from "react";

function Hero() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <section className="container-fluid" id="supportHero">
      <div className="p-4" id="supportWrapper">
        <h4 className="fw-normal">Support Portal</h4>
        <a href="#topics" style={{ textDecoration: "underline" }}>Track Tickets</a>
      </div>
      <div className="row p-4 m-2 align-items-start">
        <div className="col-md-7 p-3">
          <h1 className="fs-3 mb-4 fw-normal">
            Search for an answer or browse help topics to create a ticket
          </h1>
          <input
            placeholder="Eg. how do I activate F&amp;O, why is my order rejected..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <div className="mt-3" style={{ lineHeight: "2" }}>
            <a href="#" className="me-3" onClick={(e) => e.preventDefault()}>Track account opening</a>
            <a href="#" className="me-3" onClick={(e) => e.preventDefault()}>Track segment activation</a>
            <a href="#" className="me-3" onClick={(e) => e.preventDefault()}>Intraday margins</a>
            <a href="#" className="me-3" onClick={(e) => e.preventDefault()}>Kite user manual</a>
          </div>
        </div>
        <div className="col-md-5 p-3">
          <h1 className="fs-3 mb-4 fw-normal">Featured</h1>
          <ol style={{ lineHeight: "2" }}>
            <li className="mb-2">
              <a href="#" onClick={(e) => e.preventDefault()}>Current Takeovers and Delisting - 2024</a>
            </li>
            <li className="mb-2">
              <a href="#" onClick={(e) => e.preventDefault()}>Latest Intraday leverages - MIS &amp; CO</a>
            </li>
          </ol>
        </div>
      </div>
    </section>
  );
}

export default Hero;
