import styles from "./Register.module.css";
import { useState, useEffect } from "react";
import { useAuthentication } from "../../hooks/useAuthentication";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const { createUser, error: authError, loading } = useAuthentication();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    const user = { displayName, email, password };

    if (password !== confirmPassword) {
      setError("As senhas precisam ser iguais!");
      setPassword("");
      setConfirmPassword("");
      return;
    }
    const res = await createUser(user);
    navigate("/dashboard");
  };

  useEffect(() => {
    if (authError) {
      setError(authError);
    }
  });

  return (
    <div className={styles.register}>
      <h1>Cadastre-se para postar</h1>
      <p>Crie seu usuario e compartilhe suas historias</p>
      <form onSubmit={handleSubmit}>
        <label>
          <span>Nome:</span>
          <input
            type="text"
            name="displayName"
            required
            placeholder="Nome do usuario"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
          />
        </label>
        <label>
          <span>Email:</span>
          <input
            type="text"
            name="email"
            required
            placeholder="Email do usuario"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label>
          <span>Senha:</span>
          <input
            type="password"
            name="password"
            required
            placeholder="Insira sua senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <label>
          <span>Confirmacao de senha:</span>
          <input
            type="password"
            name="confirmPassword"
            required
            placeholder="Confirme a sua senha"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </label>
        {error != "" && <p className="error">{error}</p>}
        {!loading && <button className="btn">Cadastrar</button>}
        {loading && (
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

export default Register;
