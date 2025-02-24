import "./StartScreen.css";

function StartScreen({ startGame }) {
  return (
    <div className="start">
      <h1>Secret Word</h1>
      <p>Clique no botao para comecar</p>
      <button onClick={startGame}>Comecar jogo</button>
    </div>
  );
}

export default StartScreen;
