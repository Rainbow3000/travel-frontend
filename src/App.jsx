import './App.scss';
import Home from './pages/home/Home';
import {Routes, Route} from 'react-router-dom'
import Footer from './components/footer/Footer';
import Header from './components/header/Header';
import Details from './pages/details/Details';
import Order from './pages/order/Order';
import message from './images/messenger.png'
import Register from './pages/register/Register';
import CategoryDetails from './pages/categorydetails/CategoryDetails';
import UserOrder from './pages/userOrder/UserOrder';
import {BiUser} from 'react-icons/bi'
import {FiLogOut} from 'react-icons/fi'
import { publicRequest } from './requestMethod';
import { ToastContainer, toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { setLoginErrorMessage } from './store/slice/errorSlice';
import { validateEmail } from './validate/validate';
import { useState } from 'react';
import { setUser, userLogout } from './store/slice/userSlice';
import {RiDeleteBack2Line} from 'react-icons/ri'
import { toggleMenuState } from './store/slice/menuSlice';
import Login from './pages/login/Login';
function App() {
  const location = useLocation(); 
  const [loginFormEnable, setLoginFormEnable] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [textSearch,setTextSearch] = useState(""); 

  const dispatch = useDispatch();

  const navigate =useNavigate(); 

  const { user } = useSelector((state) => state.user);
  const {enableMenu} = useSelector(state=>state.menu)
  const {loginErrorMessage} = useSelector(state=>state.error)

  const handleShowLoginForm = () => {
    setLoginFormEnable(!loginFormEnable);
  };

  const handleCloseLoginForm = () => {
    setLoginFormEnable(false);
  };

  const handleSubmitForm = async (e) => {
    e.preventDefault();
    try {
      if (email.trim() === "") {
        dispatch(setLoginErrorMessage("Email không được để trống !"));
        return;
      }

      if (validateEmail(email) === null) {
        dispatch(setLoginErrorMessage("Email không hợp lệ !"));
        return;
      }

      if (email.length < 8) {
        dispatch(setLoginErrorMessage("Mật khẩu phải lớn hơn 8 kí tự"));
        return;
      }

      const response = await publicRequest.post("/auth/login", {
        email,
        password,
      });

      if (response.data?.message === "SUCCESS") {
        dispatch(setUser(response.data?.data));
        handleCloseLoginForm();
        setEmail("");
        setPassword("");
        toast("Đăng nhập thành công !")
        navigate('/')
      } else {
        dispatch(setLoginErrorMessage(response.data?.errorMessage));
      }
    } catch (error) {
      dispatch(setLoginErrorMessage(error.errorMessage));
    }
  };

  const handleLogout = ()=>{
    dispatch(userLogout());
    dispatch(setUser(null));
    dispatch(toggleMenuState(false)); 
    toast("Đăng xuất thành công !")
    navigate("/"); 
  }


  const handleCloseMenu = ()=>{
    dispatch(toggleMenuState(false))
  }

  return (
    <div className='app-container'>
        <div className="sidebar" style={{transform:enableMenu === true && "translateX(0)"}}>
        <RiDeleteBack2Line onClick={handleCloseMenu} className='remove-manu-icon'/>
        <ul>
            <li>
              <Link className="link" to="">
                Giới thiệu
              </Link>
            </li>
            <li>
              <Link className="link" to="">
                Điều khoản
              </Link>
            </li>
            <li>
              <Link onClick={()=>dispatch(toggleMenuState(false))} className="link" to="/travel/order">
                Lịch đã đặt
              </Link>
            </li>

            {user == null ? (
              <>
                <li>
                 
                    <Link className="link" to="/register">
                      Đăng kí
                    </Link>
                  
                </li>
                <li className=".header-btn-login-link">
               
                
                

                  <div
                    style={
                      loginFormEnable === true
                        ? { display: "block" }
                        : { display: "none" }
                    }
                    className="header-login-form"
                  >
                    <form action="#" onSubmit={handleSubmitForm}>
                      <span style={{color:'red'}}>{loginErrorMessage && loginErrorMessage[0]}</span>
                      <div className="email-input">
                        <span>Email</span>
                        <input
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          type="text"
                        />
                      </div>
                      <div className="password-input">
                        <span>Password</span>
                        <input
                          required
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          type="password"
                        />
                      </div>
                      <Link to="/register" className="link">
                        <span
                          onClick={handleCloseLoginForm}
                          className="no-account-link"
                        >
                          Bạn chưa có tài khoản ?
                        </span>
                      </Link>

                      <div className="login-btn">
                        <button>Đăng nhập</button>
                      </div>
                    </form>
                  </div>
                </li>
              </>
            ) : (
                <div className='user-container'>
                    
                    <li onClick={handleLogout} style={{color:'red',fontWeight:'bold',fontSize:20,cursor:'pointer'}}><FiLogOut/> Logout</li>
                </div>
            )}
          </ul>
        </div>
    <div className="App">
        <div className="app-container">
        <Header/>
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path= '/travel/order' element= {<UserOrder/>} />
          <Route path='/category/details/:id' element ={<CategoryDetails/>} />
          <Route path='/register' element={<Register/>} />
          <Route path='/login' element={<Login/>} />
          <Route path='/travel/details/:id' element={<Details/>} />
          <Route path= '/travel/details/:id/order' element= {<Order/>} />
        </Routes>
        <Footer/>
        </div>
        {/* <div className='message'>
          <div className='pop-up-mess'>
              <span>Liên hệ với chúng tôi !</span>
          </div>
          <img className='message-icon' src={message} alt="" />
        </div> */}
    </div>
    </div>
  );
}

export default App;
