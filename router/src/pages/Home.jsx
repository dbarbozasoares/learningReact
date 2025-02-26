// Links com react Router
import { Link } from "react-router-dom";
import { useFetch } from "../hooks/useFetch";
import "./Home.css";
const Home = () => {
  const url = "http://localhost:3000/products";
  const { data: items, loading, error } = useFetch(url);
  return (
    <div>
      <h1>Products</h1>
      {error && <p>{error}</p>}
      {loading && (
        <img src="https://upload.wikimedia.org/wikipedia/commons/b/b1/Loading_icon.gif" />
      )}
      <ul className="products">
        {items &&
          items.map((item) => (
            <li key={item.id}>
              <p>{item.id}</p>
              <h2>{item.name}</h2>
              <p>${item.price}</p>
              {/* Detalhes */}
              <Link to={`/products/${item.id}`}>Detalhes</Link>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default Home;
