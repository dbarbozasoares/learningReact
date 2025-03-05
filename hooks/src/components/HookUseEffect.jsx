import { useEffect, useState } from "react";

const HookUseEffect = () => {
  // 1 - useEffect sem dependencias
  useEffect(() => {
    console.log("Estou sendo executado");
  });

  const [number, setNumber] = useState(0);
  const changeSomething = () => {
    setNumber(number + 1);
  };

  // array de dependencias vazio
  useEffect(() => {
    console.log("Serei executado apenas uma vez");
  }, []);

  const [anotherNumber, setAnotherNumber] = useState(0);
  // item no array de dependencias
  useEffect(() => {
    if (anotherNumber > 0) console.log("Another number pressed");
  }, [anotherNumber]);

  // cleanup useEffect
  useEffect(() => {
    // const timer = setTimeout(() => {
    //   console.log("Hello world");
    //   setAnotherNumber(anotherNumber+1)
    // }, 3000);
    // //return () => clearTimeout(timer);
  }, [anotherNumber]);
  return (
    <div>
      <h2>useEffect</h2>
      <p>Number: {number}</p>
      <button onClick={changeSomething}>Increase number</button>
      <p>Another number: {anotherNumber}</p>
      <button onClick={() => setAnotherNumber(anotherNumber + 1)}>
        Increase another number
      </button>
    </div>
  );
};

export default HookUseEffect;
