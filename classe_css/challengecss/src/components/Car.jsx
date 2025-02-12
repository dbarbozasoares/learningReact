import styles from "./Car.module.css";

const Car = () => {
  const carros = [
    {
      brand: "FERRARI",
      model: "947 GT",
      color: "RED",
      link: "https://images.barrons.com/im-54002859?width=1280&size=1.33333333",
    },
    {
      brand: "BMW",
      model: "M3 COMP",
      color: "WHITE",
      link: "https://imageio.forbes.com/specials-images/imageserve/6047ab33af1072e64e4e2817/M3-Competition-has-a-503-horsepower-version-of-the-same-straight-six/960x0.jpg?format=jpg&width=960",
    },
    {
      brand: "MERCEDES",
      model: "GT 63",
      color: "BLUE",
      link: "https://cdn.motor1.com/images/mgl/OOAWL/s1/mercedes-amg-gle-63-s-coupe.jpg",
    },
  ];
  return (
    <div className={styles.car_details}>
      {carros.map((car) => (
        <div className={styles.car_item}>
          <h2>{car.brand}</h2>
          <p>{car.model}</p>
          <p>{car.color}</p>
          <img src={car.link} alt={car.brand} />
        </div>
      ))}
    </div>
  );
};

export default Car;
