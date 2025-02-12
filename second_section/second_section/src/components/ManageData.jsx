import { useState } from "react";

const ManageData = () => {
  let someData = 10;
  const [number, setNumber] = useState();
  return (
    <div>
      <div>
        <p>Valor: {someData}</p>
        <button onClick={() => (someData = 15)}>Change value</button>
      </div>
      <div>
        <p>Valor dinamico: {number}</p>
        <button onClick={() => setNumber(25)}>Mudar o state</button>
      </div>
    </div>
  );
};

export default ManageData;
