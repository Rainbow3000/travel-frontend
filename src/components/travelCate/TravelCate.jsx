import React from 'react'
import './travelCate.scss'
import { Link } from 'react-router-dom'
import { priceFormat } from '../../utils/convertPrice'

const TravelCate = ({item}) => {
  return (
    <div className='travel-cate-container'>
            <div className='travel-cate-img'>
                <img src={item && item.travelImg} alt="" />
            </div>
            <div className='trave-cate-details'>
                <span>{item && item.travelName}</span>
                <span>{item && item.travelDetails?.travelDescription}</span>
                <div className='cate-travel-price'>
                    <span>Giá: <mark style={{fontSize:20,color:'orangered'}}>{item && priceFormat(item.travelPriceNew)}</mark></span>
                    <span>{item && priceFormat(item.travelPriceOld)}</span>
                </div>
                <Link to={`/travel/details/${item.id}`} className="link">
                   <button style={{padding:10,display:'flex',justifyContent:'center',alignItems:'center'}} >ĐẶT LỊCH</button>
                </Link>
            </div>
    </div>
  )
}

export default TravelCate
