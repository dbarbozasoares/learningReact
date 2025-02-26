import { useTitleColorContext } from "../hooks/useTitleColorContext";

const About = () => {
  const { color } = useTitleColorContext();
  return (
    <div>
      <h1 style={{ color: color }}>About page</h1>
    </div>
  );
};

export default About;
