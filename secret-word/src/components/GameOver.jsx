import React from "react";

const GameOver = ({ retry }) => {
  return (
    <div>
      <h1>Game over</h1>
      <button onClick={retry}>Reiniciar jogo</button>
    </div>
  );
};

export default GameOver;
