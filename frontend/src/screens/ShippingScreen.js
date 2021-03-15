import React, {useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Form, Button} from 'react-bootstrap'
import FormContainer from '../components/FormContainer'
import CheckoutSteps from '../components/CheckoutSteps'
import { saveShippingAddress } from '../actions/cartActions'

function ShippingScreen({history}) {

    //getting cart from state
    const cart = useSelector(state => state.cart)

    //getting shipping Address from cart
    const {shippingAddress} = cart

    const dispatch = useDispatch()

    //if state contains shipping data already then just load it in the form
    const [address, setAddress] = useState(shippingAddress.address)
    const [city, setCity] = useState(shippingAddress.city)
    const [postalCode, setPostalCode] = useState(shippingAddress.postalCode)
    const [country, setCountry] = useState(shippingAddress.country)

    const submitHandler = (e) => {
        e.preventDefault();

        //dispatching data to actions to set it in state
        dispatch(saveShippingAddress({address, city, postalCode, country}))
        history.push('/payment')
    }

    return (
        <FormContainer>

            <CheckoutSteps step1 step2/>

            <h1>Shipping</h1>
            <Form onSubmit={submitHandler}>

                <Form.Group controlId='address'>
                    <Form.Label>
                        Address
                    </Form.Label>
                    <Form.Control 
                        type='text'
                        placeholder='Enter Address'
                        value={address ? address : ""}
                        autoComplete="on"
                        required
                        onChange={
                            (e) => setAddress(e.target.value)}>
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId='city'>
                    <Form.Label>
                        City
                    </Form.Label>
                    <Form.Control
                        type='text'
                        placeholder='Enter City'
                        value={city ? city : ""}
                        autoComplete="on"
                        required
                        onChange={
                            (e) => setCity(e.target.value)}>
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId='postalCode'>
                    <Form.Label>
                        Postal Code
                    </Form.Label>
                    <Form.Control
                        type='text'
                        placeholder='Enter Postal Code'
                        value={postalCode ? postalCode : ""}
                        autoComplete="on"
                        required
                        onChange={
                            (e) => setPostalCode(e.target.value)}>
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId='country'>
                    <Form.Label>
                        Country
                    </Form.Label>
                    <Form.Control
                        type='text'
                        placeholder='Enter Country'
                        value={country ? country : ""}
                        autoComplete="on"
                        required
                        onChange={
                            (e) => setCountry(e.target.value)}>
                    </Form.Control>
                </Form.Group>

                <Button
                    type='submit'
                    variant='primary'>
                        Continue
                </Button>

            </Form>
        </FormContainer>
    )
}

export default ShippingScreen
