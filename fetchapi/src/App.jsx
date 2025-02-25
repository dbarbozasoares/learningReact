import "./App.css";
import { useState, useEffect } from "react";
// custom hook
import { useFetch } from "./hooks/useFetch";
const url = "http://localhost:3000/products";
function App() {
  const [products, setProducts] = useState([]);

  // custom fetch
  const { data: items, httpConfig, loading, error } = useFetch(url);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [deleteId, setDeleteId] = useState("");

  useEffect(() => {
    if (items) {
      setProducts(items);
    }
  }, [items]);

  // // get data
  // useEffect(() => {
  //   async function fetchData() {
  //     const res = await fetch(url);
  //     const data = await res.json();
  //     setProducts(data);
  //   }
  //   fetchData();
  // }, []);

  // add product
  const handleSubmit = async (e) => {
    e.preventDefault();

    const product = { name, price };
    // const res = await fetch(url, {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify(product),
    // });

    // // dynamic reload
    // const addedProduct = await res.json();
    // setProducts((prevProducts) => [...prevProducts, addedProduct]);

    // refactoring POST method
    httpConfig(product, "POST");
    setName("");
    setPrice("");
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    const obj = { id: deleteId };
    httpConfig(obj, "DELETE");
    setDeleteId("");
  };
  return (
    <>
      <div className="App">
        <h1>Lista de Produtos</h1>
        {loading && (
          <img src="https://upload.wikimedia.org/wikipedia/commons/b/b1/Loading_icon.gif" />
        )}
        {error && <p>{error}</p>}
        {!loading && (
          <ul>
            {products.map((product) => (
              <li key={product.id}>
                #ID({product.id}) ------ {product.name} - R${product.price}
              </li>
            ))}
          </ul>
        )}
        <div className="add-product">
          <form onSubmit={handleSubmit}>
            <label>
              Nome:
              <input
                type="text"
                value={name}
                name="name"
                onChange={(e) => setName(e.target.value)}
              />
            </label>
            <label>
              Price:
              <input
                type="text"
                value={price}
                name="name"
                onChange={(e) => setPrice(e.target.value)}
              />
            </label>
            {loading && <input type="submit" disabled value={"Aguarde"} />}
            {!loading && <input type="submit" value={"Criar"} />}
            <label>
              Name to delete:
              <input
                type="text"
                value={deleteId}
                name="deleteName"
                onChange={(e) => setDeleteId(e.target.value)}
              />
            </label>
            <button onClick={handleDelete}>Delete product</button>
          </form>
        </div>
      </div>
    </>
  );
}

export default App;
