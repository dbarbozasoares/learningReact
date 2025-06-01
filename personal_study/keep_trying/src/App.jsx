import "./App.css";
import NavBar from "./components/NavBar/Navbar";
import NewOrder from "./pages/NewOrder/NewOrder";
import Home from "./pages/Home/Home";
import Footer from "./components/Footer/Footer";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <NavBar />
        <div className="container">
          <Routes>
            <Route path="/addOrder" element={<NewOrder />} />
            <Route path="/" element={<Home />} />
          </Routes>
        </div>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
