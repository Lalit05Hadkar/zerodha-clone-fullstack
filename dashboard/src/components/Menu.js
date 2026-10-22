import React, { useState } from "react";
import { Link } from "react-router-dom";

const Menu = () => {
  const [selectedMenu, setSelectedMenu] = useState(0);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);

  const handleMenuClick = (index) => {
    setSelectedMenu(index);
    setIsProfileDropdownOpen(false);
  };

  const handleProfileClick = () => {
    setIsProfileDropdownOpen(!isProfileDropdownOpen);
  };

  const menuClass = "menu";
  const activeMenuClass = "menu selected";

  return (
    <div className="menu-container" style={{ position: "relative" }}>
      <a href="http://localhost:3000" title="Back to Zerodha Home">
        <img
          src="logo.png"
          style={{ width: "40px", cursor: "pointer", marginRight: "10px" }}
          alt="Zerodha Logo"
        />
      </a>
      <div className="menus">
        <ul>
          <li>
            <Link
              style={{ textDecoration: "none" }}
              to="/"
              onClick={() => handleMenuClick(0)}
            >
              <p className={selectedMenu === 0 ? activeMenuClass : menuClass}>
                Dashboard
              </p>
            </Link>
          </li>
          <li>
            <Link
              style={{ textDecoration: "none" }}
              to="/orders"
              onClick={() => handleMenuClick(1)}
            >
              <p className={selectedMenu === 1 ? activeMenuClass : menuClass}>
                Orders
              </p>
            </Link>
          </li>
          <li>
            <Link
              style={{ textDecoration: "none" }}
              to="/holdings"
              onClick={() => handleMenuClick(2)}
            >
              <p className={selectedMenu === 2 ? activeMenuClass : menuClass}>
                Holdings
              </p>
            </Link>
          </li>
          <li>
            <Link
              style={{ textDecoration: "none" }}
              to="/positions"
              onClick={() => handleMenuClick(3)}
            >
              <p className={selectedMenu === 3 ? activeMenuClass : menuClass}>
                Positions
              </p>
            </Link>
          </li>
          <li>
            <Link
              style={{ textDecoration: "none" }}
              to="/funds"
              onClick={() => handleMenuClick(4)}
            >
              <p className={selectedMenu === 4 ? activeMenuClass : menuClass}>
                Funds
              </p>
            </Link>
          </li>
          <li>
            <Link
              style={{ textDecoration: "none" }}
              to="/apps"
              onClick={() => handleMenuClick(6)}
            >
              <p className={selectedMenu === 6 ? activeMenuClass : menuClass}>
                Apps
              </p>
            </Link>
          </li>
        </ul>
        <hr />
        <div
          className="profile"
          onClick={handleProfileClick}
          style={{ cursor: "pointer", position: "relative" }}
        >
          <div className="avatar">LH</div>
          <p className="username">LH0505</p>

          {isProfileDropdownOpen && (
            <div
              style={{
                position: "absolute",
                top: "45px",
                right: "0",
                background: "#fff",
                border: "1px solid #e0e0e0",
                borderRadius: "6px",
                boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
                width: "230px",
                zIndex: 200,
                textAlign: "left",
                padding: "10px 0",
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <div style={{ padding: "8px 16px", borderBottom: "1px solid #eee" }}>
                <p style={{ margin: 0, fontWeight: "600", fontSize: "14px", color: "#333" }}>
                  Lalit Hadkar
                </p>
                <p style={{ margin: "2px 0 0 0", fontSize: "12px", color: "#777" }}>
                  LH0505 • lalit@zerodha.local
                </p>
                <a
                  href="https://github.com/Lalit05Hadkar"
                  target="_blank"
                  rel="noreferrer"
                  style={{ fontSize: "11px", color: "#387ed1", textDecoration: "none" }}
                >
                  github.com/Lalit05Hadkar ↗
                </a>
              </div>
              <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                <li>
                  <a
                    href="http://localhost:3000"
                    target="_blank"
                    rel="noreferrer"
                    style={{
                      display: "block",
                      padding: "8px 16px",
                      fontSize: "13px",
                      color: "#387ed1",
                      textDecoration: "none",
                    }}
                  >
                    Zerodha Landing Page ↗
                  </a>
                </li>
                <li>
                  <Link
                    to="/funds"
                    onClick={() => {
                      setSelectedMenu(4);
                      setIsProfileDropdownOpen(false);
                    }}
                    style={{
                      display: "block",
                      padding: "8px 16px",
                      fontSize: "13px",
                      color: "#444",
                      textDecoration: "none",
                    }}
                  >
                    Manage Funds
                  </Link>
                </li>
                <li>
                  <Link
                    to="/apps"
                    onClick={() => {
                      setSelectedMenu(6);
                      setIsProfileDropdownOpen(false);
                    }}
                    style={{
                      display: "block",
                      padding: "8px 16px",
                      fontSize: "13px",
                      color: "#444",
                      textDecoration: "none",
                    }}
                  >
                    Apps & Consoles
                  </Link>
                </li>
                <li style={{ borderTop: "1px solid #eee", marginTop: "5px" }}>
                  <a
                    href="http://localhost:3000"
                    style={{
                      display: "block",
                      padding: "8px 16px",
                      fontSize: "13px",
                      color: "#d32f2f",
                      textDecoration: "none",
                    }}
                  >
                    Log out
                  </a>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Menu;
