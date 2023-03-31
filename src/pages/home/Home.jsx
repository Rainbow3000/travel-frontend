import React, { useEffect } from 'react'
import Header from '../../components/header/Header'
import Featured from '../../components/featured/Featured'
import Footer from '../../components/footer/Footer'
import Category from '../../components/category/Category'
import TravelList from '../../components/travelList/TravelList'
import './home.scss'

const Home = () => {    
  return (
    <div className='home-container'>
        <Header/>
        <Featured/>
        <Category/>
        <TravelList/>
    </div>
  )
}

export default Home
