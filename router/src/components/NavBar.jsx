import "./NavBar.css";

import { Link, NavLink } from "react-router-dom";
const NavBar = () => {
  return (
    <nav>
      {/* <Link to="/">Home</Link>
      <Link to="/about">About</Link> */}
      <NavLink
        to={"/"}
        // className={({ isActive }) => (isActive ? "esta-ativo" : "nao-ativo")}
      >
        Home
      </NavLink>
      <NavLink to={"/about"}>About</NavLink>
    </nav>
  );
};

export default NavBar;
