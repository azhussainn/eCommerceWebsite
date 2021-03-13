import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Form, Button, Row, Col } from 'react-bootstrap'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { register } from '../actions/userActions'
import FormContainer from '../components/FormContainer'


function RegisterScreen({location, history}) {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState('')

    const dispatch = useDispatch()

    //if redirect exists get it, else set it to home
    const redirect = location.search ?
            location.search.split('=')[1]
            : '/'

    const userRegister = useSelector(state => state.userRegister)

    const {error, loading, userInfo} = userRegister

    //if already logged in the redirect to redirect page
    useEffect(() => {
        if(userInfo){
            history.push(redirect)
        }
    }, [history, userInfo, redirect])

    const submitHandler = (e) => {
        e.preventDefault()
        if(password !== confirmPassword){
            setMessage("Passwords do not match")
        }else{
            //dispatching email and password to userAction
            dispatch(register(name, email, password))
        }
    }

    return (
        <FormContainer>
            <h1>Register</h1>
            {
            message &&
                <Message variant='danger'>
                    {message}
                </Message>
            }
            {error &&
                <Message variant='danger'>
                    {error}
                </Message>}
            {loading && <Loader/>}
            <Form onSubmit={submitHandler}>

            <Form.Group controlId='name'>
                    <Form.Label>
                        Name
                    </Form.Label>
                    <Form.Control 
                        type='name'
                        placeholder='Enter Name'
                        value={name}
                        autoComplete="on"
                        required
                        onChange={
                            (e) => setName(e.target.value)}>
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId='email'>
                    <Form.Label>
                        Email Address
                    </Form.Label>
                    <Form.Control
                        type='email'
                        placeholder='Enter Email'
                        value={email}
                        autoComplete="on"
                        required
                        onChange={
                            (e) => setEmail(e.target.value)}>
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId='password'>
                    <Form.Label>
                        Password
                    </Form.Label>
                    <Form.Control
                        type='password'
                        placeholder='Enter Password'
                        value={password}
                        autoComplete="on"
                        required
                        onChange={
                            (e) => setPassword(
                                e.target.value)}>
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId='passwordConfirm'>
                    <Form.Label>
                        Confirm Password
                    </Form.Label>
                    <Form.Control
                        type='password'
                        placeholder='Confirm Password'
                        value={confirmPassword}
                        autoComplete="on"
                        required
                        onChange={
                            (e) => setConfirmPassword(
                                e.target.value)}>
                    </Form.Control>
                </Form.Group>

                <Button
                    type='submit'
                    variant='primary'>
                        Register
                </Button>

            </Form>

            <Row className='py-3'>
                <Col>
                    Have an Account ?
                    <Link to={redirect ?
                        `/login?redirect=${redirect}`
                        : '/login'}>
                        Sign In
                    </Link>
                </Col>
            </Row>

        </FormContainer>
    )
}

export default RegisterScreen
