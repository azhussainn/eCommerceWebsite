import React, {useState, useEffect} from 'react'
import Product from '../components/Product'
import { Row, Col } from 'react-bootstrap'
import axios from 'axios'


function HomeScreen() {
    //setting the state product and setProduct to update it
    const [products, setProducts] = useState([])

    //using this we will get the data
    //useEffect gets called every-time automatically
    useEffect(()=>{

        async function fetchProducts(){
            // getting data of all products from the backend using axios
            const {data} = await axios.get('/api/products/')

            //adding data in the products list
            setProducts(data)
        }
        fetchProducts()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div>
            <h1>Latest Products</h1>
            <Row>
                {products.map(product => (
                    <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                        <Product product={product}/>
                    </Col>
                ))}
            </Row>
        </div>
    )
}

export default HomeScreen
