import React, { useEffect, useState } from 'react'
import './userOrder.scss'
import {userRequest } from '../../requestMethod';
import { useSelector } from 'react-redux';

const UserOrder = () => {

    const [order,setOrder] = useState([]); 
    const {travels} = useSelector(state=>state.travel); 
    const [windowWidth] = useState(window.innerWidth) 
    const {user} = useSelector(state=>state.user); 

    const getOrder = async()=>{
        try {
          const response = await userRequest.get(`/travel/order/userId/${user.id}`,{
            headers:{
              Authorization: `Bearer ${JSON.parse(localStorage.getItem('user'))?.accessToken || null}` 
            }
          }); 
          setOrder(response.data?.data); 
        } catch (error) {
          console.log(error); 
        }
      }
    useEffect(()=>{
         getOrder();
    },[])

  return (
    <div className='user-order-container'>
        {
            order.length > 0 ? (
                <>
        <h1>Lịch đã đặt</h1>
      <table id="customers">
        <tr>
          
          <th>Tên chuyến đi</th>
          {
            windowWidth >= 700  &&   <th>Số người</th>
          }
          
          {
            windowWidth >= 700  &&   <th>Ghi chú</th>
          }
         
          <th>Tổng tiền</th>
          <th>Trạng thái</th>
        </tr>

        {
          order && order.map(item=>{
            const travelFilter = travels && travels.find(element => element.id === item.travelId); 
            console.log(travelFilter?.travelName);
            return (
              <tr>
               

                <td>{travelFilter && travelFilter.travelName}</td>

                {
                  windowWidth >= 700 &&  <td>{item.peopelQuantity}</td>
                }

{
                  windowWidth >= 700 &&   <td>{item.customerNote}</td>
                }
               
                <td>{item.totalPrice}</td>
                <td>{item.status}</td>
            </tr>
            )
          })
        }
      
        
      </table>
      </>
            ) : <span style={{fontWeight:'bold'}}>Chưa có lịch nào được đặt !</span>
        }
    </div>
  )
}

export default UserOrder
