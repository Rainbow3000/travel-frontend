import React, { useRef, useState, useEffect } from "react";
import "./details.scss";
import moment from "moment/moment";
import { BiRightArrow } from "react-icons/bi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { publicRequest, userRequest } from "../../requestMethod";
import { useDispatch, useSelector } from "react-redux";
import { getAllTravel, getSingleTravel } from "../../store/slice/travelSice";

import {
  setPriceTable,
  setSinglePriceTable,
} from "../../store/slice/priceTableSlice";
import { priceFormat } from "../../utils/convertPrice";
const Details = () => {
  const detailsSliceRef = useRef();

  const [cateInit, setCateInit] = useState(0);
  const [featured, setFeatured] = useState([]);
  const [travelSchedule, setTravelSchedule] = useState([]);
  const [comments, setComments] = useState([]);
  const [userComment, setUserComment] = useState("");
  const [widthScreen,setWidthScreen] = useState(window.innerWidth)
  const [travelImages, setTravelImages] = useState([]);

  const navigate = useNavigate();
  const location = useLocation();

  const travelId = location.pathname.split("/")[3];
  const dispatch = useDispatch();

  let initWidth = 1300;
  let widthDefault = 1300;

  const { travelDetails } = useSelector((state) => state.travel);

  const { user } = useSelector((state) => state.user);

  const { priceTable } = useSelector((state) => state.priceTable);

  const handleArrowBtnlick = () => {
    const widthAbleScroll =
      detailsSliceRef.current.getBoundingClientRect().width - widthDefault;
    if (widthAbleScroll > 0) {
      detailsSliceRef.current.style.transform = `translateX(-${initWidth}px)`;
      initWidth += 1300;
      widthDefault += 1300;
    } else {
      initWidth = 1300;
      widthDefault = 1300;
      detailsSliceRef.current.style.transform = `translateX(0px)`;
    }
  };

  const handleChangeColorCate = (index) => {
    setCateInit(index);
  };

  const getTravelFeatured = async () => {
    try {
      const response = await publicRequest.get(
        `/travel/featured/travelId/${travelId}`
      );
      setFeatured(response.data?.data);
    } catch (error) {}
  };

  const notify = () => {
    if (user === null) {
      toast("Bạn cần đăng nhập trước khi đặt vé !");
    } else {
      navigate(`/travel/details/${travelId}/order`);
    }
  };

  const getScheduleTravel = async () => {
    try {
      const response = await publicRequest.get(
        `/travel/schedule/travelId/${travelId}`
      );
      setTravelSchedule(response.data?.data);
    } catch (error) {}
  };

  const getPriceTable = async () => {
    try {
      const response = await publicRequest.get(
        `/travel/price/travelId/${travelId}`
      );
      dispatch(setPriceTable(response.data?.data));
    } catch (error) {}
  };

  const getComments = async () => {
    try {
      const response = await publicRequest.get(
        `/travel/comment/travelId/${travelId}`
      );
      setComments(response.data?.data);
    } catch (error) {}
  };


  const handleSetSinglePriceTable = (item) => {
    localStorage.setItem("singlePriceTable", JSON.stringify(item));
    dispatch(setSinglePriceTable(item));
  };

  const getTravelImages = async () => {
    try {
      const response = await publicRequest.get(`/travelDetails/image/travelId/${travelId}`);
      setTravelImages(response.data?.data);
    } catch (error) {}
  };

  useEffect(() => {
    getTravelFeatured();
    getScheduleTravel();
    getPriceTable();
    getComments();
    getTravelImages();
  }, []);

  useEffect(() => {
    dispatch(getSingleTravel(parseInt(travelId)));
  }, []);

  const handleComment = async (e) => {
    e.preventDefault();
    if (user === null) {
      toast("Bạn cần đăng nhập trước khi bình luận !");
      setUserComment("");
      if(widthScreen < 700){
          navigate('/login');
          return; 
      }
      return;
    }
    try {
      const data = {
        userId: user?.id,
        travelId,
        content: userComment,
        commentDate: moment().format().split("T")[0],
      };
      const response = await userRequest.post("/travel/comment", data, {
        headers: {
          Authorization: `Bearer ${
            JSON.parse(localStorage.getItem("user"))?.accessToken || null
          }`,
        },
      });
      setComments((comments) => [...comments, response.data?.data]);
      setUserComment("");
    } catch (error) {
      console.log(error);
    }
  };

  console.log(travelImages);

  return (
    <div className="details-container">
      <div className="details-item">
        <h1>{travelDetails && travelDetails.travelName}</h1>
 
        <div className="details-item-wrap">
          <div className="details-slice-wrap">
            <div className="arrow-btn" onClick={handleArrowBtnlick}>
              <BiRightArrow />
            </div>
            <div className="details-slice" ref={detailsSliceRef}>
              {travelImages &&
                travelImages.map((item) => {
                  return (
                    <img
                      height={1000}
                      style={{ objectFit: "cover" }}
                      src={item.image}
                    />
                  );
                })}
            </div>
          </div>
        </div>

        <div className="details-category">
          <div className="details-category-list">
            <ul className="details-cate-list">
              {[
                {
                  name: "Thông tin",
                  link: "info",
                },
                {
                  name: "Lịch trình",
                  link: "schedule",
                },
                {
                  name: "Bảng giá",
                  link: "price-table",
                },
                {
                  name: "Bình luận",
                  link: "comments",
                },
              ].map((item, index) => {
                return (
                  <a className="details-link" href={`#${item.link}`}>
                    <li
                      onClick={() => handleChangeColorCate(index)}
                      style={{ color: cateInit === index && "blue" }}
                    >
                      {item.name}
                    </li>
                  </a>
                );
              })}
            </ul>

            <button className="details-btn-choose">
              <a href="#price-table">Chọn vé</a>
            </button>
          </div>

          <div className="details-text" id="info">
            <span>{travelDetails && travelDetails.travelDescription}</span>
            <h1 className="featured-featured">
              {" "}
              <mark>Nổi bật:</mark>
            </h1>
            <div className="featured-details">
              <ul>
                {featured &&
                  featured.map((item, index) => {
                    return <li>{index + 1 + " . " + item.featuredName}</li>;
                  })}
              </ul>
            </div>
            <h1 className="schedule-tour-title">
              {" "}
              <mark>Lịch trình tour:</mark>
            </h1>
            <div className="schedule" id="schedule">
              <ul>
                {travelSchedule &&
                  travelSchedule.map((item, index) => {
                    return (
                      <li>
                        <h2 className="schedule-day">{item.dateName}:</h2>
                        <ul>
                          {item.scheduleDates &&
                            item.scheduleDates
                              .sort((x, y) => x.id - y.id)
                              .map((schedule) => {
                                return (
                                  <li>
                                    <h4
                                      style={{ marginTop: 30 }}
                                      className="session"
                                    >
                                      {schedule.sessionDateName}:
                                    </h4>
                                    <ul>
                                      {schedule.scheduleContent &&
                                        schedule.scheduleContent.map(
                                          (content) => {
                                            return <li>- {content.content}</li>;
                                          }
                                        )}
                                    </ul>
                                  </li>
                                );
                              })}
                        </ul>
                      </li>
                    );
                  })}
              </ul>

              <h1 className="details-table-price" id="price-table">
                <mark>Bảng giá</mark>
              </h1>
              <table id="customers">
                <tr>
                  <th>Ngày xuất phát</th>
                  <th>Địa điểm xuất phát</th>
                  <th>Loại phương tiện</th>
                  <th>Giá vé</th>
                  <th>Tùy chọn</th>
                </tr>
                {priceTable &&
                  priceTable.map((item) => {
                    return (
                      <tr onClick={() => handleSetSinglePriceTable(item)}>
                        <td>{item.dateStart}</td>
                        <td>{item.place}</td>
                        <td>{item.typeTransport}</td>
                        <td style={{ color: "red" }}>
                          {priceFormat(item.price)}
                        </td>
                        <td>
                          <button onClick={notify} className="btn-order">
                            Đặt vé
                          </button>
                        </td>
                      </tr>
                    );
                  })}
              </table>

              <h1 className="comment-rate">
                <mark>Bình luận & Đánh giá</mark>
              </h1>
              <div className="comment-container" id="comments">
                {comments &&
                  comments.map((item) => {
                    return (
                      <div className="comment-user">
                        <span className="comment-date">{item.commentDate}</span>
                        <div>
                          <span
                            style={{ color: "#333" }}
                            className="comment-username"
                          >
                            {item.userCommentName} -{" "}
                          </span>
                          <span className="comment-content">
                            {item.content}
                          </span>
                        </div>
                      </div>
                    );
                  })}

                <div className="comments-form">
                  <form action="" onSubmit={handleComment}>
                    <input
                      value={userComment}
                      type="text"
                      placeholder="Viết bình luận của bạn..."
                      required
                      onChange={(e) => setUserComment(e.target.value)}
                    />
                    <button type="submit">Bình luận</button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Details;
