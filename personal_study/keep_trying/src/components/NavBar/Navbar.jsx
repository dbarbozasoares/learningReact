import "./NavBar.css";
import { SlNote } from "react-icons/sl";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar-top">
      <ul className="navbar-list">
        <li>
          <NavLink to={"/"}>
            <img
              style={{
                width: "80px",
                height: "60px",
              }}
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSlj9lRfyXlP-b5wZN9F1ljPNFDnhHf_jzhxw&s"
            ></img>
          </NavLink>
        </li>
        <li>
          <NavLink to="/">Home</NavLink>
        </li>
        <li>
          <NavLink to="/clients">Clients</NavLink>
        </li>
        <li>
          <NavLink to="/orders">Orders</NavLink>
        </li>
        <li id="add-new-order">
          <NavLink to="/addOrder">
            <SlNote />
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
