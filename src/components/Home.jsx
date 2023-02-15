
import { useEffect } from "react";
import { useSelector,useDispatch } from "react-redux";
import { productsFetch } from "../features/productSlice";
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { addToCart } from "../features/cartSlice";
import {useNavigate} from 'react-router-dom';

const Home = () => {
   
    const {items,status} = useSelector(state => state.products)
    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(productsFetch());
    },[]);
    // console.log(items)

    const navigate= useNavigate();

    const handleAddToCart = (data) =>{
        dispatch(addToCart(data))
        navigate("/cart"); 
    }
    return <div className="homeContainer">
        <div className="products">
            {items.map( (data) => ( 
            <div key={data.id} className='d-inline-flex'>
            <Card  className='cardWidth m-3 p-3 ' >
              <Card.Img className='img'  variant="top" src={data.image} />
              <Card.Body>
                <Card.Title><b>{data.title}</b></Card.Title>
                <Card.Text><b>$ {data.price}</b></Card.Text>
                <Card.Text ><b className="dataCategory">{data.category}</b></Card.Text>
                <Card.Text><span className='button1 m-2 p-1' ><b>{data.rating.rate}</b>
                <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" fill="currentColor" class="bi bi-star-fill" viewBox="0 0 16 16">
                <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
                </svg>
                </span>
                </Card.Text>
                <Button onClick={()=>handleAddToCart(data)}>Add to Cart</Button>
              </Card.Body>
            </Card>
            </div>
          ))}
        </div>
    </div>
}
 
export default Home;