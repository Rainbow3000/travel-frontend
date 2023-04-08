import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { BsSearch } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { setLoginErrorMessage } from "../../store/slice/errorSlice";
import { validateEmail } from "../../validate/validate";
import  { setUser,userLogout } from "../../store/slice/userSlice";
import {FiLogOut} from 'react-icons/fi'
import "./header.scss";
import { publicRequest } from "../../requestMethod";
const Header = () => {
  const location = useLocation(); 
  const [loginFormEnable, setLoginFormEnable] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();


  const { user } = useSelector((state) => state.user);

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
  }



  return (
    <div className="header-container">
      <div className="header-top">
        <div className="header-top-left">
          <Link className="link" to="/">
            <h1>LINK-TRAVEL</h1>
          </Link>
        </div>
        <div className="header-top-right">
          <ul>
            <li className="hot-line">Hotline:+123456789</li>
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
              <Link className="link" to="">
                Đặt lịch của bạn
              </Link>
            </li>

            {user == null ? (
              <>
                <li>
                  <button className="header-btn-register">
                    <Link className="link" to="/register">
                      Đăng kí
                    </Link>
                  </button>
                </li>
                <li className=".header-btn-login-link">
                  <button
                    className="header-btn-login"
                    onClick={handleShowLoginForm}
                  >
                    <Link className="link" to="#">
                      Đăng nhập
                    </Link>
                  </button>

                  <div
                    style={
                      loginFormEnable === true
                        ? { display: "block" }
                        : { display: "none" }
                    }
                    className="header-login-form"
                  >
                    <form action="#" onSubmit={handleSubmitForm}>
                      <div className="email-input">
                        <span>Email</span>
                        <input
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          type="text"
                        />
                      </div>
                      <div className="password-input">
                        <span>Password</span>
                        <input
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
                <>
                    <li style={{fontWeight:'bold'}}>{user.email}</li>
                    <li onClick={handleLogout} style={{color:'red',fontWeight:'bold',fontSize:20,cursor:'pointer'}}><FiLogOut/></li>
                </>
            )}
          </ul>
        </div>
      </div>
      <div className="header-body">
        <form action="">
          <input
            type="text"
            placeholder="Tìm kiếm địa điểm du lịch của bạn..."
          />
          <button>
            <BsSearch />
          </button>
        </form>
      </div>
    </div>
  );
};

export default Header;
