import "./App.css";

// config react router
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// pages
import Home from "./pages/Home";
import About from "./pages/About";
import Product from "./pages/Product";
import Info from "./pages/Info";
import NotFound from "./pages/NotFound";
import Search from "./pages/Search";
// components
import NavBar from "./components/NavBar";
import SearchForm from "./components/SearchForm";

function App() {
  return (
    <div>
      <BrowserRouter>
        {/* Links com react Router*/}
        <NavBar />
        {/* Search */}
        <SearchForm />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          {/* Dynamic Route */}
          <Route path="/products/:id" element={<Product />} />
          {/* Nested Route */}
          <Route path="/products/:id/info" element={<Info />} />
          {/* Search Route */}
          <Route path="/search" element={<Search />} />
          {/* Redirecting */}
          <Route path="/company" element={<Navigate to={"/About"} />} />
          {/* No route matched */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
