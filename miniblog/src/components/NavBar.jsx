import { NavLink } from "react-router-dom";
import { useAuthentication } from "../hooks/useAuthentication";
import { useAuthValue } from "../context/AuthContext";
import { useState } from "react"; // Import useState for toggling the menu

import styles from "./NavBar.module.css";

const NavBar = () => {
  const { user } = useAuthValue();
  const { logout } = useAuthentication();
  const [menuOpen, setMenuOpen] = useState(false); // State to control the menu visibility

  // Toggle menu visibility
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  // Close menu when a link is clicked
  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <nav className={styles.navbar}>
      <NavLink to={"/"} className={styles.brand} onClick={closeMenu}>
        Mini <span>Blog</span>
      </NavLink>

      {/* Hamburger Icon */}
      <div className={styles.menuIcon} onClick={toggleMenu}>
        ☰
      </div>

      {/* Links list */}
      <ul className={`${styles.links_list} ${menuOpen ? styles.open : ""}`}>
        <li>
          <NavLink
            to={"/"}
            className={({ isActive }) => (isActive ? styles.active : "")}
            onClick={closeMenu}
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            to={"/about"}
            className={({ isActive }) => (isActive ? styles.active : "")}
            onClick={closeMenu}
          >
            About
          </NavLink>
        </li>
        {!user && (
          <>
            <li>
              <NavLink
                to={"/login"}
                className={({ isActive }) => (isActive ? styles.active : "")}
                onClick={closeMenu}
              >
                Login
              </NavLink>
            </li>
            <li>
              <NavLink
                to={"/register"}
                className={({ isActive }) => (isActive ? styles.active : "")}
                onClick={closeMenu}
              >
                Register
              </NavLink>
            </li>
          </>
        )}
        {user && (
          <>
            <li>
              <NavLink
                to={"/dashboard"}
                className={({ isActive }) => (isActive ? styles.active : "")}
                onClick={closeMenu}
              >
                Dashboard
              </NavLink>
            </li>
            <li>
              <NavLink
                to={"/posts/create"}
                className={({ isActive }) => (isActive ? styles.active : "")}
                onClick={closeMenu}
              >
                Novo Post
              </NavLink>
            </li>
            <li>
              <button onClick={logout}>Logout</button>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default NavBar;
