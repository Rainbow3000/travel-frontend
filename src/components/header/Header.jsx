import React from 'react'
import { Link } from 'react-router-dom'
import {BsSearch} from 'react-icons/bs'
import './header.scss'
const Header = () => {
  return (
    <div className='header-container'>
        <div className="header-top">
            <div className="header-top-left">
                <h1>LINK-TRAVEL</h1>
            </div>
            <div className="header-top-right">
                <ul>
                    <li className='hot-line'>Hotline:+123456789</li>
                    <li><Link className='link' to="">Giới thiệu</Link></li>
                    <li><Link className='link' to="">Điều khoản</Link></li>
                    <li><Link className='link' to="">Đặt lịch của bạn</Link></li>
                    <li>
                        <button className='header-btn-register'>
                        <Link className='link' to="">Đăng kí</Link>
                        </button>
                    </li>
                    <li>
                        <button className='header-btn-login'>
                            <Link className='link' to="">Đăng nhập</Link>
                        </button>
                    </li>
                </ul>
            </div>
        </div>
        <div className="header-body">
                <form action="">
                    <input type="text" placeholder='Tìm kiếm địa điểm du lịch của bạn...' />
                    <button><BsSearch/></button>
                </form>
        </div>
        
    </div>
  )
}

export default Header
