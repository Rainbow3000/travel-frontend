import './App.css';
import Home from './pages/home/Home';
import {Routes, Route} from 'react-router-dom'
import Footer from './components/footer/Footer';
import Header from './components/header/Header';
import Details from './pages/details/Details';
import Order from './pages/order/Order';
import message from './images/messenger.png'
import Register from './pages/register/Register';
import CategoryDetails from './pages/categorydetails/CategoryDetails';
import { useSelector } from 'react-redux';

function App() {
const {user} = useSelector(state=>state.user); 

  return (
    <div className="App">
        <div className="app-container">
        <Header/>
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/category/details/:id' element ={<CategoryDetails/>} />
          <Route path='/register' element={<Register/>} />
          <Route path='/travel/details/:id' element={<Details/>} />
          <Route path= '/travel/details/:id/order' element= {<Order/>} />
        </Routes>
        <Footer/>
        </div>
      <div className='message'>
         <div className='pop-up-mess'>
            <span>Liên hệ với chúng tôi !</span>
         </div>
        <img className='message-icon' src={message} alt="" />
      </div>
    </div>
  );
}

export default App;
