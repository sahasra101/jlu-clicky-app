import React from "react";
import "./style.css";



function NavBar(props) {
  return (
    <nav className="navbar navbar-light fixed-top bg-dark">
      <span className="navbar mb-0 h2 text-light">React Clicky Game</span>
      <span className="nav-item navbar-text mb-0 h3 text-danger">{props.navMiddleMessage}</span>
      <span className="nav-item navbar-text score mb-0 h2 text-light" id="currentScore">Your Score: {props.currentScore} | Top Score: {props.topScore}</span>
    </nav>
  );
}

export default NavBar;