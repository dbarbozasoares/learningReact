import { NavLink } from "react-router-dom";
import { useAuthentication } from "../hooks/useAuthentication";
import { useAuthValue } from "../context/AuthContext";
import { useState, useRef, useEffect } from "react"; // Import necessary hooks

import styles from "./NavBar.module.css";

const NavBar = () => {
  const { user } = useAuthValue();
  const { logout } = useAuthentication();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null); // Reference to the menu

  // Toggle menu visibility
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  // Close menu when a link is clicked
  const closeMenu = () => {
    setMenuOpen(false);
  };

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Handle logout and close the menu
  const handleLogout = () => {
    closeMenu(); // Close the menu before logging out
    logout(); // Then proceed with logout
  };

  return (
    <nav className={styles.navbar}>
      <NavLink to={"/"} className={styles.brand} onClick={closeMenu}>
        Mini <span>Blog</span>
        {user ? <p>Ola, {user.displayName}</p> : <p>Bem vindo!</p>}
      </NavLink>

      {/* Hamburger Icon */}
      <div className={styles.menuIcon} onClick={toggleMenu}>
        ☰
      </div>

      {/* Links list */}
      <ul
        ref={menuRef} // Attach ref to menu
        className={`${styles.links_list} ${menuOpen ? styles.open : ""}`}
      >
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
              <button onClick={handleLogout}>Logout</button>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default NavBar;
