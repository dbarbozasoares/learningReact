import { useState } from "react";

const ListRender = () => {
  const [list] = useState(["Diego", "Glenda", "Joao"]);

  const [users, setUsers] = useState([
    { id: 1, name: "Diego B Soares" },
    { id: 2, name: "Mario Nunes" },
    { id: 3, name: "Antonela Nunes" },
  ]);
  const deleteRandom = () => {
    const randomNumber = Math.floor(Math.random() * 4);
    console.log({ randomNumber });
    setUsers((prevUsers) => {
      return prevUsers.filter((user) => randomNumber !== user.id);
    });
  };

  return (
    <div>
      <ul>
        {list.map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ul>
      <div>
        <ul>
          {users.map((user) => (
            <li key={user.id}>
              {user.name} - {user.id}
            </li>
          ))}
        </ul>
      </div>
      <button onClick={deleteRandom}>Delete random</button>
    </div>
  );
};

export default ListRender;
