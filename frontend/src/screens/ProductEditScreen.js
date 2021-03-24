import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Form, Button} from 'react-bootstrap'
import Loader from '../components/Loader'
import Message from '../components/Message'
import {listProductDetails } from '../actions/productActions'
import FormContainer from '../components/FormContainer'


function ProductEditScreen({match, history}) {

    const productId = match.params.id

    const [name, setName] = useState('')
    const [price, setPrice] = useState(0)
    const [image, setImage] = useState('')
    const [brand, setBrand] = useState('')
    const [category, setCategory] = useState('')
    const [countInStock, setCountInStock] = useState(0)
    const [description, setDescription] = useState('')

    const dispatch = useDispatch()

    const productDetails = useSelector(state => state.productDetails)
    const {error, loading, product} = productDetails

    useEffect(() => {

        //if product not present
        if(!product.name || product._id !== Number(productId)){
            //get the product details
            dispatch(listProductDetails(productId))
        }else{
            setName(product.name)
            setPrice(product.price)
            setImage(product.image)
            setBrand(product.brand)
            setCategory(product.category)
            setCountInStock(product.countInStock)
            setDescription(product.description)
        }
    }, [product, productId, dispatch, history])

    const submitHandler = (e) => {
        e.preventDefault()
        //update Product
    }

    return (
        <div>
            <Link to='/admin/productlist'>
                Go Back
            </Link>
            <FormContainer>
                <h1>Edit Product</h1>

                {loading ? <Loader /> :
                    error ?
                        <Message variant='danger'>
                            {error}
                        </Message> : (
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
                                        onChange={
                                            (e) => setName(e.target.value)}>
                                    </Form.Control>
                                </Form.Group>

                                <Form.Group controlId='price'>
                                    <Form.Label>
                                        Price
                                    </Form.Label>
                                    <Form.Control
                                        type='number'
                                        placeholder='Enter Price'
                                        value={price}
                                        autoComplete="on"
                                        onChange={
                                            (e) => setPrice(e.target.value)}>
                                    </Form.Control>
                                </Form.Group>

                                <Form.Group controlId='image'>
                                    <Form.Label>
                                        Image
                                    </Form.Label>
                                    <Form.Control
                                        type='text'
                                        placeholder='Enter Image'
                                        value={image}
                                        autoComplete="on"
                                        onChange={
                                            (e) => setImage(e.target.value)}>
                                    </Form.Control>
                                </Form.Group>

                                <Form.Group controlId='brand'>
                                    <Form.Label>
                                        Brand
                                    </Form.Label>
                                    <Form.Control
                                        type='text'
                                        placeholder='Enter Brand'
                                        value={brand}
                                        autoComplete="on"
                                        onChange={
                                            (e) => setBrand(e.target.value)}>
                                    </Form.Control>
                                </Form.Group>

                                <Form.Group controlId='countInStock'>
                                    <Form.Label>
                                        Stock
                                    </Form.Label>
                                    <Form.Control
                                        type='number'
                                        placeholder='Enter Stock'
                                        value={countInStock}
                                        autoComplete="on"
                                        onChange={
                                            (e) => setCountInStock(e.target.value)}>
                                    </Form.Control>
                                </Form.Group>

                                <Form.Group controlId='category'>
                                    <Form.Label>
                                        Category
                                    </Form.Label>
                                    <Form.Control
                                        type='text'
                                        placeholder='Enter Category'
                                        value={category}
                                        autoComplete="on"
                                        onChange={
                                            (e) => setCategory(e.target.value)}>
                                    </Form.Control>
                                </Form.Group>

                                <Form.Group controlId='description'>
                                    <Form.Label>
                                        Description
                                    </Form.Label>
                                    <Form.Control
                                        type='text'
                                        placeholder='Enter Description'
                                        value={description}
                                        autoComplete="on"
                                        onChange={
                                            (e) => setDescription(e.target.value)}>
                                    </Form.Control>
                                </Form.Group>

                                <Button
                                    type='submit'
                                    variant='primary'>
                                        Update
                                </Button>
                            </Form>
                        )}
            </FormContainer>
        </div>
    )
}

export default ProductEditScreen
