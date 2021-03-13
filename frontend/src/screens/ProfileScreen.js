import React, {useState, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Form, Button, Row, Col } from 'react-bootstrap'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { getUserDetails, updateUserProfile } from '../actions/userActions'
import { USER_UPDATE_PROFILE_RESET } from '../constants/userConstants'

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

    //if already logged in the redirect to redirect page
    useEffect(() => {
        if(!userInfo){
            history.push('/login')
        }else{

            //checking if user info is not already present
            // on success i.e updating the profile => reset state
            if(!user || !user.name || success){

                //removing previous info of user from the state
                dispatch(
                    {type : USER_UPDATE_PROFILE_RESET}
                    )

                //getting user info
                dispatch(getUserDetails('profile'))
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
            </Col>
        </Row>
    )
}

export default ProfileScreen
