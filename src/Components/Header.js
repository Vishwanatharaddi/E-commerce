import React, { useState, useEffect, useContext } from "react";
import { Container, Nav, Navbar, Modal, Button } from "react-bootstrap";
import Cart from "./Cart";
import { Link, NavLink } from "react-router-dom";
import AuthContext from "./auth-context";
import axios from "axios";

const Header = (props) => {
  const [showCart, setShowCart] = useState(false);

  const authCtx = useContext(AuthContext);
  const emailStoredInLocalStorage = localStorage.getItem("email");
  const userEmail = emailStoredInLocalStorage
    ? emailStoredInLocalStorage.replace(/[^\w\s]/gi, "")
    : "";

  console.log(`user email from header ${userEmail}`);
  const handleCartClick = () => {
    setShowCart(true);
  };

  const handleCartClose = () => {
    setShowCart(false);
  };

  const [updatedcartItems, setUpdatedCartItems] = useState([]);

  // useEffect(() => {
  //   setUpdatedCartItems(props.cartItems);

  // }, [props.cartItems]);

  useEffect(() => {
    console.log(authCtx.isLoggedIn);
    try {
      axios
        .get(
          `https://ecommerce-cart-d0343-default-rtdb.firebaseio.com/${userEmail}.json`
        )
        .then((response) => {
          // console.log(`received data ${JSON.stringify(response)}`);
          setUpdatedCartItems(response.data.myArray);
          console.log(response.data.myArray);
        })
        .catch((error) => {
          console.log("Error retrieving data: ", error);
        });
    } catch (error) {
      console.log("Error retrieving data: ", error);
    }
  }, []);

  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home">Ecommerce App</Navbar.Brand>
          <Nav className="mx-auto">
            <Nav.Link>
              <NavLink activeClassName="active" className="nav-link" to="/home">
                Home
              </NavLink>
            </Nav.Link>
            {
              <Nav.Link>
                <NavLink
                  activeClassName="active"
                  className="nav-link"
                  to="/store"
                >
                  Store
                </NavLink>
              </Nav.Link>
            }
            <Nav.Link>
              <NavLink
                activeClassName="active"
                className="nav-link"
                to="/about"
              >
                About
              </NavLink>
            </Nav.Link>
            <Nav.Link>
              <NavLink
                activeClassName="active"
                className="nav-link"
                to="/contact"
              >
                Contact us
              </NavLink>
            </Nav.Link>
            {!authCtx.isLoggedIn && (
              <Nav.Link>
                <NavLink
                  activeClassName="active"
                  className="nav-link"
                  to="/login"
                >
                  Login
                </NavLink>
              </Nav.Link>
            )}
            {authCtx.isLoggedIn && (
              <Nav.Link>
                <NavLink
                  activeClassName="active"
                  className="nav-link"
                  to="/home"
                  onClick={authCtx.logout}
                >
                  Logout
                </NavLink>
              </Nav.Link>
            )}
          </Nav>
          {authCtx.isLoggedIn && (
            <button
              className="text-muted"
              style={{
                border: "2px solid skyblue",
                padding: "5px",
                borderRadius: "5px",
              }}
              onClick={handleCartClick}
            >
              Cart{" "}
              <span className="text-primary">
                <sup>{updatedcartItems.length}</sup>
              </span>
            </button>
          )}
        </Container>
      </Navbar>
      <Modal show={showCart} onHide={handleCartClose}>
        <Modal.Header closeButton>
          <Modal.Title>Cart</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Cart toCartjs={updatedcartItems} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCartClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Header;
