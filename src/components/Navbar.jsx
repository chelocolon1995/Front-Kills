import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <>
      {/* HEADER */}
      <header>
        <nav className="navbar fixed-top navbar-expand-md navbar-dark bg-dark">
          <div className="container-fluid">
            <div className="collapse navbar-collapse justify-content-center">
              <div className="navbar-nav align-items-center" >
                <NavLink to="/" className="nav-link">
                  Home
                </NavLink>
                <NavLink to="/upload" className="nav-link">
                  Upload Data
                </NavLink>
              </div>
            </div>
          </div>
        </nav>
      </header>
    </>
  );
};

export default Navbar;
