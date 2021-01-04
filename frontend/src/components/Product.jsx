import React from "react";
import { Card } from "react-bootstrap";
import Rating from "./Rating";
import { LinkContainer } from "react-router-bootstrap";

const Product = ({ product }) => {
  return (
    <>
      <Card className="my-2 p-3 rounded">
        <LinkContainer
          to={`/product/${product._id}`}
          style={{ cursor: "pointer" }}
        >
          <Card.Img variant="top" src={product.image} className="mb-2" />
        </LinkContainer>
        <Card.Body className="p-title p-0">
          <LinkContainer
            to={`/product/${product._id}`}
            style={{ cursor: "pointer" }}
          >
            <Card.Title as="div">
              <strong className="secondary">{product.name}</strong>
            </Card.Title>
          </LinkContainer>
        </Card.Body>
        <Card.Text as="div">
          <div className="my-3">
            <Rating
              value={product.rating}
              text={`${product.numReviews} reviews`}
            />
          </div>
        </Card.Text>
        <Card.Text as="h3">₱{product.price.toFixed(2)}</Card.Text>
      </Card>
    </>
  );
};

export default Product;
