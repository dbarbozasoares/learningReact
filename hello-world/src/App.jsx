import "./App.css";
import FirstComponent from "./components/FirstComponent";
import TemplateExpressions from "./components/TemplateExpressions";
import Events from "./components/Events";
import Challenge from "./components/Challenge";
function App() {
  return (
    <>
      <div className="App">
        <h1>Fundamentos React</h1>
        <FirstComponent></FirstComponent>
        <TemplateExpressions></TemplateExpressions>
        <Events></Events>
        <Challenge></Challenge>
      </div>
    </>
  );
}

export default App;
