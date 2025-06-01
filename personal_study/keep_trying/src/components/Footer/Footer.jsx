import "./Footer.css";
import { FaMapMarkerAlt } from "react-icons/fa";

const Footer = () => {
  return (
    <footer id="footer-main">
      <p>
        <span id="company-name">Prime Rewind &copy; 2025 </span>
        <br />
        <FaMapMarkerAlt />
        945 Wilson Avenue
      </p>
    </footer>
  );
};

export default Footer;
