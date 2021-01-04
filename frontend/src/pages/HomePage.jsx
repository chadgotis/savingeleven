import React, { useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import Product from "../components/Product";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../actions/productActions";

const HomePage = ({ match }) => {
  const keyword = match.params.keyword;

  const dispatch = useDispatch();
  const products = useSelector((state) => state.products);
  const { loading, errors, productList } = products;

  useEffect(() => {
    dispatch(getProducts(keyword));
  }, [dispatch, keyword]);

  return (
    <>
      <h3 className="mt-4">SavingEleven Products</h3>

      <Row>
        {loading ? (
          <Col>
            <Loader />
          </Col>
        ) : errors ? (
          <Col>
            <Message variant="danger">{errors}</Message>
          </Col>
        ) : (
          productList.map((product) => (
            <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
              <Product product={product} />
            </Col>
          ))
        )}
      </Row>
    </>
  );
};

export default HomePage;
