import Message from "./Message";
import "../pages/Auth/Auth.css";

const LoadingAndError = ({ loading, error, type }) => {
  return (
    <>
      {!loading && (
        <input
          type="submit"
          value={type === "register" ? "Register" : "Enter"}
        />
      )}
      {loading && <input type="submit" value="Aguarde..." disabled />}
      {error && <Message msg={error} type="error" />}
    </>
  );
};

export default LoadingAndError;
