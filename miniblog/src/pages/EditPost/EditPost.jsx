import styles from "./EditPost.module.css";

import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuthValue } from "../../context/AuthContext";
import { useUpdateDocument } from "../../hooks/useUpdateDocument";
import { useFetchDocument } from "../../hooks/useFetchDocument";

const EditPost = () => {
  const { id } = useParams();
  const { document: post } = useFetchDocument("posts", id);

  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [body, setBody] = useState("");
  const [tags, setTags] = useState([]);
  const [formError, setFormError] = useState("");
  const { updateDocument, response } = useUpdateDocument("posts");
  const { user } = useAuthValue();
  const navigate = useNavigate();
  console.log(post);
  useEffect(() => {
    if (post) {
      setTitle(post.title);
      setBody(post.body);
      setImage(post.image);
      const textTags = post.tagsArray.join(",");
      setTags(textTags);
    }
  }, [post]);

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

    const data = {
      uid: user.uid,
      createdBy: user.displayName,
      title,
      image,
      body,
      tagsArray,
    };
    updateDocument(id, data);
    navigate("/dashboard");
  };
  return (
    <div className={styles.edit_post}>
      {post && (
        <>
          <h2>Editando post: {post.title}</h2>
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
            <p className={styles.preview_title}>Preview da imagem atual:</p>
            <img
              className={styles.image_preview}
              src={post.image}
              alt={post.title}
            />
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
            {!response.loading && <button className="btn">Editar</button>}
            {response.loading && (
              <div>
                <img src="https://i.gifer.com/ZKZg.gif"></img>
                <button className="btn" disabled>
                  Aguarde...
                </button>
              </div>
            )}
          </form>
        </>
      )}
    </div>
  );
};

export default EditPost;
