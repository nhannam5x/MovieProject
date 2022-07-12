import React, { Component } from "react";
import { useDispatch, useSelector } from "react-redux";
import Slider from "react-slick";
import styleSlick from "./_MultipleRowSlick.module.scss";

// import Film from "../Film/Film";
import Film_Flip from "../Film/Film_Flip";
import {
  SET_PHIM_DANG_CHIEU,
  SET_PHIM_SAP_CHIEU,
} from "../../redux/types/QuanLyPhimType";

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={`${className} ${styleSlick["slick-prev"]}`}
      style={{ ...style, display: "block" }}
      onClick={onClick}
    ></div>
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={`${className} ${styleSlick["slick-prev"]}`}
      style={{ ...style, display: "block", left: "-50px" }}
      onClick={onClick}
    ></div>
  );
}

export default function MultipleRowSlick(props) {
  const { arrFilms } = props;
  const dispatch = useDispatch();
  const { dangChieu, sapChieu } = useSelector(
    (state) => state.QuanLyPhimReducer
  );
  const renderFilms = () => {
    return arrFilms.map((item, index) => {
      return (
        <div className='mt-2' key={index}>
          <Film_Flip phim={item} />
        </div>
      );
    });
  };
  const settings = {
    className: "center variable-width",
    centerMode: true,
    infinite: true,
    centerPadding: "60px",
    slidesToShow: 2,
    speed: 500,
    rows: 2,
    slidesPerRow: 2,
    variableWidth: true,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };

  let activeClassDC = dangChieu === true ? "active_Film" : "none_active_Film";
  let activeClassSC = sapChieu === true ? "active_Film" : "none_active_Film";
  return (
    <div>
      <div className='flex justify-center'>
        {" "}
        <button
          className={`${styleSlick[activeClassDC]} bg-transparent 
        hover:bg-blue-500 
        text-blue-700 
        font-semibold 
        hover:text-white 
        py-2 px-4 
        border 
        border-blue-500 
        hover:border-transparent 
        rounded shadow mr-2`}
          onClick={() => {
            const action = {
              type: SET_PHIM_DANG_CHIEU,
            };
            dispatch(action);
          }}
        >
          Phim Đang Chiếu
        </button>
        <button
          className={`${styleSlick[activeClassSC]} bg-transparent 
        hover:bg-blue-500 
        text-blue-700 
        font-semibold 
        hover:text-white 
        py-2 px-4 
        border 
        border-blue-500 
        hover:border-transparent 
        rounded shadow`}
          onClick={() => {
            const action = {
              type: SET_PHIM_SAP_CHIEU,
            };
            dispatch(action);
          }}
        >
          Phim Sắp Chiếu
        </button>
      </div>
      <Slider {...settings}>{renderFilms()}</Slider>
    </div>
  );
}
