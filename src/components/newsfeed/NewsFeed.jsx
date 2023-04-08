import React from 'react'
import {AiOutlineSend} from 'react-icons/ai'
import './newsFeed.scss'
const NewsFeed = () => {
  return (
    <div className='news-feed-container'>
        <form action="#">
          <h1>TIN MỚI</h1>
          <label htmlFor="">Gửi email của bạn để nhận thông tin mới nhất về chúng tôi.</label>
          <input type="text" placeholder='Nhập email của bạn tại đây ...' />
          <button><AiOutlineSend/></button>
        </form>
    </div>
  )
}

export default NewsFeed
