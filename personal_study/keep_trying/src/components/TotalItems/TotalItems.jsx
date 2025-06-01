import "./TotalItems.css";
import { useState, useEffect } from "react";
const TotalItems = ({ addPrice }) => {
  const [price, setPrice] = useState(0);

  useEffect(() => {
    setPrice(addPrice);
    console.log("Setting new price");
  }, [addPrice]);

  return <div className="total-amount">Total Amount = {price}</div>;
};

export default TotalItems;
