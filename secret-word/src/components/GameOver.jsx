import React from "react";

const GameOver = ({ retry, score }) => {
  return (
    <div>
      <h1>Fim de Jogo!</h1>
      <h2>
        A sua pontuacao foi: <span>{score}</span>
      </h2>
      <button onClick={retry}>Reiniciar jogo</button>
    </div>
  );
};

export default GameOver;
