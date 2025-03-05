import { useState, useEffect, useMemo, useRef } from "react";

const HookUseMemo = () => {
  const [number, setNumber] = useState("");
  //   const premiumNumbers = ["0", "100", "200"];
  const premiumNumbers = useMemo(() => {
    return ["0", "100", "200"];
  }, []);
  const inputNumber = useRef(null);

  useEffect(() => {
    console.log("Premium numbers foi alterado");
  }, [premiumNumbers]);

  const handleKeyDown = (e) => {
    e.preventDefault();
    inputNumber.current.focus();
    setNumber("");
  };

  return (
    <div>
      <h2>useMemo</h2>
      <input
        type="text"
        value={number}
        onChange={(e) => setNumber(e.target.value)}
        ref={inputNumber}
      />
      <button onClick={handleKeyDown}>Click</button>
      {premiumNumbers.includes(number) ? (
        <p>Acertou o numero</p>
      ) : (
        <p>Errou o numero</p>
      )}
      <hr />
    </div>
  );
};

export default HookUseMemo;
