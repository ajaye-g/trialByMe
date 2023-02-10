
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
                <Card.Title>{data.title}</Card.Title>
                <Card.Text>$ {data.price}</Card.Text>
                <Card.Text >{data.category}</Card.Text>
                <Card.Text><span className='button1 m-2 p-1' >{data.rating.rate}</span></Card.Text>
                <Button onClick={()=>handleAddToCart(data)}>Add to Cart</Button>
                {/* <Button variant="primary">Add to Cart</Button> */}
              </Card.Body>
            </Card>
            </div>
          ))}
        </div>
    </div>
}
 
export default Home;