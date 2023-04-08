import React, { useEffect } from 'react'
import Featured from '../../components/featured/Featured'
import Category from '../../components/category/Category'
import TravelList from '../../components/travelList/TravelList'
import NewsFeed from '../../components/newsfeed/NewsFeed'
import './home.scss'


const Home = () => {    

  useEffect(() => {
    window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
  }, []);

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
