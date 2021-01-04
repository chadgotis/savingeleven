import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col, Table } from "react-bootstrap";
import { getUserDetails, userUpdateProfile } from "../actions/userActions";
import { LinkContainer } from "react-router-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { myOrdersList } from "../actions/orderActions";

const ProfilePage = ({ location, history }) => {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState(null);

  const userDetails = useSelector((state) => state.userDetails);
  const userLogin = useSelector((state) => state.userLogin);
  const ordersList = useSelector((state) => state.ordersList);

  const { loading, error, user } = userDetails;
  const { userInfo } = userLogin;
  const { loading: loadingOrders, error: errorOrders, orders } = ordersList;

  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    } else {
      if (!user) {
        dispatch(getUserDetails("profile"));
        dispatch(myOrdersList());
      } else {
        setName(user.name);
        setEmail(user.email);
      }
    }
  }, [history, userInfo, user, dispatch]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage("Password does'nt match");
    } else {
      dispatch(userUpdateProfile({ id: user._id, name, email, password }));
      setPassword("");
      setConfirmPassword("");
    }
  };

  return (
    <Row className="mt-3">
      <Col md={3}>
        {message && <Message variant="danger">{message}</Message>}
        {error && <Message variant="danger">{error}</Message>}
        {loading ? (
          <Loader />
        ) : (
          <Form>
            <h2>Profile Info</h2>

            <Form.Group>
              <Form.Label>Fullname</Form.Label>
              <Form.Control
                value={name}
                type="text"
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter Fullname*"
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                value={email}
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter Email*"
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Password</Form.Label>
              <Form.Control
                value={password}
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter Password*"
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                value={confirmPassword}
                type="password"
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm Password*"
              />
            </Form.Group>

            <Button
              type="submit"
              className="mt-3"
              onClick={submitHandler}
              block
            >
              Update Profile
            </Button>
          </Form>
        )}
      </Col>
      <Col md={9}>
        <h2>My Orders</h2>
        {loadingOrders ? (
          <Loader />
        ) : errorOrders ? (
          <Message>{errorOrders}</Message>
        ) : (
          <Table hover striped bordered responsive className="table-sm">
            <thead>
              <tr>
                <th>ID</th>
                <th>Date</th>
                <th>Total</th>
                <th>Paid</th>
                <th>Delivered</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id}>
                  <td>{order._id}</td>
                  <td>{order.createdAt.substring(0, 10)}</td>
                  <td>₱{order.totalPrice.toFixed(2)}</td>
                  <td>
                    {order.isPaid ? order.paidAt.substring(0, 10) : "Not Paid"}
                  </td>
                  <td>
                    {order.isDelivered
                      ? order.deliveredAt.substring(0, 10)
                      : "Not Delivered"}
                  </td>
                  <td className="text-center">
                    <LinkContainer to={`/order/${order._id}`}>
                      <Button className="btn-sm">Details</Button>
                    </LinkContainer>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Col>
    </Row>
  );
};

export default ProfilePage;
