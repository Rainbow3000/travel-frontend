import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { BsSearch } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { setLoginErrorMessage } from "../../store/slice/errorSlice";
import { validateEmail } from "../../validate/validate";
import userSlice, { setUser, userLogout } from "../../store/slice/userSlice";
import { travelBySearch } from "../../store/slice/travelSice";
import { FiLogOut } from "react-icons/fi";
import "./header.scss";
import { BiUser } from "react-icons/bi";
import { ToastContainer, toast } from "react-toastify";
import { publicRequest } from "../../requestMethod";
import { AiOutlineMenu } from "react-icons/ai";
import { toggleMenuState } from "../../store/slice/menuSlice";

const Header = () => {
  const location = useLocation();
  const [loginFormEnable, setLoginFormEnable] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [textSearch, setTextSearch] = useState("");
  const [widthScreen,setWidthScreen] = useState(window.innerWidth)
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const { user } = useSelector((state) => state.user);

  const { loginErrorMessage } = useSelector((state) => state.error);

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
        toast("Đăng nhập thành công !");
        navigate("/");
      } else {
        dispatch(setLoginErrorMessage(response.data?.errorMessage));
      }
    } catch (error) {
      dispatch(setLoginErrorMessage(error.errorMessage));
    }
  };

  const handleLogout = () => {
    dispatch(userLogout());
    dispatch(setUser(null));
    toast("Đăng xuất thành công !");
    navigate("/");
  };

  const handleClickSearchIcon = () => {
    window.scrollTo({ top: 1200, left: 0, behavior: "smooth" });
  };

  const handleShowMenu = () => {
    dispatch(toggleMenuState(true));
  };

  return (
    <div className="header-container">
      <ToastContainer style={{ marginTop: 200, width:widthScreen < 480 && "50%" }} />
      <div className="header-top">
        <div className="header-top-left">
          <Link className="link" to="/">
            <h1>LINK-TRAVEL</h1>
          </Link>
        </div>

        {!user && (
          <button className="login-btn-mobile" onClick={handleShowLoginForm}>
            <Link className="link" to="/login">
              <span>Đăng nhập</span>
            </Link>
          </button>
        )}

          <div style={{display:'flex',alignItems:'center'}}>
              {user && (
                <li className="user-icon" style={{ fontWeight: "bold" }}>
                  <BiUser /> {user.email.split("@")[0]}
                </li>
              )}
              <li className="menu-icon" onClick={handleShowMenu}>
                <AiOutlineMenu />
              </li>
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
              <Link className="link" to="/travel/order">
                Lịch đã đặt
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
                      <span style={{ color: "red" }}>
                        {loginErrorMessage && loginErrorMessage[0]}
                      </span>
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
              <>
                <li style={{ display: "flex", alignItems: "center" }}>
                  <BiUser style={{ marginRight: 10 }} />
                  <li style={{ fontWeight: "bold" }}>
                    {user.email.split("@")[0]}
                  </li>
                </li>
                <li
                  onClick={handleLogout}
                  style={{
                    color: "red",
                    fontWeight: "bold",
                    fontSize: 20,
                    cursor: "pointer",
                  }}
                >
                  <FiLogOut />
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
      <div className="header-body">
        <form action="#" onSubmit={(e) => e.preventDefault()}>
          <input
            onChange={(e) => dispatch(travelBySearch(e.target.value))}
            type="text"
            placeholder="Tìm kiếm địa điểm du lịch của bạn..."
          />
          <button onClick={handleClickSearchIcon}>
            <BsSearch />
          </button>
        </form>
      </div>
    </div>
  );
};

export default Header;
