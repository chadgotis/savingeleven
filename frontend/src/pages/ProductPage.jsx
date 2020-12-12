import React, { useEffect, useState } from "react";
import {
  Row,
  Col,
  Image,
  Card,
  ListGroup,
  Button,
  Form,
} from "react-bootstrap";
import Rating from "../components/Rating";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getProductDetails } from "../actions/productActions";
import Loader from "../components/Loader";

const ProductPage = ({ history, match }) => {
  const [quantity, setQuantity] = useState(1);

  const dispatch = useDispatch();
  const productDetails = useSelector((state) => state.product);
  const { product, loading } = productDetails;

  useEffect(() => {
    dispatch(getProductDetails(match.params.id));
  }, [dispatch, match]);

  const addToCardHandler = () => {
    history.push(`/cart/${match.params.id}?quantity=${quantity}`);
  };

  return (
    <>
      <Link to="/" className="btn btn-light my-3">
        Go Back
      </Link>
      {loading ? (
        <Loader />
      ) : (
        <Row>
          <Col md={6}>
            <Image src={product.image} fluid alt={product.name} />
          </Col>
          <Col md={3}>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2>{product.name}</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Rating
                  value={product.rating}
                  text={`${product.numReviews} Reviews`}
                />
              </ListGroup.Item>
              <ListGroup.Item className="text-justify">
                <strong>Description:</strong>
                <br /> {product.description}
              </ListGroup.Item>
            </ListGroup>
          </Col>
          <Col md={3}>
            <Card>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <Row>
                    <Col>Price :</Col>
                    <Col>
                      <strong>${product.price}</strong>
                    </Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Status :</Col>
                    <Col>
                      <strong>
                        {product.countInStock > 0 ? "In stock" : "Out stock"}
                      </strong>
                    </Col>
                  </Row>
                </ListGroup.Item>
                {product.countInStock > 0 && (
                  <ListGroup.Item>
                    <Row>
                      <Col>Qty:</Col>
                      <Col>
                        <Form.Control
                          as="select"
                          value={quantity}
                          onChange={(e) => setQuantity(e.target.value)}
                        >
                          {[...Array(product.countInStock).keys()].map((x) => (
                            <option key={x + 1} value={x + 1}>
                              {x + 1}
                            </option>
                          ))}
                        </Form.Control>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                )}
                <ListGroup.Item>
                  <Button
                    onClick={addToCardHandler}
                    disabled={product.countInStock === 0}
                    className="btn-block"
                  >
                    Add to Cart
                  </Button>
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </Col>
        </Row>
      )}
    </>
  );
};

export default ProductPage;
