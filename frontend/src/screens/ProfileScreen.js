import React, {useState, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Form, Button, Row, Col, Table} from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { getUserDetails, updateUserProfile } from '../actions/userActions'
import { USER_UPDATE_PROFILE_RESET } from '../constants/userConstants'
import { listMyOrders } from '../actions/orderActions'
function ProfileScreen({history}) {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState('')

    const dispatch = useDispatch()

    //getting user Details
    const userDetails = useSelector(state => state.userDetails)
    const {error, loading, user} = userDetails

    //making sure user is logged in
    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin

    //getting success from reducer in order to clear state
    const userUpdateProfile = useSelector(state => state.userUpdateProfile)
    const {success} = userUpdateProfile

    //getting orderList from reducer
    const orderListMy = useSelector(state => state.orderListMy)
    const {
        loading : loadingOrders,
        error : errorOrders,
        orders} = orderListMy

    //if already logged in the redirect to redirect page
    useEffect(() => {
        if(!userInfo){
            history.push('/login')
        }else{

            //checking if user info is not already present
            // on success i.e updating the profile => reset state
            //also reset profile state if id of current user does not match the id of the logged in user
            if(!user || !user.name || success || userInfo._id !== user._id){

                //removing previous info of user from the state
                dispatch(
                    {type : USER_UPDATE_PROFILE_RESET}
                    )

                //getting user info
                dispatch(getUserDetails('profile'))

                //getting user orders
                dispatch(listMyOrders())
            }else{

                //if user info already available->set it in state
                setName(user.name)
                setEmail(user.email)
            }
        }
    }, [dispatch, history, userInfo, user, success])

    const submitHandler = (e) => {
        e.preventDefault()
        if(password !== confirmPassword){
            setMessage("Passwords do not match")
        }else{
            dispatch(updateUserProfile(
                {
                'id' : user._id,
                'name' : name,
                'email' : email,
                'password' : password
            }))
            setMessage("")
        }
    }

    return (
        <Row>
            <Col md={3}>
                <h2>User Profile</h2>
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
                            onChange={
                                (e) => setConfirmPassword(
                                    e.target.value)}>
                        </Form.Control>
                    </Form.Group>

                    <Button
                        type='submit'
                        variant='primary'>
                            Update
                    </Button>
                </Form>
            </Col>

            <Col md={9}>
                <h2>
                    My orders
                </h2>
                {loadingOrders ? (<Loader /> )
                    : errorOrders ? (
                    <Message variant='danger'>
                        {errorOrders}
                    </Message>
                ) : (
                    <Table striped responsive className="table-sm">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>DATE</th>
                            <th>TOTAL</th>
                            <th>PAID</th>
                            <th>DELIVERED</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map(order => (
                            <tr key={order._id}>
                                <td>{order._id}</td>
                                <td>{order.createdAt.substring(0, 10)}</td>
                                <td>${order.totalPrice}</td>
                                <td>{order.isPaid ? order.paidAt.substring(0, 10) : (
                                    <i className="fas fa-times" style = {{color:"red"}}></i>
                                )}</td>
                                <td>
                                    <LinkContainer to={`/order/${order._id}`}>
                                        <Button className="btn-sm">
                                            Details
                                        </Button>
                                    </LinkContainer>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                    </Table>
                )}
            </Col>
        </Row>
    )
}

export default ProfileScreen
