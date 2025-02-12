import "./App.css";
import Car from "./assets/car.jpg";
import ManageData from "./components/ManageData";
import ListRender from "./components/ListRender";
import CondtionalRender from "./components/ConditionalRender";
import ShowUserName from "./components/ShowUserName";
import { useState } from "react";
import CarDetails from "./components/CarDetails";
import Fragment from "./components/Fragment";
import Container from "./components/Container";

function App() {
  //const name = "Diegao";
  const [username] = useState("Joaquim");
  const cars = [
    { id: 1, brand: "Ferrari", color: "Amarela", newC: true, km: 0 },
    { id: 2, brand: "Kia", color: "Azul", km: 90000 },
    { id: 3, brand: "Fiat", color: "Branco", newC: true, km: 10 },
  ];
  return (
    <>
      <title>Secao 3</title>
      <div className="App">
        <h1>Iniciando segunda sessao</h1>
        <div>
          <img src="/lambo.jpg" width={350} height={350} />
        </div>

        <div>
          <img src={Car} alt="Carrao" width={350} height={350} />
        </div>

        <ManageData></ManageData>
        <ListRender />
        <CondtionalRender />
        {/* Props */}
        <ShowUserName name={username} />
        {/* Destructing */}
        <CarDetails brand="VW" km={100000} color="Azul" />
        {/* Reaproveitando */}
        <CarDetails brand="Toyota" km={30000} color="vermelho" newC={true} />
        <CarDetails brand="Ford" km={100000} color="Branco" />

        {cars.map((car) => (
          <CarDetails
            brand={car.brand}
            km={car.km}
            color={car.color}
            newC={car.newC}
            key={car.id}
          />
        ))}
        {/*Fragment section */}
        <Fragment propFragment="test" />
        {/*Children component */}
        <Container>
          <p>Dentro do container paragraph</p>
        </Container>
      </div>
    </>
  );
}

export default App;
