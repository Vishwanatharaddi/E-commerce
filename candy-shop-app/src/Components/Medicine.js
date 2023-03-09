import React, { useRef } from "react";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";

const Medicine = () => {
  const nameRef = useRef();
  const priceRef = useRef();
  const quantityRef = useRef();
  const [medicines, setMedicines] = useState([]);

  const [cartData, setCartData] = useState([]);
  const [showPopup, setShowPopup] = useState(false);

  const fetchCartData = () => {
    axios
      .get("https://candy-6479f-default-rtdb.firebaseio.com/cart.json")
      .then((response) => {
        console.log(response.data);
        if (cartData) {
          setCartData(response.data);
        }
        setShowPopup(true);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const name = nameRef.current.value;
    const price = priceRef.current.value;
    const quantity = quantityRef.current.value;
    console.log(name, price, quantity);
    const info = {
      name,
      price,
      quantity,
    };
    axios
      .post(
        "https://candy-6479f-default-rtdb.firebaseio.com/medecines.json",
        info
      )
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
    nameRef.current.value = "";
    priceRef.current.value = "";
    quantityRef.current.value = "";
  };

  useEffect(() => {
    axios
      .get("https://candy-6479f-default-rtdb.firebaseio.com/medecines.json")
      .then((response) => {
        // console.log(response.data);
        if (response) {
          setMedicines(response.data);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, [handleSubmit]);

  const addToCart = (abc, key, quantityy) => {
    console.log(abc);
    //    const[name,price,quantity] = abc;
    console.log(abc.name);
    console.log(abc.price);
    console.log(abc.quantity);

    axios
      .post("https://candy-6479f-default-rtdb.firebaseio.com/cart.json", {
        name: abc.name,
        price: abc.price,
      })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
    updateQuantity(key, quantityy);
  };

  const updateQuantity = (key, quantityy) => {
    axios
      .patch(
        `https://candy-6479f-default-rtdb.firebaseio.com/medecines/${key}.json`,
        {
          quantity: quantityy - 1,
        }
      )
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          maxWidth: "400px",
        }}
      >
        <label style={{ display: "flex", flexDirection: "column" }}>
          Name of medicine:
          <input
            type="text"
            ref={nameRef}
            style={{ padding: "5px", fontSize: "16px" }}
          />
        </label>
        <label style={{ display: "flex", flexDirection: "column" }}>
          Price:
          <input
            type="text"
            ref={priceRef}
            style={{ padding: "5px", fontSize: "16px" }}
          />
        </label>
        <label style={{ display: "flex", flexDirection: "column" }}>
          Quantity:
          <input
            type="text"
            ref={quantityRef}
            style={{ padding: "5px", fontSize: "16px" }}
          />
        </label>
        <button
          type="submit"
          style={{
            backgroundColor: "#4CAF50",
            color: "white",
            padding: "10px 20px",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Submit
        </button>
      </form>

      <ul>
        {medicines &&
          Object.keys(medicines).map((key) => (
            <li key={medicines[key].id}>
              <div>Name: {medicines[key].name}</div>
              <div>Price: {medicines[key].price}</div>
              <div>Quantity: {medicines[key].quantity}</div>
              <button
                onClick={() =>
                  addToCart(medicines[key], key, medicines[key].quantity)
                }
              >
                {" "}
                Add to cart
              </button>
              <hr />
            </li>
          ))}
      </ul>

      <button
        style={{ position: "fixed", top: "0", right: "0" }}
        onClick={fetchCartData}
      >
        View Cart
      </button>

      {showPopup && (
        <div style={{ position: "fixed", top: "15px", right: "10px" }}>
          {Object.keys(cartData).map((key) => (
            <div key={key}>
              <div>Name: {cartData[key].name}</div>
              <div>Price: {cartData[key].price}</div>
              <hr />
            </div>
          ))}
          <button onClick={() => setShowPopup(false)}>Close</button>
        </div>
      )}
    </>
  );
};

export default Medicine;
