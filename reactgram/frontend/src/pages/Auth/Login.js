import "./Auth.css";

//Components
import { Link } from "react-router-dom";
import LoadingAndError from "../../components/LoadingAndError";

// Hooks
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

// Redux
import { login, reset } from "../../slices/authSlice";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { loading, error } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();

    const user = { email, password };

    dispatch(login(user));
  };

  // Clean all auth states
  useEffect(() => {
    dispatch(reset());
  }, [dispatch]);
  return (
    <div id="login">
      <h2>ReactGram</h2>
      <p className="subtitle">Make login to see updates</p>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="E-mail"
          onChange={(e) => setEmail(e.target.value)}
          value={email || ""}
        />
        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          value={password || ""}
        />
        <LoadingAndError loading={loading} error={error} type={"login"} />
      </form>

      <p>
        Don't have an account? <Link to="/register">Click here</Link>
      </p>
    </div>
  );
};

export default Login;
