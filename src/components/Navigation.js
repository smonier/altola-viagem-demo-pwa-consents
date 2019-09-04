import React from "react";
import { NavLink, withRouter } from "react-router-dom";

const Navigation = ({ history, isEditing }) => {
  const { location } = history;
  const hidden =
    location.pathname === "/" &&
    (location.hash === "#home" || location.hash === "");

  let logoLink = null;
  if (!hidden) {
    const logo = (
      <img
        alt="Viagem"
        src='data:image/png;base64,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'
      />
    );
    logoLink = (
      <a href="#home" title="Viagem">
        {logo}
      </a>
    );

    if (location.pathname !== "/") {
      logoLink = (
        <NavLink to="/" title="Viagem">
          {logo}
        </NavLink>
      );
    }
  }

  return (
    <nav className="panel top">
      <div className="sections">
        <div className="left" />
        <div className="center">{logoLink}</div>
        <div className="right" />
      </div>
    </nav>
  );
};

export default withRouter(Navigation);
