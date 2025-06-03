import "./TotalItems.css";
import { useState, useEffect } from "react";
const TotalItems = ({ addPrice }) => {
  const [price, setPrice] = useState(0);
  useEffect(() => {
    if (addPrice !== price) {
      setPrice(addPrice);
    }
    console.log("Setting new price");
  }, [addPrice]);

  useEffect(() => {
    sessionStorage.setItem("price", price);
  }, [price]);

  return <div className="total-amount">Total Amount = {price}</div>;
};

export default TotalItems;
