import React, {useEffect, useRef, useState } from "react";
import "./category.scss";
import { Link} from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa";
import {publicRequest} from '../../requestMethod'

const Category = () => {


  const [categorys,setCategorys] = useState([]);


  const sliceRef = useRef();
  let widthDefault = 1300;
  let scrollValueInit = 0; 

  const handleArrowRightCick = () => {
    let value = sliceRef.current.getBoundingClientRect().width - widthDefault; 
    if(value > 0){
        scrollValueInit += 325;   
        sliceRef.current.style.transform = `translateX(-${scrollValueInit}px)`;
        widthDefault += 325;  
    }else{
        scrollValueInit  = 0; 
        widthDefault = 1300; 
        sliceRef.current.style.transform = `translateX(-${scrollValueInit}px)`;
    }
};




  const handleArrowLeftCick = () => {
      if(scrollValueInit > 0){
            scrollValueInit -= 325; 
            sliceRef.current.style.transform = `translateX(-${scrollValueInit}px)`;
            widthDefault -= 325; 
      }
  };

  const getCategory = async()=>{
    try {
        const response = await publicRequest.get('/category'); 
        setCategorys(response.data?.data); 
    } catch (error) {
      console.log(error); 
    }
  }
 

  useEffect(()=>{
     getCategory(); 
  },[])

 
  return (
    <div className="category-container" id="category">
      <h1>DANH MỤC</h1>
      <div className="hr"></div>
      <div className="category-slice">
        <div className="arrow-btn btn-left" onClick={handleArrowLeftCick}>
          <FaArrowLeft />
        </div>
        <div className="category-list" ref={sliceRef}>

          {
            categorys && categorys.map(item=>{
              return (
                <Link to={`/category/details/${item.id}`} className="link">
                  <div className="category-item">
                    <img src={item.categoryImg} alt="" />
                    <div className="category-overlay-f"></div>
                    <div className="category-overlay"></div>
                    <div className="category-info">
                      <span className="category-name">{item.categoryName}</span>
                      <button className="category-btn">XEM</button>
                    </div>
                  </div>
                </Link>
                
              )
            })
          }

        </div>
        <div className="arrow-btn btn-right" onClick={handleArrowRightCick}>
          <FaArrowRight />
        </div>
      </div>
    </div>
  );
};

export default Category;
