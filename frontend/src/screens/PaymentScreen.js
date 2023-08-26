import React, { useState, useEffect } from "react";
import { Col, Form, Row, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../actions/userActions";
import FormContainer from "../components/FormContainer";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { savePaymentMethod } from "../actions/cartActions";
import CheckoutSteps from "../components/CheckoutSteps";

function PaymentScreen() {
  const Navigate = useNavigate()
  const dispatch = useDispatch()
  const cart = useSelector(state => state.cart)
  const {shippingAddress} = cart
  const [paymentMethod, setPaymentMethod] = useState('PayPal')
  if(!shippingAddress.address){
    Navigate('/shipping')
  }
  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(savePaymentMethod(paymentMethod))
    Navigate('/placeorder')

  }
  return (
    <FormContainer>
      <CheckoutSteps step1 step2 step3/>
      <Form onSubmit={submitHandler}>
      <Form.Group>
          <Form.Label as="legend">Select Method</Form.Label>
          <Col>
            <Form.Check
            type='radio'
            label='PayPal or Credit Card'
            id='paypal'
            name='paymentMethod'
            checked
            onChange={(e)=> setPaymentMethod(e.target.value)}>
            
              
            </Form.Check>
          </Col>
        </Form.Group>
        <Button type="submit" variant="primary">Continue</Button>
      </Form>
    </FormContainer>
  )
}

export default PaymentScreen