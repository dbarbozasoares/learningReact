import { useEffect, useState } from "react";
import "./ItemList.css";
import { FaPlus, FaMinus } from "react-icons/fa";
import { useAtom } from "jotai";
import { priceAtom } from "../../atom/priceAtom";
import clearStorage from "../../hooks/clearStorage";

const ItemsList = ({ item }) => {
  const [items, setItems] = useState([]);
  const [price, setPrice] = useAtom(priceAtom);
  const [showPopUp, setShowPopUp] = useState(true);
  const clearData = clearStorage;

  const reloadData = () => {
    const restoredData = [];
    for (let i = 0; i < localStorage.length; i++) {
      if (localStorage.key(i) !== "TOTAL") {
        const name = localStorage.key(i);
        const qty = parseInt(localStorage.getItem(name), 10);
        restoredData.push({ name, qty });
      }
    }
    const restoredPrice = parseInt(localStorage.getItem("TOTAL"), 10);
    setPrice(restoredPrice);
    setItems(restoredData);
  };

  const handleYes = () => {
    reloadData();
    setShowPopUp(false);
  };

  const handleNo = () => {
    clearData();
    setItems([]);
    setPrice(0);
    setShowPopUp(false);
  };

  useEffect(() => {
    setPrice(0);
  }, []);

  useEffect(() => {
    if (item) {
      localStorage.setItem("TOTAL", price);
      setItems((prevItems) => {
        const index = prevItems.findIndex((i) => i.name === item.name);

        // found and exists
        if (index > -1) {
          const updatedItems = [...prevItems];
          updatedItems[index] = {
            ...updatedItems[index],
            qty: updatedItems[index].qty + item.qty,
          };
          localStorage.setItem(
            updatedItems[index].name,
            updatedItems[index].qty
          );
          return updatedItems;
        } else {
          localStorage.setItem(item.name, item.qty);
          return [...prevItems, item];
        }
      });
    }
  }, [item]);

  const decreaseQty = (item) => {
    const updatedItems = [...items];
    const index = items.findIndex((i) => i.name === item.name);
    if (index > -1 && updatedItems[index].qty > 0) {
      updatedItems[index] = {
        ...updatedItems[index],
        qty: updatedItems[index].qty - 1,
      };
      if (updatedItems[index].qty > 0)
        localStorage.setItem(item.name, updatedItems[index].qty);
      else localStorage.removeItem(updatedItems[index].name);
    }
    // matches everything after $
    const match = updatedItems[index].name.match(/\$(\d+(\.\d+)?)/);
    if (match) {
      const newPrice = parseFloat(match[1]);
      // use newPrice here
      console.log(newPrice);
      localStorage.setItem("TOTAL", newPrice);
      setPrice((prev) => prev - newPrice);
    }

    setItems(updatedItems.filter((i) => i.qty > 0));
  };
  return (
    <>
      {showPopUp && (
        <div className="popup-overlay">
          <div className="popup-box">
            <p>Would you like to retrieve last session?</p>
            <button onClick={handleYes}>YES</button>
            <button onClick={handleNo}>NO</button>
          </div>
        </div>
      )}
      <div id="single-item-box">
        {items &&
          items.map((j, i) => {
            return (
              <div key={i} className="single-item-list">
                <span>
                  {j.name} x{j.qty}{" "}
                </span>
                <button onClick={() => decreaseQty(j)} id="decrease-qty">
                  <FaMinus />
                </button>
              </div>
            );
          })}
      </div>
    </>
  );
};

export default ItemsList;
