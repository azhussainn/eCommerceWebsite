import React, {useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Product from '../components/Product'
import Loader from '../components/Loader'
import Message from '../components/Message'
import Paginate from '../components/Paginate'
import { Row, Col } from 'react-bootstrap'
import { listProducts } from '../actions/productActions'



function HomeScreen({history}) {
    const dispatch = useDispatch()

    //using selector we get select the productList
    const productList = useSelector(state => state.productList)

    const {error, loading, products, page, pages} = productList

    let keyword = history.location.search

    //using this we will get the data
    //useEffect gets called every-time automatically
    useEffect(()=>{

        //calling listProducts
        dispatch(listProducts(keyword))

    }, [dispatch, keyword])

    return (
        <div>
            <h1>Latest Products</h1>

            {loading ? <Loader />
                : error ? <Message variant='danger'> {error} </Message>
                :
                <div>
                    <Row>
                        {products.map(product => (
                            <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                                <Product product={product}/>
                            </Col>
                            ))}
                    </Row>
                    <Paginate pages={pages} page={page} keyword={keyword}/>
                </div>}
        </div>
    )
}

export default HomeScreen
