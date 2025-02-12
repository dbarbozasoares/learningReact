import "./App.css";
import MyComponent from "./components/MyComponent";
import Title from "./components/Title";

function App() {
  const val = true;
  return (
    <>
      <h1 className={val === true ? "true-value" : "false-value"}>
        If true color is green
      </h1>
      {/* DYNAMIC CLASS */}
      <MyComponent />
      <h1>Outside of component</h1>
      {/*CSS MODULES */}
      <Title />
      <h2 className="my_title">Testando fora do scope</h2>
    </>
  );
}

export default App;
