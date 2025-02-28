import { db, app } from "../firebase/config";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  signOut,
} from "firebase/auth";

import { useState, useEffect } from "react";

export const useAuthentication = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(null);

  // cleanup
  // deal with memory leak
  const [cancelled, setCancelled] = useState(false);

  const auth = getAuth(app);

  function checkIfIsCancelled() {
    if (cancelled) return;
  }

  const createUser = async (data) => {
    checkIfIsCancelled();

    setLoading(true);

    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );
      await updateProfile(user, { displayName: data.displayName });
      setLoading(false);
      return user;
    } catch (error) {
      console.log(error.message);
      console.log(typeof error.message);

      let systemErrorMessage;
      setLoading(false);
      if (error.message.includes("Password")) {
        systemErrorMessage = "A senha precisa ter pelo menos 6 characteres";
      } else if (error.message.includes("email-already")) {
        systemErrorMessage = "Email ja cadastrado";
      } else {
        systemErrorMessage = "Ocorreu um erro, por favor tente mais tarde";
      }
      setError(systemErrorMessage);
    }
  };

  // logout - sign out
  const logout = () => {
    checkIfIsCancelled();

    signOut(auth);
  };

  const login = async (data) => {
    if (checkIfIsCancelled()) return;

    setLoading(true);
    setError(null); // Limpar erros anteriores

    // Verifique se o e-mail tem um formato válido
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(data.email)) {
      setError("Por favor, insira um e-mail válido.");
      setLoading(false);
      return;
    }
    try {
      console.log("Tentando login com email:", data.email); // Logar o email
      await signInWithEmailAndPassword(auth, data.email, data.password);
      setLoading(false);
    } catch (error) {
      console.log("Erro completo:", error);

      try {
        await signInWithEmailAndPassword(auth, data.email, data.password);
        setLoading(false);
      } catch (error) {
        console.log("Erro completo:", error);
        let systemErrorMessage; // error message

        switch (error.code) {
          case "auth/user-not-found":
            systemErrorMessage = "Usuário não encontrado";
            break;
          case "auth/wrong-password":
            systemErrorMessage = "Senha incorreta";
            break;
          case "auth/invalid-credential":
            systemErrorMessage = "Credenciais inválidas fornecidas";
            break;
          case "auth/too-many-requests":
            systemErrorMessage =
              "Muitas tentativas de login. Por favor, tente novamente mais tarde.";
            break;
          case "auth/network-request-failed":
            systemErrorMessage =
              "Erro de rede. Verifique sua conexão e tente novamente.";
            break;
          default:
            systemErrorMessage = "Ocorreu um erro, tente mais tarde";
        }
        setError(systemErrorMessage);
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    return () => setCancelled(true);
  }, []);

  return { auth, createUser, error, loading, logout, login };
};
