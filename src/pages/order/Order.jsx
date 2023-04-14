import React,{useEffect,useState} from "react";
import "./order.scss";
import {AiOutlinePlus} from 'react-icons/ai'
import {AiOutlineMinus} from 'react-icons/ai'
import  {useDispatch,useSelector} from 'react-redux'
import { getSingleTravel } from "../../store/slice/travelSice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {useLocation} from 'react-router-dom'
import { userRequest } from "../../requestMethod";
import { priceFormat } from "../../utils/convertPrice";
import { useNavigate } from "react-router-dom";
import { validateEmail } from "../../validate/validate";
import { setOrderErrorMessage } from "../../store/slice/errorSlice";
import { setUser, userLogout } from "../../store/slice/userSlice";

const Order = () => {

  const location  = useLocation(); 
  const travelId = location.pathname.split('/')[3]; 

  const [elderQuantity,setElderQuantity] = useState(1);
  const  [childrentQuantity,setChildrentQuantity] = useState(0); 

  const [customerEmail,setCustomerEmail] = useState(""); 
  const [customerName, setCustomerName] = useState(""); 
  const [customerPhone,setCustomerPhone] = useState(""); 
  const [customerAddress,setCustomerAddress] = useState(""); 
  const [customerNote, setCustomerNote] = useState(""); 
  const [widthScreen,setWidthScreen] = useState(window.innerWidth)
  const dispatch = useDispatch(); 
  const navigate = useNavigate(); 

  const {travelDetails} = useSelector(state=>state.travel); 
  const {singlePriceTable} = useSelector(state=>state.priceTable); 
  const {orderErrorMessage} = useSelector(state=>state.error); 

  const handleDecrement = (type)=>{
     if(type === "elder" && elderQuantity <= 1){
        return; 
     }else if(type === "childrent" && childrentQuantity <= 1){
       return; 
     }

     if(type === "elder"){
      setElderQuantity(elderQuantity => elderQuantity - 1); 
     }else {
      setChildrentQuantity(childrentQuantity => childrentQuantity - 1); 
     }
  }


  const handleIncrement = (type)=>{
     if(type === "elder"){
       setElderQuantity(elderQuantity => elderQuantity + 1)
     }else {
       setChildrentQuantity(childrentQuantity=> childrentQuantity + 1); 
     }

  }


  const handleSubmitForm = async(e)=>{
    try{
       e.preventDefault(); 
       const data = {
         userId:1, 
         travelId:1,
         customerName,
         totalPrice:(elderQuantity * singlePriceTable.price) + (childrentQuantity * (singlePriceTable.price / 2)),
         customerEmail,
         customerAddress,
         customerNote,
         customerPhone,
         peopleQuantity:elderQuantity + childrentQuantity, 
         status:"Chờ xác nhận"
       }

       if(data.customerName.trim().length <=0){
        dispatch(setOrderErrorMessage("Tên không được bỏ trống !"))
        return; 
       }

       if(data.customerPhone.trim().length <=0){
        dispatch(setOrderErrorMessage("Số điện thoại không được bỏ trống !"))
        return; 
       }

       if(data.customerEmail.trim().length <=0){
        dispatch(setOrderErrorMessage("Email không được bỏ trống !"))
        return; 
       }

       if(data.customerAddress.trim().length <=0){
        dispatch(setOrderErrorMessage("Địa chỉ không được bỏ trống !"))
        return; 
       }
       
          
       const isEmail = validateEmail(data.customerEmail); 
          
       if(isEmail === null){
           dispatch(setOrderErrorMessage("Email không hợp lệ"))
           return; 
       }


      await userRequest.post('/travel/order',data,{
        headers:{
          Authorization: `Bearer ${JSON.parse(localStorage.getItem('user'))?.accessToken || null}` 
        }
      }); 
     
      
      setChildrentQuantity(0)
      setElderQuantity(1)
      setCustomerEmail("")
      setCustomerName("")
      setCustomerAddress("")
      setCustomerNote("")
      setCustomerPhone("")
      toast("Đặt lịch thành công! Chúng tôi sẽ liên hệ với bạn sau"); 
      navigate('/travel/order')
     }catch(error){
      console.log(error);
      // if(error.response.status === 403){
      //   toast("Phiên đăng nhập đã hết hạn! Vui lòng đăng nhập lại.")
      //   dispatch(userLogout()); 
      //   dispatch(setUser(null)); 
      //   //navigate("/")
      // }
     }

  }

  useEffect(()=>{
    dispatch(getSingleTravel(parseInt(travelId))); 
  },[])


  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if(user === null){
      navigate('/',{
        state:{
          login:true
        }
      }); 
    } 
    window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
  }, []);

  return (
    <div className="order-container">
      <ToastContainer style={{marginTop:120, width:widthScreen < 480 && "50%"}}/>
      <div className="order-item">
        <h1>Thông tin chuyến đi</h1>
        <div className="order-details">
          <ul>
            <li>
              <span>Tên chuyến:</span>
              <span>{travelDetails && travelDetails.travelName}</span>
            </li>
          
            <li>
              <span>Phương tiện:</span>
              <span>{singlePriceTable && singlePriceTable.typeTransport}</span>
            </li>

            <li>
            <span>Điểm xuất phát:</span>
                        <span>{singlePriceTable && singlePriceTable.place}</span>
            </li>
            <li>
                        <span>Ngày xuất phát:</span>
                        <span>{singlePriceTable && singlePriceTable.dateStart}</span>
            </li>
            
          </ul>

          <div className="select-option-tour">
      
                <div className="people-number">
                    <span className="select-title">Số lượng thành viên:</span>
                    <div className="people-item">
                        <span>Người lớn : <b>{elderQuantity}</b></span>
                        <div  onClick={()=>handleDecrement("elder")} className="people-btn"><AiOutlineMinus/></div>
                        <div  onClick={()=>handleIncrement("elder")} className="people-btn"><AiOutlinePlus/></div>
                    </div>
                    <div className="people-item">
                        <span>Trẻ em : <b>{childrentQuantity}</b></span>
                        <div  onClick={()=>handleDecrement("childrent")}  className="people-btn"><AiOutlineMinus/></div>
                        <div  onClick={()=>handleIncrement("childrent")} className="people-btn"><AiOutlinePlus/></div>
                    </div>
                </div>

                

                <div className="to-price">
                    <span>Thành tiền:</span>
                    <span><mark>{ priceFormat((elderQuantity * singlePriceTable?.price) + (childrentQuantity * (singlePriceTable?.price / 2)))}</mark></span>
                </div>
          </div>

          <h1 className="customer-info-title">Thông tin liên hệ của (Anh/Chị)</h1>
           <div className="customer-info-item">
                <form action="" onSubmit={handleSubmitForm}>
                  <span style={{color:'red'}}>{orderErrorMessage && orderErrorMessage[0]}</span>
                    <div className="customer-name">
                        <span>Họ tên (Anh / Chị)</span>
                        <input value={customerName} type="text" onChange={(e)=>setCustomerName(e.target.value)} required  />
                    </div>
                    <div className="customer-contact">
                        <div>
                            <span>Số điện thoại</span>
                            <input value={customerPhone} type="text" onChange={(e)=>setCustomerPhone(e.target.value)} required/>
                        </div>
                        <div>
                            <span>Email</span>
                            <input value={customerEmail} type="text" placeholder="Nhận thông tin " onChange={(e)=>setCustomerEmail(e.target.value)} required />
                        </div>
                        
                    </div>
                    <div className="customer-address">
                        <span>Địa chỉ</span>
                        <input value={customerAddress} type="text" placeholder="Địa chỉ" onChange={(e)=>setCustomerAddress(e.target.value)} required/>
                    </div>
                    <div className="customer-note">
                        <span>Ghi chú</span>
                        <textarea value={customerNote} name="" id="textarea-note" cols="30" rows="10" placeholder="Viết ghi chú cho chúng tôi !" onChange={(e)=>setCustomerNote(e.target.value)}>

                        </textarea>
                    </div>
                    <div className="btn-order">
                        <button type="submit">Đặt lịch</button>
                    </div>
                </form>
            </div> 
        </div>
      </div>
    </div>
  );
};

export default Order;
