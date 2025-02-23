import "./MyForm.css";
import { useState } from "react";
const MyForm = ({ user }) => {
  // 3 - Gerenciamento de dados
  const [name, setName] = useState(user ? user.name : "");
  const [email, setEmail] = useState(user ? user.email : "");
  const [bio, setBio] = useState(user ? user.bio : "");
  const [role, setRole] = useState(user ? user.role : "");

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(`${name}`);
    console.log(email);
    console.log(bio);
    console.log(role);

    setEmail("");
    setName("");
    setBio("");
    setRole("");
  };
  return (
    <div>
      {/* 1 Criando form */}
      <form onSubmit={handleSubmit}>
        <h1>Form</h1>
        <div>
          <label htmlFor="name">Nome: </label>
          <input
            type="text"
            name="name"
            placeholder="Digite seu nome"
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
        </div>
        {/* Label envolvendo input*/}
        <label>
          <span>E-mail: </span>
          <input
            type="email"
            name="email"
            placeholder="Digite o seu email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </label>
        {/* Manipulando textarea */}
        <label>
          <span>Bio:</span>
          <textarea
            name="bio"
            placeholder="Descricao do usuario"
            onChange={(e) => setBio(e.target.value)}
            value={bio}
          ></textarea>
        </label>
        {/* Usando select dentro do form */}
        <label>
          <span>Funcao no sistema</span>
          <select
            name="role"
            onChange={(e) => setRole(e.target.value)}
            value={role}
          >
            <option value="user">Usuario</option>
            <option value="editor">Editor</option>
            <option value="admin">Adm</option>
          </select>
        </label>
        <input type="submit" value="Enviar" />
      </form>
    </div>
  );
};

export default MyForm;
