import React, { useDebugValue, useEffect, useState } from 'react'
import Travel from '../travel/Travel'
import './travelList.scss'
import {getAllTravel, travelFilters} from '../../store/slice/travelSice'
import {useSelector,useDispatch} from 'react-redux'


const TravelList = () => {
    


  const [cateActive,setCateActive] = useState(0); 

  const {travelsAfterFilter} = useSelector(state=>state.travel); 


  const dispatch  = useDispatch(); 

  const handleCateActiveChange = (index)=>{
          setCateActive(index); 
          dispatch(travelFilters(index));
  }

  useEffect(()=>{
    dispatch(getAllTravel());  
    dispatch(travelFilters(0));
  },[])

  
  return (
    <div className='travel-list-container' id='#travel'>
        <h1>ĐỊA ĐIỂM NỔI BẬT</h1>
        <div className='hr'></div>
        <div className='travel-list-item'>
                <div className='travel-list-cate'>
                    <ul>
                        {
                        ["ĐỀ XUẤT","GIÁ: THẤP -> CAO","GIÁ: CAO -> THẤP","ĐANG HOT"].map((item,index)=>{
                            return <li onClick={()=>handleCateActiveChange(index)}  style={{color: cateActive === index && "orangered"}}>{item}</li>
                        })
                        }
    
                    </ul>
                </div>

                <div className='travel-list'>
                        {
                           travelsAfterFilter && travelsAfterFilter.map(item=>{
                                return <Travel item = {item}/>
                            })
                        }
                </div>
        </div>

    </div>
  )
}



export default TravelList
