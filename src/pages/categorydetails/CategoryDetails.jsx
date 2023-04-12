import React, { useEffect, useState } from "react";
import TravelCate from "../../components/travelCate/TravelCate";
import "./categoryDetails.scss";
import {
  getAllTravelByCategoryId,
  travelFilters,
  travelFiltersByCategoryId,
} from "../../store/slice/travelSice";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

const CategoryDetails = () => {
  const location = useLocation();
  const categoryId = location.pathname.split("/")[3];

  const [cateActive, setCateActive] = useState(0);
  const handleChangeCateActive = (index) => {
    setCateActive(index);
    dispatch(travelFiltersByCategoryId(index));
  };
  const { travelsByCategoryId, travelsAfterFilterByCategoryId } = useSelector(
    (state) => state.travel
  );

  const dispatch = useDispatch();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, []);

  useEffect(() => {
    dispatch(getAllTravelByCategoryId(parseInt(categoryId)));
  }, []);

  return (
    <div className="category-details-container">
      <div className="category-details-item">
        <h1>Danh mục các tour du lịch</h1>
        <div className="category-details-main">
          <div className="category-filter">
            <h2>Tìm tour bạn muốn</h2>
            <div className="travel-type">
              <h3>Kiểu tour:</h3>
              <ul>
                <li>
                  <input type="checkbox" />
                  <span>Nhiều cảnh đẹp</span>
                </li>
                <li>
                  <input type="checkbox" />
                  <span>Nhiều món ăn ngon</span>
                </li>
                <li>
                  <input type="checkbox" />
                  <span>Nhiều núi</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="category-travel-list">
            <div className="category-sort">
              <ul>
                <h2>Sắp xếp:</h2>
                {["Đề xuất", "Giá:Thấp đến cao", "Giá:Cao đến thấp"].map(
                  (item, index) => {
                    return (
                      <li
                        onClick={() => handleChangeCateActive(index)}
                        style={{
                          color: cateActive === index && "blue",
                          border: cateActive === index && "2px solid blue",
                          backgroundColor:
                            cateActive !== index
                              ? "rgba(128, 128, 128, 0.203)"
                              : "white",
                        }}
                      >
                        {item}
                      </li>
                    );
                  }
                )}
              </ul>
            </div>
            {travelsAfterFilterByCategoryId.length <= 0 && (
              <span style={{marginTop:30,fontWeight:'bold'}}>
                Danh mục này chưa có chuyến du lịch nào ! Chúng tôi sẽ cập nhật
                sau
              </span>
            )}

            <div className="travel-list">
              {travelsAfterFilterByCategoryId &&
                travelsAfterFilterByCategoryId.map((item) => {
                  return <TravelCate item={item} />;
                })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryDetails;
