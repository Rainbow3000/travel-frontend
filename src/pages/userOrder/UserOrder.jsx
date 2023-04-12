import React, { useEffect, useState } from 'react'
import './userOrder.scss'
import {userRequest } from '../../requestMethod';
import { useSelector } from 'react-redux';

const UserOrder = () => {

    const [order,setOrder] = useState([]); 
    const {travel} = useSelector(state=>state.travel); 

    const {user} = useSelector(state=>state.user); 

    const getOrder = async()=>{
        try {
          const response = await userRequest.get(`/travel/order/userId/${user.id}`); 
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
          <th>Tên khách hàng</th>
          <th>Email</th>
          <th>Địa chỉ</th>
          <th>Số điện thoại</th>
          <th>Tên chuyến đi</th>
          <th>Số người</th>
          <th>Ghi chú</th>
          <th>Tổng tiền</th>
          <th>Trạng thái</th>
          <th>Thao tác</th>
        </tr>

        {
          order && order.map(item=>{
            const travelFilter = travel && travel.find(element => element.id === item.id); 
            return (
              <tr>
                <td>{item.customerName}</td>
                <td>{item.customerEmail}</td>
                <td>{item.customerAddress}</td>
                <td>{item.customerPhone}</td>
                <td>{travelFilter && travelFilter.travelName}</td>
                <td>{item.peopelQuantity}</td>
                <td>{item.customerNote}</td>
                <td>{item.totalPrice}</td>
                <td>{item.status}</td>
                <td>
                  <button className="btn-delete">HỦY</button>
                </td>
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
