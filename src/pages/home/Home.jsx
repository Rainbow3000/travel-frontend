import React, { useEffect } from 'react'
import Featured from '../../components/featured/Featured'
import Category from '../../components/category/Category'
import TravelList from '../../components/travelList/TravelList'
import NewsFeed from '../../components/newsfeed/NewsFeed'
import './home.scss'


const Home = () => {    

  return (
    <div className='home-container'>
        <Featured/>
        <Category/>
        <TravelList/>
        <NewsFeed/>
    </div>
  )
}

export default Home
