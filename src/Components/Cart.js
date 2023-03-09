import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import axios from "axios";

const Cart = (props) => {
  const [cartElements, setCartElements] = useState([]);

  useEffect(() => {
    setCartElements(props.toCartjs);
  }, [props.toCartjs]);

  // const handleRemoveProduct = (id) => {
  //     const updatedCartElements = cartElements.filter((element) => element.id !== id);
  //     setCartElements(updatedCartElements);
  //   };

  const handleRemoveProduct = (id) => {
    // Delete product from Firebase database
    const emailStoredInLocalStorage = localStorage.getItem("email");
    const userEmail = emailStoredInLocalStorage
      ? emailStoredInLocalStorage.replace(/[^\w\s]/gi, "")
      : "";
    axios
      .delete(
        `https://ecommerce-cart-d0343-default-rtdb.firebaseio.com/${userEmail}/myArray/${id}.json`
      )
      .then((response) => {
        console.log(`Product with ID ${id} deleted from Firebase database.`);
        console.log(response);
      })
      .catch((error) => {
        console.log(
          `Error deleting product with ID ${id} from Firebase database: ${error}`
        );
      });

    // Remove product from cartElements state
    const updatedCartElements = cartElements.filter(
      (element) => element.id !== id
    );
    setCartElements(updatedCartElements);
  };

  return (
    <Container>
      <h2 className="mb-4">Cart</h2>

      {cartElements.map((product) => (
        <Row key={product.id} className="mb-3 align-items-center">
          <Col xs={4} md={6}>
            <Card style={{ border: "none" }}>
              <Card.Img
                variant="top"
                src={product.imageUrl}
                style={{ maxHeight: "150px", maxWidth: "150px" }}
              />
              <Card.Body>
                <Card.Title>{product.title}</Card.Title>
                <Card.Text>Price: ${product.price}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col xs={4} md={4}>
            <p className="mb-0">Quantity: {product.quantity}</p>
          </Col>
          <Col xs={4} md={2}>
            {/* <Button
              variant="danger"
              onClick={() => handleRemoveProduct(product.id)}
            >
              Remove
            </Button> */}
          </Col>
          <hr className="mt-5" />
        </Row>
      ))}
    </Container>
  );
};

export default Cart;
