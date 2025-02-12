import { useState } from "react";

const CondtionalRender = () => {
  const [x] = useState(false);
  const [name, setName] = useState("Matheus");

  return (
    <div>
      <h1>Conditional Render</h1>
      {x && <p>Se x for true sim</p>}
      {!x && <p>Se x for negativo, imprime isso</p>}
      {name === "Diego" ? (
        <div>
          <p>Imprime isso se nome igual {name}</p>{" "}
        </div>
      ) : (
        <p>Se nao imprime isso</p>
      )}
      <button onClick={() => setName("Diego")}>Set name</button>
    </div>
  );
};

export default CondtionalRender;
