import React from 'react'
import nhatrang from '../../images/nhatrang.jpg'
import './travel.scss'
const Travel = () => {
  return (
    <div className='travel-container'>
        <img src={nhatrang} alt="" />
        <span className='travel-name'>Road to sapa</span>
        <span className='travel-price-old'>500.000 VND</span>
        <span className='travel-price-new'>450.000 VND</span>
        <span className='travel-time'>thời gian:3 ngay</span>
        <div className='travel-status'>
        </div>
    </div>
  )
}

export default Travel
