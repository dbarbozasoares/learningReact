import "./App.css";
import MyForm from "./components/MyForm";
function App() {
  return (
    <>
      <MyForm
        user={{
          name: "Diego B Soares",
          email: "diegao@hotmail.com",
          bio: "Sou lutador",
          role: "admin",
        }}
      />
    </>
  );
}

export default App;
