import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import FormContainer from "../components/FormContainer";
import { saveShippingAddress } from "../actions/cartActions";
import CheckoutSteps from "../components/CheckoutSteps";

const ShippingPage = ({ history }) => {
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);

  const { shippingAddress } = cart;

  const [address, setAddress] = useState(shippingAddress.address);
  const [city, setCity] = useState(shippingAddress.city);
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode);
  const [country, setCountry] = useState(shippingAddress.country);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(saveShippingAddress({ address, city, postalCode, country }));
    history.push("/payment");
  };

  return (
    <>
      <FormContainer>
        <CheckoutSteps step1 step2 />
        <Form onSubmit={submitHandler} className="justify-content-center mb-3">
          <h1 className="text-center">Shipping</h1>
          <Form.Group>
            <Form.Label>Address</Form.Label>
            <Form.Control
              value={address}
              type="text"
              required
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Enter Address*"
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>City</Form.Label>
            <Form.Control
              value={city}
              type="text"
              required
              onChange={(e) => setCity(e.target.value)}
              placeholder="Enter City*"
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Postal</Form.Label>
            <Form.Control
              value={postalCode}
              type="text"
              required
              onChange={(e) => setPostalCode(e.target.value)}
              placeholder="Enter Postal Code*"
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Country</Form.Label>
            <Form.Control
              value={country}
              type="text"
              required
              onChange={(e) => setCountry(e.target.value)}
              placeholder="Enter Country*"
            />
          </Form.Group>
          <Button type="submit" block>
            Continue
          </Button>
        </Form>
      </FormContainer>
    </>
  );
};

export default ShippingPage;
