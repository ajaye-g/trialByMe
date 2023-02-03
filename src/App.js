import './App.css';
import{ BrowserRouter, Routes, Route, Navigate} from "react-router-dom";
import NavBar from './components/NavBar';
import Home from './components/Home';
import Cart from './components/Cart';
import NotFound from './components/NotFound';

function App() {
  //switch router allow us to load which rout at a time
  return (
    <div className="App">
      <BrowserRouter>
        <NavBar/>
        <Routes>  
          <Route exact path='/cart' element ={<Cart/>}/>
          <Route exact path='/notFound' element ={<NotFound/>}/>
          <Route exact path='/' element = {<Home/>} />  
          <Route path ="*" element ={<Navigate to ="/notFound"></Navigate>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
