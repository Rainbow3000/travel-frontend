import React, { useEffect, useState } from "react";
import "../register/register.scss";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  setLoginErrorMessage,
  setRegisterErrorMessage,
} from "../../store/slice/errorSlice";
import { validateEmail } from "../../validate/validate";
import { publicRequest } from "../../requestMethod";
import { useNavigate } from "react-router-dom";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { setUser } from "../../store/slice/userSlice";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const { loginErrorMessage } = useSelector((state) => state.error);
  const dispatch = useDispatch();
  const navigate = useNavigate();

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

  useEffect(() => {
    if (JSON.parse(localStorage.getItem("user")) !== null) {
      navigate("/");
    }
  }, []);

  return (
    <div className="register-container">
      <ToastContainer
        style={{
          color: successMessage.length > 0 ? "green" : "red",
          marginTop: 150,
        }}
      />
      <div className="register-form">
        <form style={{padding:10,width:"90%"}} action="" onSubmit={handleSubmitForm}>
          <h1>Đăng nhập</h1>
          <span style={{ color: "red" }}>
            {loginErrorMessage && loginErrorMessage[0]}
          </span>
          <div className="email-regsiter">
            <span>Email</span>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="text"
              required
            />
          </div>

          <div className="password-register">
            <span>Mật khẩu</span>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              required
            />
          </div>

          <Link to="/register" className="link">
            <span className="have-account-link">Bạn chưa có tài khoản ?</span>
          </Link>
          <div className="button-register">
            <button type="submit">Đăng nhập</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
