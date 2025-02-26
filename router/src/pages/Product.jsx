import { useParams } from "react-router-dom";
import { useFetch } from "../hooks/useFetch";
import { Link } from "react-router-dom";
const Product = () => {
  const { id } = useParams();

  // Carregamento dado individual
  const url = "http://localhost:3000/products/" + id;

  const { data: product, loading, error } = useFetch(url);
  console.log(product);
  return (
    <div>
      <h2>Product Details</h2>
      {loading && (
        <img src="https://upload.wikimedia.org/wikipedia/commons/b/b1/Loading_icon.gif" />
      )}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {product != null && (
        <div>
          <p>ID do produto: {product.id}</p>
          <p>Nome: {product.name}</p>
          <p>Preço: ${product.price}</p>
          {/* Nested Routes */}
          <Link to={`/products/${product.id}/info`}>Mais informacoes</Link>
        </div>
      )}
    </div>
  );
};

export default Product;
