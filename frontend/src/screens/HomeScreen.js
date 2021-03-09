import React, {useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Product from '../components/Product'
import { Row, Col } from 'react-bootstrap'
import { listProducts } from '../actions/productActions'



function HomeScreen() {
    const dispatch = useDispatch()

    //using selection we get select the productList
    const productList = useSelector(state => state.productList)

    const {error, loading, products} = productList

    //using this we will get the data
    //useEffect gets called every-time automatically
    useEffect(()=>{

        //calling listProducts
        dispatch(listProducts())

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div>
            <h1>Latest Products</h1>

            {loading ? <h2>Loading...</h2>
                : error ? <h3>{error}</h3>
                :
                <Row>
                    {products.map(product => (
                        <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                            <Product product={product}/>
                        </Col>
                        ))}
                </Row>}
        </div>
    )
}

export default HomeScreen
