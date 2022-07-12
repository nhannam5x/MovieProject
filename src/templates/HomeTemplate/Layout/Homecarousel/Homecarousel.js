import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Carousel } from "antd";
import { getCarouselAction } from "../../../../redux/actions/CarouselAction/CarouselActions";
import "./HomeCarousel.css";

const contentStyle = {
  height: "600px",
  color: "#fff",
  lineHeight: "160px",
  textAlign: "center",
  backgroundPosition: "center",
  backgroundSize: "100%",
  backgroundRepeat: "no-repeat",
  dots: false,
};

export default function HomeCarousel(props) {
  const { arrImg } = useSelector((state) => state.CarouselReducer);

  const dispatch = useDispatch();

  //Sẽ tự kích hoạt khi component load ra
  useEffect(() => {
    //1 action = {type:'',data}
    //2 (phải cài middleware): callBackFunction (dispatch)

    // const action = getCarouselAction(1);

    dispatch(getCarouselAction());
  }, []);

  const renderImg = () => {
    return arrImg.map((item, index) => {
      return (
        <div key={index}>
          <div
            style={{ ...contentStyle, backgroundImage: `url(${item.hinhAnh})` }}
          >
            <img src={item.hinhAnh} className='opacity-0' alt={item.hinhAnh} />
          </div>
        </div>
      );
    });
  };

  return (
    <Carousel
      dots='true'
      effect='fade'
      style={{ width: "100%", padding: 0, margin: 0 }}
    >
      {renderImg()}
    </Carousel>
  );
}
