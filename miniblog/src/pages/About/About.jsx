import styles from "./About.module.css";
import { Link } from "react-router-dom";
import { useAuthValue } from "../../context/AuthContext";
const About = () => {
  const { user } = useAuthValue();
  return (
    <div className={styles.about}>
      <h2>
        Sobre o Mini <span>Bog</span>
      </h2>
      <p>This project consists in a blog developed using React and Firebase</p>
      <Link to={user ? "/posts/create" : "/register"} className="btn">
        Make a post
      </Link>
    </div>
  );
};

export default About;
