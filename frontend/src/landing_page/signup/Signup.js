import React, { useState } from "react";

function Signup() {
  const [name, setName] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState(1); // 1: Info, 2: OTP, 3: Completed
  const [assignedId, setAssignedId] = useState("");
  const [loading, setLoading] = useState(false);

  const handleStep1Submit = (e) => {
    e.preventDefault();
    if (mobileNumber.length === 10) {
      setStep(2);
      setOtp("1234"); // Pre-filled convenience OTP
    }
  };

  const handleVerifyOtp = (e) => {
    e.preventDefault();
    setLoading(true);

    fetch("http://localhost:3002/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: name || "Trader",
        phone: mobileNumber,
        email: email || "trader@zerodha.local",
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setLoading(false);
        setAssignedId(data.user?.username || "ZU1234");
        setStep(3);
      })
      .catch((err) => {
        setLoading(false);
        setAssignedId("ZU" + Math.floor(1000 + Math.random() * 9000));
        setStep(3);
      });
  };

  return (
    <div className="container p-5 mb-5">
      <div className="row text-center mt-4">
        <h1 className="fs-2">Open a Zerodha account</h1>
        <p className="text-muted fs-5 mt-2">
          Modern platforms and apps, ₹0 investments, and flat ₹20 intraday and F&amp;O trades.
        </p>
      </div>

      <div className="row mt-5 align-items-center">
        <div className="col-md-7 text-center p-4">
          <img
            src="media/images/signup.png"
            alt="Zerodha Signup"
            style={{ width: "90%", maxWidth: "520px" }}
          />
        </div>
        <div className="col-md-5 p-4">
          {step === 1 && (
            <div>
              <h2 className="fs-3 mb-2">Signup now</h2>
              <p className="text-muted mb-4">Start investing in stocks, ETFs, and mutual funds</p>

              <form onSubmit={handleStep1Submit}>
                <div className="mb-3">
                  <label className="form-label text-muted" style={{ fontSize: "14px" }}>
                    Full Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter your name"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label text-muted" style={{ fontSize: "14px" }}>
                    Mobile Number
                  </label>
                  <div className="input-group">
                    <span className="input-group-text bg-white">+91</span>
                    <input
                      type="tel"
                      className="form-control"
                      placeholder="Your 10-digit mobile number"
                      maxLength="10"
                      pattern="[0-9]{10}"
                      required
                      value={mobileNumber}
                      onChange={(e) => setMobileNumber(e.target.value.replace(/\D/g, ""))}
                    />
                  </div>
                </div>

                <div className="mb-3">
                  <label className="form-label text-muted" style={{ fontSize: "14px" }}>
                    Email Address
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    placeholder="name@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <button
                  type="submit"
                  className="btn btn-primary w-100 p-2 fs-5 mt-2"
                  style={{ backgroundColor: "#387ed1", borderColor: "#387ed1" }}
                >
                  Continue
                </button>
              </form>
            </div>
          )}

          {step === 2 && (
            <div>
              <h2 className="fs-3 mb-2">Verify Mobile</h2>
              <p className="text-muted mb-4">
                We sent a 4-digit code to <strong>+91 {mobileNumber}</strong>
              </p>

              <form onSubmit={handleVerifyOtp}>
                <div className="mb-3">
                  <label className="form-label text-muted" style={{ fontSize: "14px" }}>
                    Enter OTP (Demo OTP: 1234)
                  </label>
                  <input
                    type="text"
                    className="form-control text-center fs-3 letter-spacing"
                    maxLength="4"
                    required
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    style={{ letterSpacing: "8px" }}
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="btn btn-primary w-100 p-2 fs-5 mt-2"
                  style={{ backgroundColor: "#387ed1", borderColor: "#387ed1" }}
                >
                  {loading ? "Verifying..." : "Verify & Open Account"}
                </button>

                <div className="text-center mt-3">
                  <button
                    type="button"
                    className="btn btn-link text-decoration-none"
                    onClick={() => setStep(1)}
                    style={{ color: "#387ed1", fontSize: "13px" }}
                  >
                    ← Change Mobile Number
                  </button>
                </div>
              </form>
            </div>
          )}

          {step === 3 && (
            <div className="card p-4 border-success text-center" style={{ backgroundColor: "#f9fff9" }}>
              <div style={{ fontSize: "40px", color: "#2e7d32" }}>✓</div>
              <h3 className="fs-4 text-success mt-2">Account Created!</h3>
              <p className="text-muted mt-2">
                Welcome aboard, <strong>{name || "Trader"}</strong>! Your Demat &amp; Trading account is active.
              </p>
              <div
                className="p-3 my-3 rounded"
                style={{ backgroundColor: "#e8f5e9", border: "1px dashed #4caf50" }}
              >
                <span className="text-muted d-block" style={{ fontSize: "12px" }}>
                  YOUR ZERODHA CLIENT ID
                </span>
                <span className="fs-3 fw-bold text-dark">{assignedId}</span>
              </div>
              <a
                href="http://localhost:3001"
                className="btn btn-primary w-100 p-2 fs-5 mt-2"
                style={{ backgroundColor: "#387ed1", borderColor: "#387ed1" }}
              >
                Open Kite Trading Dashboard ↗
              </a>
            </div>
          )}

          <p className="text-muted mt-4" style={{ fontSize: "12px" }}>
            By continuing, you agree to Zerodha's{" "}
            <a href="#" style={{ textDecoration: "none", color: "#387ed1" }}>
              Terms &amp; Conditions
            </a>{" "}
            and{" "}
            <a href="#" style={{ textDecoration: "none", color: "#387ed1" }}>
              Privacy Policy
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  );
}

export default Signup;
