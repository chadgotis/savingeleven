import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import { addToCartItem, removeCartItem } from "../actions/cartActions";
import {
  ListGroup,
  Image,
  Row,
  Col,
  Form,
  Button,
  Card,
} from "react-bootstrap";
import { Link } from "react-router-dom";

const CartPage = ({ match, location, history }) => {
  const dispatch = useDispatch();

  const productID = match.params.id;

  const quantity = location.search ? location.search.split("=")[1] : 1;

  const cart = useSelector((state) => state.cart);

  const { cartItems } = cart;

  useEffect(() => {
    if (productID) {
      dispatch(addToCartItem(productID, quantity));
    }
  }, [dispatch, productID, quantity]);

  const removeCartHandler = (id) => {
    dispatch(removeCartItem(id));
  };
  const checkoutHandler = () => {
    history.push("/login?redirect=shipping");
  };

  return (
    <>
      <Row className="mt-3">
        <Col md={8}>
          {cartItems.length === 0 ? (
            <Message>Empty Cart</Message>
          ) : (
            <ListGroup variant="flush">
              {cartItems.map((item) => (
                <ListGroup.Item key={item.product}>
                  <Row>
                    <Col md={2}>
                      <Image src={item.image} alt={item.name} rounded fluid />
                    </Col>
                    <Col md={3}>
                      <Link
                        to={`/product/${item.product}`}
                        className="text-decoration-none"
                      >
                        <h5>{item.name}</h5>
                      </Link>
                    </Col>
                    <Col md={2}>PHP {item.price}</Col>
                    <Col md={2}>
                      <Form.Control
                        as="select"
                        value={item.quantity}
                        onChange={(e) =>
                          dispatch(
                            addToCartItem(item.product, Number(e.target.value))
                          )
                        }
                      >
                        {[...Array(item.countInStock).keys()].map((x) => (
                          <option key={x + 1} value={x + 1}>
                            {x + 1}
                          </option>
                        ))}
                      </Form.Control>
                    </Col>
                    <Col md={2}>
                      <Button
                        type="button"
                        variant="light"
                        onClick={() => removeCartHandler(item.product)}
                      ></Button>
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h3>
                  Subtotal (
                  {cartItems.reduce(
                    (acc, item) => acc + Number(item.quantity),
                    0
                  )}
                  ) items
                </h3>
                PHP
                {cartItems
                  .reduce((acc, item) => acc + item.quantity * item.price, 0)
                  .toFixed(2)}
              </ListGroup.Item>
              <ListGroup.Item>
                <Button
                  className="btn btn-block"
                  disabled={cartItems.length === 0}
                  onClick={checkoutHandler}
                >
                  Proceed To Checkout
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default CartPage;
