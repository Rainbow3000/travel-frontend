import React from 'react'
import {FiSearch} from 'react-icons/fi'
import { Link } from 'react-router-dom'
import './travel.scss'
import { priceFormat } from '../../utils/convertPrice'
const Travel = ({item}) => {

  
  return (
    <Link className='link' to={`/travel/details/${item.id}`}>
    <div className='travel-container'>
      <div className='travel-icon'>
        <FiSearch className='travel-details-icon'/>
      </div>
        <div className='travel-overlay'></div>
        <img src={item.travelImg} alt="" />
        <span className='travel-name'>{item.travelName}</span>
        <div className='travel-price'>
        <span className='travel-price-new'>{priceFormat(item.travelPriceNew)}</span>
        <span className='travel-price-old'>{priceFormat(item.travelPriceOld)}</span>
        </div>
        <div className='travel-goto'>
            <div>

            <span className='travel-time'><span style={{fontWeight:'700'}}>Trạng thái:</span>{item.travelStatus === 1 && " Còn chỗ"}</span><br/>
            <span className='travel-time'><span style={{fontWeight:'700'}}>Thời gian:</span>{item.travelDateNumber}</span>
            </div>
            <button>ĐẶT LỊCH</button>
        </div>
       
    </div>
    </Link>
  )
}

export default Travel
