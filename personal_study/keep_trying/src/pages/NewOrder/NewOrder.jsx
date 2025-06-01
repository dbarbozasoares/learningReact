import "./NewOrder.css";
import TotalItems from "../../components/TotalItems/TotalItems";
import ItemsList from "../../components/ItemsList/ItemsList";
import { useState } from "react";
import { priceAtom } from "../../atom/priceAtom";
import { useAtom } from "jotai";

const NewOrder = () => {
  const [price, setPrice] = useAtom(priceAtom);
  const [item, setItem] = useState("");

  const addIntoTotal = (amountStr) => {
    const amount = parseFloat(amountStr.replace("$", ""));
    setPrice((prev) => prev + amount);
    console.log(price);
  };

  const addItem = (singleItem) => {
    const itemObj = { name: singleItem, qty: 1 };
    setItem(itemObj);
  };
  return (
    <div>
      <table>
        <tbody>
          <tr className="table-row">
            <td id="cloth-name">T-SHIRT</td>
            <td
              onClick={(e) => {
                addIntoTotal(e.target.textContent);
                addItem(`T-SHIRT ${e.target.textContent}`);
              }}
              id="cloth-price"
            >
              $5
            </td>
            <td
              onClick={(e) => {
                addIntoTotal(e.target.textContent);
                addItem(`T-SHIRT ${e.target.textContent}`);
              }}
              id="cloth-price"
            >
              $6
            </td>
            <td
              onClick={(e) => {
                addIntoTotal(e.target.textContent);
                addItem(`T-SHIRT ${e.target.textContent}`);
              }}
              id="cloth-price"
            >
              $7
            </td>
          </tr>
          <tr className="table-row">
            <td id="cloth-name">JACKET</td>
            <td
              onClick={(e) => {
                addIntoTotal(e.target.textContent);
                addItem(`JACKET ${e.target.textContent}`);
              }}
              id="cloth-price"
            >
              $7
            </td>
            <td
              onClick={(e) => {
                addIntoTotal(e.target.textContent);
                addItem(`JACKET ${e.target.textContent}`);
              }}
              id="cloth-price"
            >
              $8
            </td>
            <td
              onClick={(e) => {
                addIntoTotal(e.target.textContent);
                addItem(`JACKET ${e.target.textContent}`);
              }}
              id="cloth-price"
            >
              $9
            </td>
          </tr>
          <tr className="table-row">
            <td
              onClick={(e) => addIntoTotal(e.target.textContent)}
              id="cloth-name"
            >
              PANTS
            </td>
            <td
              onClick={(e) => {
                addIntoTotal(e.target.textContent);
                addItem(`PANTS ${e.target.textContent}`);
              }}
              id="cloth-price"
            >
              $5
            </td>
            <td
              onClick={(e) => {
                addIntoTotal(e.target.textContent);
                addItem(`PANTS ${e.target.textContent}`);
              }}
              id="cloth-price"
            >
              $6
            </td>
            <td
              onClick={(e) => {
                addIntoTotal(e.target.textContent);
                addItem(`PANTS ${e.target.textContent}`);
              }}
              id="cloth-price"
            >
              $7
            </td>
          </tr>
        </tbody>
      </table>

      <ItemsList item={item} />
      <TotalItems addPrice={price} />

      <button type="submit">SEND ORDER</button>
    </div>
  );
};

export default NewOrder;
