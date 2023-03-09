import React from "react";
import { Container } from "react-bootstrap";
import { useParams } from "react-router-dom";

const productsArr = [
  {
    id: 1,
    title: "Colors",
    price: 100,
    imageUrl: "https://prasadyash2411.github.io/ecom-website/img/Album%201.png",
    quantity: 1,
  },
  {
    id: 2,
    title: "Black and white Colors",
    price: 50,
    imageUrl: "https://prasadyash2411.github.io/ecom-website/img/Album%202.png",
    quantity: 1,
  },
  {
    id: 3,
    title: "Yellow and Black Colors",
    price: 70,
    imageUrl: "https://prasadyash2411.github.io/ecom-website/img/Album%203.png",
    quantity: 1,
  },
  {
    id: 4,
    title: "Blue Color",
    price: 100,
    imageUrl: "https://prasadyash2411.github.io/ecom-website/img/Album%204.png",
    quantity: 1,
  },
];

const ProductDetail = () => {
  const params = useParams();
  const product = productsArr.find((p) => p.id === Number(params.id));

  return (
    <Container style={{ marginTop: "30px", textAlign: "center" }}>
      <h1 style={{ fontSize: "28px", fontWeight: "bold" }}>Product Details</h1>
      {product ? (
        <div style={{ marginTop: "20px" }}>
          <h2 style={{ fontSize: "24px", marginBottom: "10px" }}>
            {product.title}
          </h2>
          <img
            src={product.imageUrl}
            alt={product.title}
            style={{ maxWidth: "100%", marginBottom: "20px" }}
          />
          <p style={{ fontSize: "20px", fontWeight: "bold" }}>
            Price: ${product.price}
          </p>
        </div>
      ) : (
        <p style={{ fontSize: "20px", color: "red" }}>Product not found.</p>
      )}
    </Container>
  );
};

export default ProductDetail;
