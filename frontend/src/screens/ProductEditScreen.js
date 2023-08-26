import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { getUserDetails, updateUser } from "../actions/userActions";
import { listProductsDetails, updateProduct } from "../actions/productActions";
import FormContainer from "../components/FormContainer";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useParams } from "react-router-dom";
import { PRODUCTS_UPDATE_RESET } from "../constants/productConstants";

function ProductEditScreen() {
  const params = useParams();
  const navigate = useNavigate();
  const productId = params.id;
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState('');
  const [brand, setBrand] = useState('');
  const [category, setCategory] = useState('');
  const [countInStock, setCountInStock] = useState(0);
  const [description, setDescription] = useState('');
  const [uploading, setUploading] = useState(false);

  const dispatch = useDispatch();

  const productDetails = useSelector((state) => state.productDetails);
  const { error, loading, product } = productDetails;

  const productUpdate = useSelector((state) => state.productUpdate);
  const { error:errorUpdate, loading:loadingUpdate, success:successUpdate } = productUpdate;

  

  useEffect(() => {

    if(successUpdate){
        dispatch({type:PRODUCTS_UPDATE_RESET})
        navigate(`/admin/productslist`)
    }else{
        if (!product.name || product._id !== Number(productId)) {
            dispatch(listProductsDetails(productId));
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
    
      
  }, [product, productId, dispatch, navigate, successUpdate]);
  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(updateProduct(
        {_id: productId,
        name,
        price,
        image,
        brand,
        category,
        countInStock,
        description}
    ))
  };

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0]
    const formData = new FormData()
    formData.append('image', file)
    formData.append('product_id', productId)
    setUploading(true)
    try {
        const config = {
            headers:{
                'Content-Type':'miltipart/form-data'
            }
        }
        const {data} = await axios.post('/api/products/upload/', formData, config)
        setImage(data)
        setUploading(false)
    } catch (error) {
        setUploading(false)
    }
  }

  return (
    <div>
      <Link to="/admin/productslist">Go Back</Link>
      <FormContainer>
        <h1>Edit Product</h1>
        {loadingUpdate && <Loader/>}
        {errorUpdate && <Message variant={'danger'}>{errorUpdate}</Message>}

        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant={"danger"}>{error}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="name" className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="name"
                placeholder="Enter Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="price" className="mb-3">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter Price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="image" className="mb-3">
              <Form.Label >Image</Form.Label>
              <Form.Control
              className="mb-3"
                type="text"
                placeholder="Enter Image"
                value={image}
                onChange={(e) => setImage(e.target.value)}
              ></Form.Control>

                <Form.Control
                type="file"
                // id='image-file'
                label = 'Choose File'
                custom
                onChange={uploadFileHandler}>

                </Form.Control>
                {uploading && <Loader/>}

            </Form.Group>

            <Form.Group controlId="brand" className="mb-3">
              <Form.Label>Brand</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Brand"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="countInStock" className="mb-3">
              <Form.Label>Stock</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter Stock"
                value={countInStock}
                onChange={(e) => setCountInStock(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="category" className="mb-3">
              <Form.Label>Category</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="Description" classDescription="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></Form.Control>
            </Form.Group>
            

            <Button type="submit" variant="primary">
              Update
            </Button>
          </Form>
        )}

        {loading && <Loader />}
      </FormContainer>
    </div>
  );
}

export default ProductEditScreen;
