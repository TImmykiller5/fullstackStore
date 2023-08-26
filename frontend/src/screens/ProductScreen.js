import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import Loader from "../components/Loader";
import Message from "../components/Message";
import {
  Row,
  Col,
  Image,
  Button,
  Card,
  ListGroup,
  ListGroupItem,
  Form,
} from "react-bootstrap";
import Rating from "../components/Rating";
import { listProductsDetails, reviewProduct } from "../actions/productActions";
import { useSelector, useDispatch } from "react-redux";
import { PRODUCTS_CREATE_REVIEW_RESET } from "../constants/productConstants";

function ProductScreen() {
  const Navigate = useNavigate();
  const params = useParams();
  const dispatch = useDispatch();

  const productDetails = useSelector((state) => state.productDetails);
  const { product, error, loading } = productDetails;

  const productReviewCreate = useSelector((state) => state.productReviewCreate);
  const {
    success: reviewSuccess,
    error: reviewError,
    loading: reviewLoading,
  } = productReviewCreate;

  const userLogin = useSelector((state) => state.userLogin);
  const { user } = userLogin;

  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  useEffect(() => {
    if(reviewSuccess){
      setRating(0)
      setComment('')
      dispatch({type:PRODUCTS_CREATE_REVIEW_RESET})
    }
    dispatch(listProductsDetails(params.id));
  }, [dispatch, params.id, reviewSuccess]);

  const addTCartHandler = () => {
    Navigate(`/cart/${params.id}?qty=${qty}`);
  };

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(reviewProduct(
      params.id,{
      rating,
      comment
      }
    ))
  }

  return (
    <div className="ps">
      <Link to="/" className="btn btn-light my-3">
        Go Back
      </Link>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <div>
          <Row >
            <Col md={6}>
              <Image src={product.image} alt={product.name} fluid />
            </Col>
            <Col md={3}>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h3>{product.name}</h3>
                </ListGroup.Item>

                <ListGroup.Item>
                  <Rating
                    value={product.rating}
                    text={`${product.numReviews} review`}
                    color={"#f8e825"}
                  />
                </ListGroup.Item>

                <ListGroup.Item>Price: ${product.price}</ListGroup.Item>

                <ListGroup.Item>
                  Description: {product.description}
                </ListGroup.Item>
              </ListGroup>
            </Col>
            <Col md={3}>
              <Card>
                <ListGroup variant="flush">
                  <ListGroupItem>
                    <Row>
                      <Col>Price:</Col>
                      <Col>
                        <strong>${product.price}</strong>
                      </Col>
                    </Row>
                  </ListGroupItem>

                  <ListGroupItem>
                    <Row>
                      <Col>Status:</Col>
                      <Col>
                        {product.countInStock > 0 ? "In Stock" : "Out Of Stock"}
                      </Col>
                    </Row>
                  </ListGroupItem>

                  {product.countInStock > 0 && (
                    <ListGroupItem>
                      <Row>
                        <Col>Qty</Col>
                        <Col xs="auto" className="my-1">
                          <Form.Control
                            as="select"
                            value={qty}
                            onChange={(e) => setQty(e.target.value)}
                          >
                            {[...Array(product.countInStock).keys()].map(
                              (x) => (
                                <option value={x + 1} key={x + 1}>
                                  {x + 1}
                                </option>
                              )
                            )}
                          </Form.Control>
                        </Col>
                      </Row>
                    </ListGroupItem>
                  )}

                  <ListGroupItem>
                    <Button
                      onClick={addTCartHandler}
                      className="btn btn-primary btn-block w-100"
                      type="button"
                      disabled={product.countInStock <= 0}
                    >
                      Add to cart
                    </Button>
                  </ListGroupItem>
                </ListGroup>
              </Card>
            </Col>
          </Row>
          <Row className="my-3">
            <Col md={6}>
              <h4>Reviews</h4>
              {product.reviews.length === 0 && <Message variant={'info'}>No reviews</Message>}

              <ListGroup variant="flush">
                {product.reviews.map(review => (
                  <ListGroup.Item key={review._id}>
                    <strong>{review.name}</strong>
                    <Rating value={review.rating} color={'#f8e825'}/>
                    <p>{review.createdAt.substring(0,10)}</p>
                    <p>{review.comment}</p>
                  </ListGroup.Item>
                ))}
                <ListGroup.Item>
                  <h4>WRITE A REVIEW</h4>
                  {reviewLoading && <Loader/>}
                  {reviewSuccess && <Message variant={'success'}>Review Submitted</Message>}
                  {reviewError && <Message variant={'danger'}>{reviewError}</Message>}
                  {user ? (
                    <Form onSubmit={submitHandler}>
                      <Form.Group controlId="rating">
                        <Form.Label>Rating</Form.Label>
                        <Form.Control
                        as={'select'}
                        value={rating}
                        onChange={e => setRating(e.target.value)}>
                          <option value=''>Select...</option>
                          <option value='1'>1 - Poor</option>
                          <option value='2'>2 - Fair</option>
                          <option value='3'>3 - Good</option>
                          <option value='4'>4 - Very Good</option>
                          <option value='5'>5 - Excellent</option>
                        </Form.Control>
                      </Form.Group>
                      <Form.Group controlId="Comment">
                        <Form.Label>Review</Form.Label>
                        <Form.Control
                        as='textarea'
                        row='5'
                        value={comment}
                        onChange={e => setComment(e.target.value)}
                        >
                        </Form.Control>
                      </Form.Group>
                      <Button
                        className="mt-3"
                        disabled={reviewLoading}
                        type="submit"
                        variant="primary"                      
                      >
                        Submit
                      </Button>
                    </Form>
                  ):
                  <Message variant={'info'}>Please <Link to='/login'>Login</Link> to write a review</Message>}
                </ListGroup.Item>
              </ListGroup>
            </Col>
          </Row>
        </div>
      )}
    </div>
  );
}

export default ProductScreen;
