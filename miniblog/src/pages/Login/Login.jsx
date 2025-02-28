import styles from "./Login.module.css";
import { useState, useEffect } from "react";
import { useAuthentication } from "../../hooks/useAuthentication";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const { login, error: loginError, loading } = useAuthentication();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    const user = { email, password };

    const res = await login(user);
    console.log(loginError);
  };
  useEffect(() => {
    if (loginError) {
      setError(loginError);
    }
  });
  return (
    <div className={styles.login}>
      <h1>Entrar</h1>
      <p>Realize o login para utilizar o sistema</p>
      <form onSubmit={handleSubmit}>
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
        {error && <p className="error">{loginError}</p>}
        {!loading && <button className="btn">Entrar</button>}
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

export default Login;
