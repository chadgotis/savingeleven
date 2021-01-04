import axios from "axios";
import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import FormContainer from "../components/FormContainer";
import { getProductDetails, updateProduct } from "../actions/productActions";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import { Link } from "react-router-dom";
import Message from "../components/Message";
import { PRODUCT_UPDATE_RESET } from "../constants/productConstants";

const ProductEditPage = ({ match, history }) => {
  const dispatch = useDispatch();

  const productId = match.params.id;

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [countInStock, setCountInStock] = useState(0);
  const [description, setDescription] = useState("");
  const [uploading, setUploading] = useState(false);

  const productEdit = useSelector((state) => state.product);
  const { loading, error, product } = productEdit;

  const productUpdate = useSelector((state) => state.productUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = productUpdate;

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: PRODUCT_UPDATE_RESET });
      history.push("/admin/productlist");
    } else {
      if (!product || product._id !== productId) {
        dispatch(getProductDetails(productId));
      } else {
        setName(product.name);
        setPrice(product.price);
        setImage(product.image);
        setBrand(product.brand);
        setCategory(product.category);
        setCountInStock(product.countInStock);
        setDescription(product.description);
      }
    }
  }, [dispatch, productId, product, history, successUpdate]);

  const submitHandler = (e) => {
    e.preventDefault();
    const updatedProduct = {
      name,
      price,
      description,
      countInStock,
      brand,
      category,
      image,
    };
    dispatch(updateProduct(productId, updatedProduct));
  };

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("image", file);
    setUploading(true);

    try {
      const config = {
        "Content-Type": "multipart/form-data",
      };

      const { data } = await axios.post("/api/upload", formData, config);
      setImage(data);
      setUploading(false);
    } catch (error) {
      console.error(error);
      setUploading(false);
    }
  };

  return (
    <>
      <Link to="/admin/productlist">
        <Button>Go Back</Button>
      </Link>
      <h2 className="text-center">Edit Product</h2>
      <FormContainer>
        {loadingUpdate && <Loader />}
        {errorUpdate && <Message variant="danger">{errorUpdate}</Message>}
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <Form>
            <Form.Group>
              <Form.Label>Product Name</Form.Label>
              <Form.Control
                value={name}
                type="text"
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter Fullname*"
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Price</Form.Label>
              <Form.Control
                value={price}
                type="number"
                onChange={(e) => setPrice(e.target.value)}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Image</Form.Label>
              <Form.Control value={image} type="text" readOnly />
              <Form.File
                id="image-file"
                custom
                label="Choose Image"
                onChange={uploadFileHandler}
              ></Form.File>
            </Form.Group>

            {uploading && <Loader />}

            <Form.Group>
              <Form.Label>Brand</Form.Label>
              <Form.Control
                value={brand}
                type="text"
                onChange={(e) => setBrand(e.target.value)}
                placeholder="*"
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Category</Form.Label>
              <Form.Control
                value={category}
                type="text"
                onChange={(e) => setCategory(e.target.value)}
                placeholder="*"
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Count In Stock</Form.Label>
              <Form.Control
                value={countInStock}
                type="number"
                onChange={(e) => setCountInStock(e.target.value)}
                placeholder="*"
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Description</Form.Label>
              <Form.Control
                value={description}
                type="text"
                onChange={(e) => setDescription(e.target.value)}
                placeholder="*"
              />
            </Form.Group>

            {/* <Form.Group>
              <Form.Check
                label="Is Admin"
                checked={isAdmin}
                type="checkbox"
                onChange={(e) => setIsAdmin(e.target.checked)}
                placeholder="Enter Email*"
              />
            </Form.Group> */}
            <Button
              type="submit"
              className="mt-3"
              onClick={submitHandler}
              block
            >
              Update Product
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  );
};

export default ProductEditPage;
