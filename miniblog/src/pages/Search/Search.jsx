import styles from "./Search.module.css";
import { Link } from "react-router-dom";
import { useFetchDocuments } from "../../hooks/useFetchDocuments";
import { useQuery } from "../../hooks/useQuery";
import PostDetail from "../PostDetail";
const Search = () => {
  const query = useQuery();
  const search = query.get("q");

  const { documents: posts } = useFetchDocuments("posts", search);
  console.log(search);
  return (
    <div className={styles.search_container}>
      <h2>Search</h2>
      <div>
        {posts && posts.length === 0 && (
          <div className={styles.noposts}>
            <p>Nao foram encotrados posts a partir da TAG requerida</p>
            <Link to={"/"} className="btn btn-dark">
              Voltar
            </Link>
          </div>
        )}
        {posts &&
          posts.map((post) =>
            post.tagsArray.includes(search) ? (
              <PostDetail key={post.id} post={post} />
            ) : (
              ""
            )
          )}
      </div>
    </div>
  );
};

export default Search;
