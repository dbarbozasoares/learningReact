const CarDetails = ({ brand, km, color, newC }) => {
  return (
    <div>
      <h2>Detalhes do carro</h2>
      <ul>
        <li>Marca: {brand}</li>
        <li>KM: {km}</li>
        <li>Cor: {color}</li>
        {newC === true ? <p>Carro novo</p> : <p>Carro usado</p>}
      </ul>
    </div>
  );
};

export default CarDetails;
