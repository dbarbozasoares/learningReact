import styles from "./Home.module.css";

// hooks
import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import { useFetchDocuments } from "../../hooks/useFetchDocuments";

// components
import PostDetail from "../PostDetail";

const Home = () => {
  const [query, setQuery] = useState("");
  const { documents: posts, loading } = useFetchDocuments("posts");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(query);
    if (query) {
      return navigate(`/search?q=${query}`);
    }
  };
  return (
    <div className={styles.home}>
      <h1>Veja nossos posts mais recentes</h1>
      <form className={styles.search_form}>
        <input
          type="text"
          placeholder="Ou busque por tags..."
          onChange={(e) => setQuery(e.target.value)}
        />
        <button className="btn btn-dark" onClick={handleSubmit}>
          Pesquisar
        </button>
      </form>
      <div>
        {loading && <img src="https://i.gifer.com/ZKZg.gif"></img>}
        {posts &&
          posts.map((post) => (
            <h3 key={post.id}>
              <PostDetail key={post.id} post={post} />
            </h3>
          ))}
        {posts && posts.length === 0 && (
          <div className={styles.noposts}>
            <p>Nao foram encontrados posts</p>
            <Link to={"/posts/create"} className="btn">
              Criar primeiro post
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
