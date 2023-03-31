import React, { useEffect, useRef, version } from "react";
import "./category.scss";
import sapa from "../../images/sapa1.jpg";
import tamdao from "../../images/tamdao.jpg";
import nhatrang from "../../images/nhatrang.jpg";
import dalat from "../../images/dalat.jpg";
import saigon from "../../images/saigon.jpg";

import { FaArrowLeft } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa";

const Category = () => {
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
 

 
  return (
    <div className="category-container">
      <h1>DANH MỤC</h1>
      <div className="hr"></div>
      <div className="category-slice">
        <div className="arrow-btn btn-left" onClick={handleArrowLeftCick}>
          <FaArrowLeft />
        </div>
        <div className="category-list" ref={sliceRef}>
          <div className="category-item">
            <img src={sapa} alt="" />
            <div className="category-overlay-f"></div>
            <div className="category-overlay"></div>
            <div className="category-info">
              <span className="category-name">SAPA</span>
              <button className="category-btn">XEM</button>
            </div>
          </div>
          <div className="category-item">
            <img src={dalat} alt="" />
            <div className="category-overlay-f"></div>
            <div className="category-overlay"></div>
            <div className="category-info">
              <span className="category-name">ĐÀ LẠT</span>
              <button className="category-btn">XEM</button>
            </div>
          </div>
          <div className="category-item">
            <img src={tamdao} alt="" />
            <div className="category-overlay-f"></div>
            <div className="category-overlay"></div>
            <div className="category-info">
              <span className="category-name">TAM ĐẢO</span>
              <button className="category-btn">XEM</button>
            </div>
          </div>
          <div className="category-item">
            <img src={nhatrang} alt="" />
            <div className="category-overlay-f"></div>
            <div className="category-overlay"></div>
            <div className="category-info">
              <span className="category-name">NHA TRANG</span>
              <button className="category-btn">XEM</button>
            </div>
          </div>
          <div className="category-item">
            <img src={saigon} alt="" />
            <div className="category-overlay-f"></div>
            <div className="category-overlay"></div>
            <div className="category-info">
              <span className="category-name">SÀI GÒN</span>
              <button className="category-btn">XEM</button>
            </div>
          </div>
          <div className="category-item">
            <img src={saigon} alt="" />
            <div className="category-overlay-f"></div>
            <div className="category-overlay"></div>
            <div className="category-info">
              <span className="category-name">SÀI GÒN</span>
              <button className="category-btn">XEM</button>
            </div>
          </div>
          <div className="category-item">
            <img src={saigon} alt="" />
            <div className="category-overlay-f"></div>
            <div className="category-overlay"></div>
            <div className="category-info">
              <span className="category-name">SÀI GÒN</span>
              <button className="category-btn">XEM</button>
            </div>
          </div>
        </div>
        <div className="arrow-btn btn-right" onClick={handleArrowRightCick}>
          <FaArrowRight />
        </div>
      </div>
    </div>
  );
};

export default Category;
