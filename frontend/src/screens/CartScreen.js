import React, {useEffect} from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, ListGroup, Form, Image, Button, Card } from 'react-bootstrap'
import Message from '../components/Message'
import { addToCart, removeFromCart } from '../actions/cartActions'
import { useParams, useSearchParams, useNavigate } from 'react-router-dom'

function CartScreen({location}) {
  const params = useParams()
  const [searchParams] = useSearchParams()
  const productId = params.id
  const qty = searchParams.get('qty')
  const dispatch = useDispatch()
  const Navigate = useNavigate()

  const cart = useSelector(state => state.cart)
  const {cartItems} = cart
  
  

  useEffect(()=>{
    if(productId){
      dispatch(addToCart(productId, qty))
    }
  }, [dispatch,productId, qty])

  const removeFromCartHandler = (id) =>{
    dispatch(removeFromCart(id))

  }
  const checkOutHandler= () =>{
    Navigate('/shipping')
  }

  return (
    
    <Row>
      <Col md={8}>
        <h1>Shopping Cart</h1>
        
        {cartItems.length === 0 ? (
          <Message variant='info'>
            Your cart is empty <Link to='/'>Go back</Link>
          </Message>
          ):(
            <ListGroup variant='flush'>
              {cartItems.map(item => (
              <ListGroup.Item key={item.product}>
                <Row>
                <Col md={2}>
                  <Image src={item.image} alt={item.name} fluid rounded/>
                </Col>
                <Col md={3}>
                  <Link to={`product/${item.product}/`}>{item.name}</Link>
                </Col>
                <Col md={2}>
                  ${item.price}
                </Col>
                <Col md={3}><Form.Control
                      as='select'
                      value={item.qty}
                      onChange={(e)=> dispatch(addToCart(item.product, Number(e.target.value)))}>
                      {
                        [...Array(item.countInStock).keys()].map(x => (
                          <option value={x+1} key={x+1}>{x+1}</option>
                        ))
                      }
                      </Form.Control></Col>
                      <Col md={1}>
                        <Button
                        type = 'button'
                        variant = 'light'
                        onClick={() => removeFromCartHandler(item.product)}
                        ><i className='fas fa-trash'></i></Button>
                      </Col>
                </Row>
              </ListGroup.Item>
            ))}
            </ListGroup>
            
          )
            
          }
        
      </Col>

      <Col md={4}>
        <Card>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h2>Subtotal {cartItems.reduce((acc,item) => acc+Number(item.qty), 0)} items</h2>
              <span>${cartItems.reduce((acc,item) => acc+Number(item.price*item.qty), 0).toFixed(2)} </span>
            </ListGroup.Item>
            <ListGroup.Item>
              <Button type='button' className='btn-block'
              disabled={cartItems.length === 0}
              onClick={checkOutHandler}> PROCEED TO CHECKOUT</Button>
            </ListGroup.Item>
          </ListGroup>
        </Card>
      </Col>
    </Row>
  )
}

export default CartScreen