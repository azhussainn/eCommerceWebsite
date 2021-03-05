import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import { Row, Col, Image, ListGroup, Button, Card } from 'react-bootstrap'
import Rating from '../components/Rating'
import axios from 'axios'

function ProductScreen({match}) {

    //setting the state product and setProduct to update it
    const [product, setProduct] = useState([])

    //using this we will get the data
    //useEffect gets called every-time automatically
    useEffect(()=>{

        async function fetchProducts(){
            // getting data of a product from the backend using id
            const {data} = await axios.get(`/api/products/${match.params.id}`)

            //adding data in the product list
            setProduct(data)
        }
        fetchProducts()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div>
            <Link to="/" className="btn btn-light my-3">Go Back</Link>
            <Row>
                <Col md={6}>
                    <Image src={product.image} alt={product.name} fluid />
                </Col>
                <Col md={3}>
                    <ListGroup variant="flush">
                        <ListGroup.Item>
                            <h3>{product.name}</h3>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <Rating value={product.rating} text={`${product.numReviews} reviews`} color={'#f8e825'} />
                        </ListGroup.Item>

                        <ListGroup.Item>
                            Price : ${product.price}
                        </ListGroup.Item>

                        <ListGroup.Item>
                            Description : {product.description}
                        </ListGroup.Item>

                    </ListGroup>
                </Col>
                <Col md={3}>
                    <Card>
                        <ListGroup variant="flush">
                            <ListGroup.Item>
                                <Row>
                                    <Col>Price:</Col>
                                    <Col>
                                        <strong>${product.price}</strong>
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                        </ListGroup>

                        <ListGroup.Item>
                                <Row>
                                    <Col>Status:</Col>
                                    <Col>
                                        {product.countInStock > 0 ? "In Stock" : "Out of Stock"}
                                    </Col>
                                </Row>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <Button className="btn-block" type='button' disabled={product.countInStock === 0}>
                                Add to Cart
                            </Button>
                        </ListGroup.Item>

                    </Card>
                </Col>
            </Row>
        </div>
    )
}

export default ProductScreen
