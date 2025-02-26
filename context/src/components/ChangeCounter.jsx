import { useCounterContext } from "../hooks/useCounterContext";
const ChangeCounter = () => {
  const { counter, setCounter } = useCounterContext();

  return (
    <div>
      <p>Current counter value: {counter}</p>
      <button onClick={() => setCounter(counter + 1)}>Click here</button>
    </div>
  );
};

export default ChangeCounter;
