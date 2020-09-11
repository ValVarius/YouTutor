import React from "react";
import { Link } from "react-router-dom";
import API from "../../utils/API";
import { useHistory, useLocation } from "react-router-dom";
import "./style.css";

export default function Navbar(props) {
  const location = useLocation();
  // console.log(location.pathname);

  const history = useHistory();

  const handleLogoutClick = (event) => {
    API.logout().then((res) => {
      props.logoutHandle();
      history.push("/");
    });
  };

  return (
    <nav className="navbar" role="navigation" aria-label="main navigation">
      <div className="navbar-brand">
        {/* LEFT */}
        <div className="navbar-start">
          <Link className="navbar-item" to="/">
            Home
          </Link>
        </div>

        <a
          role="button"
          className="navbar-burger burger"
          aria-label="menu"
          aria-expanded="false"
          data-target="navbarBasicExample"
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>

      <div id="navbarBasicExample" className="navbar-menu">
        
        {/* RIGHT */}
        <div className="navbar-end">
          <div className="navbar-item">
            <div className="buttons ">
              {!props.currentUser && location.pathname !== "/signup" ? (
                <Link className="button is-primary" to="/signup">
                  <strong>Sign up</strong>
                </Link>
              ) : (
                ""
              )}

              {!props.currentUser && location.pathname !== "/login" ? (
                <Link className="button is-light" to="/login">
                  Log In
                </Link>
              ) : (
                ""
              )}

              {props.currentUser ? (
                <button className="button is-light" onClick={handleLogoutClick}>
                  Log Out
                </button>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
