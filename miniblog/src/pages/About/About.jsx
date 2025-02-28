import styles from "./About.module.css";
import { Link } from "react-router-dom";
const About = () => {
  return (
    <div className={styles.about}>
      <h2>
        Sobre o Mini <span>Bog</span>
      </h2>
      <p>This project consists in a blog developed using React and Firebase</p>
      <Link to={"/posts/create"} className="btn">
        Make a post
      </Link>
    </div>
  );
};

export default About;
