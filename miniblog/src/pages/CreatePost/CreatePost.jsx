import styles from "./CreatePost.module.css";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthValue } from "../../context/AuthContext";
import { useAuthentication } from "../../hooks/useAuthentication";
import { useInsertDocument } from "../../hooks/useInsertDocument";

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [body, setBody] = useState("");
  const [tags, setTags] = useState([]);
  const [formError, setFormError] = useState("");
  const { loading, error: createPostError } = useAuthentication();
  const { insertDocument, response } = useInsertDocument("posts");
  const { user } = useAuthValue();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormError("");

    // validate image URL
    try {
      new URL(image);
    } catch (error) {
      setFormError("A imagem preisa ser uma URL");
    }
    // create tag array
    const tagsArray = tags.split(",").map((tag) => tag.trim().toLowerCase());

    // check all values filled
    if (!title || !image || !tags || !body) {
      setFormError("Por favor preencha todos campos");
    }

    if (formError) return;
    insertDocument({
      uid: user.uid,
      createdBy: user.displayName,
      title,
      image,
      body,
      tags,
    });
    navigate("/");
  };
  return (
    <div className={styles.create_post}>
      <h2>Criar Post</h2>
      <p>Escreva sobre o que quiser e compartilhe o seu conhecimento!</p>
      <form onSubmit={handleSubmit}>
        <label>
          <span>Titulo:</span>
          <input
            type="text"
            name="title"
            required
            placeholder="Pense em um bon titulo..."
            onChange={(e) => setTitle(e.target.value)}
            value={title}
          />
        </label>
        <label>
          <span>URL da Imagem:</span>
          <input
            type="text"
            name="title"
            required
            placeholder="Insira uma imagem legal"
            onChange={(e) => setImage(e.target.value)}
            value={image}
          />
        </label>
        <label>
          <span>Conteudo:</span>
          <textarea
            type=""
            name="title"
            required
            placeholder="Insira o conteudo do post"
            onChange={(e) => setBody(e.target.value)}
            value={body}
          />
        </label>
        <label>
          <span>Tags:</span>
          <input
            type="text"
            name="title"
            required
            placeholder="Insira as tags separadas por virgula"
            onChange={(e) => setTags(e.target.value)}
            value={tags}
          />
        </label>
        {response.error && <p className="error">{response.error}</p>}
        {formError && <p className="error">{formError}</p>}
        {!response.loading && <button className="btn">Postar</button>}
        {response.loading && (
          <div>
            <img src="https://i.gifer.com/ZKZg.gif"></img>
            <button className="btn" disabled>
              Aguarde...
            </button>
          </div>
        )}
      </form>
    </div>
  );
};

export default CreatePost;
