import { useEffect, useState } from "react";
import "./ItemList.css";
import { FaPlus, FaMinus } from "react-icons/fa";
import { useAtom } from "jotai";
import { priceAtom } from "../../atom/priceAtom";

const ItemsList = ({ item }) => {
  const [items, setItems] = useState([]);
  const [price, setPrice] = useAtom(priceAtom);

  useEffect(() => {
    if (item) {
      setItems((prevItems) => {
        const index = prevItems.findIndex((i) => i.name === item.name);

        // found and exists
        if (index > -1) {
          const updatedItems = [...prevItems];
          updatedItems[index] = {
            ...updatedItems[index],
            qty: updatedItems[index].qty + item.qty,
          };
          return updatedItems;
        } else {
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
    }
    // matches everything after $
    const match = updatedItems[index].name.match(/\$(\d+(\.\d+)?)/);
    if (match) {
      const newPrice = parseFloat(match[1]);
      // use newPrice here
      console.log(newPrice);
      setPrice((prev) => prev - newPrice);
    }

    setItems(updatedItems.filter((i) => i.qty > 0));
  };
  return (
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
  );
};

export default ItemsList;
