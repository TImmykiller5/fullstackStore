import React, {useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { Carousel, Image } from 'react-bootstrap'
import Loader from './Loader'
import Message from './Message'
import { topProducts } from '../actions/productActions'

function ProductCarousel() {
    const dispatch = useDispatch()

    const topProduct = useSelector(state => state.topProduct)
    const {product, error, loading} = topProduct

    useEffect( ( )=>{
        dispatch(topProducts())
    }, [dispatch])
  return ( loading ? <Loader/>
  : error 
  ? <Message>{error}</Message>
  : <Carousel pause='hover' className='bg-dark'>
    {
        product?.map(product => (
            <Carousel.Item className='' key={product._id}>
                <Link to={`/product/${product._id}`}>
                    <Image src={product.image} alt={product.name} fluid/>
                    <Carousel.Caption className='carousel-caption'>
                        <h4>{product.name} (${product.price})</h4>
                    </Carousel.Caption>
                </Link>
            </Carousel.Item>
        ))
    }
  </Carousel>
   
  )
}

export default ProductCarousel