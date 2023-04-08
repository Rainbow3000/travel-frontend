import React, { useState } from 'react'
import './register.scss'
import { Link } from 'react-router-dom'
import { useDispatch,useSelector } from 'react-redux'
import { setRegisterErrorMessage } from '../../store/slice/errorSlice'
import { validateEmail } from '../../validate/validate'
import { publicRequest } from '../../requestMethod'
const Register = () => {
    const [email,setEmail] = useState(""); 
    const [password,setPassword] = useState(""); 
    const [rePassword,setRepassword] = useState(""); 
    const [successMessage,setSuccessMessage] = useState(""); 

    const {registerErrorMessage} = useSelector(state=>state.error)
    const dispatch = useDispatch(); 

    const handleSubmitForm = async(e)=>{
        e.preventDefault(); 
        try {
            
            const isEmail = validateEmail(email); 
          
            if(isEmail === null){
                dispatch(setRegisterErrorMessage("Email không hợp lệ"))
                return; 
            }
            if(password !== rePassword){
                dispatch(setRegisterErrorMessage("Mật khẩu không khớp"))
               return; 
            }

            const response =  await publicRequest.post("/auth/register",{
                email,password
            }); 

            if(response.data?.message === "SUCCESS"){
                setSuccessMessage("Đăng kí tài khoản thành công !")
                dispatch(setRegisterErrorMessage(""))
                setEmail("")
                setPassword("")
                setRepassword(""); 
            }else {
                dispatch(setRegisterErrorMessage(response.data?.errorMessage)); 
            }
        } catch (error) {
            dispatch(setRegisterErrorMessage(error.errorMessage)); 
        }
    }
  return (
    <div className='register-container'>
        <div className='register-form'>
            <form action="" onSubmit={handleSubmitForm}>
                <h1>Đăng ký tài khoản</h1>
                <span style={{color:"green"}}>{successMessage && successMessage}</span>
                <span style={{color:'red'}}>{registerErrorMessage && registerErrorMessage[0]}</span>
                <div className='email-regsiter'>
                    <span>Email</span>
                    <input value={email} onChange={(e)=>setEmail(e.target.value)} type="text" required/>
                </div>

                <div className='password-register'>
                    <span>Mật khẩu</span>
                    <input value={password} onChange={(e)=>setPassword(e.target.value)} type="password" required />
                </div>


                <div className='repassword-register'>
                    <span>Nhập lại mật khẩu</span>
                    <input value={rePassword} onChange={(e)=>setRepassword(e.target.value)} type="password" required/>
                </div>
                <Link to="/" className="link">
                    <span className='have-account-link'>
                        Bạn đã có tài khoản ?
                    </span>
                </Link>
                <div className='button-register'>
                    <button type='submit'>Đăng ký</button>
                </div>
            </form>
        </div>
    </div>
  )
}

export default Register
