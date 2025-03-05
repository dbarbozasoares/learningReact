import { useState } from "react";

const HookUseState = () => {
  // useState
  let username = "Joao";

  const [name, setName] = useState("Matheus");

  const changeNames = () => {
    username = "Joao Souza";
    setName("Matheus Battisti");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(`Voce tem ${age} anos`);
  };

  // useState e input
  const [age, setAge] = useState(18);
  return (
    <div>
      <h2>useState</h2>
      <p>Variavel: {username}</p>
      <p>useState: {name}</p>
      <button onClick={changeNames}>Mudar nomes</button>
      {/*useState and input */}
      <form onSubmit={handleSubmit}>
        <p>Digite sua idade:</p>
        <input
          type="text"
          value={age}
          onChange={(e) => setAge(e.target.value)}
        />
        <input type="submit" value="Enviar" />
      </form>
      <p>Voce tem {age} anos</p>
      <hr />
    </div>
  );
};

export default HookUseState;
