import React from 'react'
import './featured.scss'
import featured from './featured.jpg'
const Featured = () => {
  return (
    <div className='featured-container'>
        <img src={featured} alt="featured img" />
        <div className="featured-introduct">
            <span> <span style={{color:"blue"}} >LINK TRAVEL!</span> Chúng tôi cung cấp cho bạn một trải nghiệm du lịch tuyệt vời với những chuyến đi thú vị, các địa điểm du lịch đẹp mắt và các hoạt động giải trí đa dạng.Rất hân hạnh khi được đồng hành cùng với bạn !</span>
            <button>        
            <a className='link-to-category' href="#category">
                KHÁM PHÁ NGAY
            </a>
              </button>
        </div>
    </div>
  )
}

export default Featured
