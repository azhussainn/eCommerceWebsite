import React, {useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Form, Button, Col} from 'react-bootstrap'
import FormContainer from '../components/FormContainer'
import CheckoutSteps from '../components/CheckoutSteps'
import { savePaymentMethod } from '../actions/cartActions'

function PaymentScreen({history}) {

        //getting cart from state
        const cart = useSelector(state => state.cart)

        const {shippingAddress} = cart

        const dispatch = useDispatch()

        const [paymentMethod, setPaymentMethod] = useState('PayPal')

        //if no shipping address redirect to shipping
        if(!shippingAddress.address){
            history.push('/shipping')
        }

        const submitHandler = (e) =>{
            e.preventDefault();

            //dispatching selected payment method to actions
            dispatch(savePaymentMethod(paymentMethod))

            history.push('/placeorder')
        }


    return (
        <FormContainer>
            <CheckoutSteps step1 step2 step3/>

            <Form onSubmit={submitHandler}>

                <Form.Group as='legend'>
                    <Form.Label>
                        Select Method
                    </Form.Label>
                    <Col>
                        <Form.Check
                        type='radio'
                        label='PayPal or Credit Card'
                        id='paypal'
                        name='paymentMethod'
                        checked
                        onChange={(e) => setPaymentMethod(
                            e.target.value)} >

                        </Form.Check>
                    </Col>
                </Form.Group>

                <Button type='submit' variant='primary'>
                    Continue
                </Button>

            </Form>

        </FormContainer>
    )
}

export default PaymentScreen
