import React, {  useEffect } from "react";
import { useLocation } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import { Table, Button, Row, Col } from "react-bootstrap";
import Loader from "../components/Loader";
import Message from "../components/Message";
import Paginate from "../components/Paginate";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { PRODUCTS_CREATE_RESET } from "../constants/productConstants";
import { listProducts, productDelete, createProduct } from "../actions/productActions";


function ProductListScreen() {
  const {search} = useLocation()
  let keyword = search

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const productList = useSelector((state) => state.productList);
  const { loading, error, products, pages, page } = productList;

  const ProductDelete = useSelector((state) => state.productDelete);
  const { loading:loadingDelete, error:errorDelete, success:successDelete } = ProductDelete;

  const ProductCreate = useSelector((state) => state.productCreate);
  const { loading:loadingCreate, error:errorCreate, success:successCreate, product:createdProduct } = ProductCreate;

  const userO = useSelector((state) => state.userLogin);
  const user = userO.user;

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure you want to delete this Product?")) {
      dispatch(productDelete(id))
    }
  };

  const createProducthandler = () => {
    dispatch(createProduct())
  };

  useEffect(() => {
    dispatch({type:PRODUCTS_CREATE_RESET})
    if (user && !user.isAdmin) {
        navigate("/login");

    }
    if(successCreate){
        navigate(`/admin/product/${createdProduct._id}/edit`)
    }else{
        dispatch(listProducts(keyword))
    }
  }, [dispatch, navigate, user, userO, successDelete, successCreate, createdProduct, keyword]);

  return (
    <div>
    <div>
      <Row className="align-items-center">
        <Col>
          <h1>Product</h1>
        </Col>
        <Col className="text-end">
            <Button className="my-3" onClick={createProducthandler}>
              <i className="fas fa-plus"></i>{' '}Create Products
            </Button>
        </Col>
      </Row>
      {loadingDelete && <Loader/>}
      {errorDelete && <Message variant={'danger'}>{errorDelete}</Message>}
      {loadingCreate && <Loader/>}
      {errorCreate && <Message variant={'danger'}>{errorCreate}</Message>}
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant={"danger"}>{error}</Message>
      ) : (
        <Table striped bordered hover responsive className="table-sm">
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>PRICE</th>
              <th>CATEGORY</th>
              <th>BRAND</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {products?.map((product) => (
              <tr key={product._id}>
                <td>{product._id}</td>
                <td>{product.name}</td>
                <td>${product.price}</td>
                <td>{product.category}</td>
                <td>{product.brand}</td>

                <td>
                  <LinkContainer to={`/admin/product/${product._id}/edit`}>
                    <Button variant="light" className="btn-sm">
                      <i className="fas fa-edit"></i>
                    </Button>
                  </LinkContainer>
                  <Button
                    onClick={() => deleteHandler(product._id)}
                    variant="danger"
                    className="btn-sm"
                  >
                    <i className="fas fa-trash"></i>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </div>
    <Paginate pages={pages} page={page} isAdmin={true}/>
    </div>
  );
}

export default ProductListScreen;
