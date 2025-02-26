import { useTitleColorContext } from "../hooks/useTitleColorContext";

const Home = () => {
  const { color, dispatch } = useTitleColorContext();

  // alterando state complexo
  const setTitleColor = (color) => {
    dispatch({ type: color });
  };
  return (
    <div>
      <h1 style={{ color: color }}>Home</h1>
      {/* Alternando contexto complexo */}
      <div>
        <button onClick={() => setTitleColor("RED")}>RED</button>
        <button onClick={() => setTitleColor("BLUE")}>BLUE</button>
      </div>
    </div>
  );
};

export default Home;
