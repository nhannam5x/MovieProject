import React, { useEffect } from "react";
import { Button, CustomCard } from "@tsamantanis/react-glassmorphism";
import "@tsamantanis/react-glassmorphism/dist/index.css";
import "./_CircleRiting.scss";
import { Rate, Tabs } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { SET_CHI_TIET_PHIM } from "../../redux/types/QuanLyRapType";
import { layThongTinChiTietPhim } from "../../redux/actions/QuanLyRapAction/QuanLyRapAction";
import moment from "moment";
import { NavLink } from "react-router-dom";
const { TabPane } = Tabs;

export default function Detail(props) {
  const filmDetail = useSelector((state) => state.QuanLyPhimReducer.filmDetail);

  const dispatch = useDispatch();

  useEffect(() => {

    let { id } = props.match.params;
    dispatch(layThongTinChiTietPhim(id));
  });
  return (
    <div
      style={{
        backgroundImage: `url(${filmDetail.hinhAnh})`,
        backgroundSize: "100%",
        backgroundPosition: "center",
        minHeight: "100vh",
      }}
    >
      <CustomCard
        style={{ paddingTop: 150, minHeight: "100vh" }}
        effectColor='#C780FF' 
        color='#14AEFF' 
        blur={10} 
        borderRadius={0} 
      >
        <div className='grid grid-cols-12'>
          <div className='col-span-5 col-start-4'>
            <div className='grid grid-cols-3'>
              <img
                src={filmDetail.hinhAnh}
                className='col-span-1'
                style={{ width: "100%", height: 300 }}
                alt='123'
              />
              <div
                className='text-white col-span-2 ml-5'
                style={{ marginTop: "25%" }}
              >
                <p className='text-sm'>
                  {moment(filmDetail.ngayKhoiChieu).format("DD - MM - YYYY")}
                </p>
                <p className=' text-4xl'>{filmDetail.tenPhim}</p>
                <p className='font-normal'>{filmDetail.moTa}</p>
              </div>
            </div>
          </div>
          <div className='col-span-4'>
            <h1 style={{ marginLeft: "5%" }} className='text-2xl text-gray-400'>
              <Rate
                allowHalf
                value={filmDetail.danhGia / 2}
                style={{ color: "green", fontSize: 30 }}
              />
            </h1>
            <div className={`c100 p${filmDetail.danhGia * 10} big`}>
              <span>{filmDetail.danhGia * 10}%</span>
              <div className='slice'>
                <div className='bar'></div>
                <div className='fill'></div>
              </div>
            </div>
          </div>
        </div>
        <div className='mt-20 ml-72 w-2/3 container p-5 bg-white container'>
          <Tabs defaultActiveKey='1' centered>
            <TabPane tab='Lịch Chiếu' key='1' style={{ minHeight: 300 }}>
              <div>
                <Tabs tabPosition={"left"}>
                  {filmDetail.heThongRapChieu?.map((htr, index) => {
                    return (
                      <TabPane
                        tab={
                          <div>
                            <img
                              src={htr.logo}
                              className='rounded-full'
                              width='50'
                            />
                            {htr.tenHeThongRap}
                          </div>
                        }
                        key={index}
                      >
                        {htr.cumRapChieu?.map((cumRap, index) => {
                          return (
                            <div className='mt-5' key={index}>
                              <div className='flex flex-row'>
                                <img
                                  style={{ width: 60, height: 60 }}
                                  src={
                                    "https://s3img.vcdn.vn/123phim/2021/01/bhd-star-bitexco-16105952220224.png"
                                  }
                                />
                                <div className='ml-2'>
                                  <p
                                    style={{
                                      fontSize: 20,
                                      fontWeight: "bold",
                                      lineHeight: 1,
                                    }}
                                  >
                                    {cumRap.tenCumRap}
                                  </p>
                                  <p
                                    className='text-gray-400'
                                    style={{ marginTop: 0 }}
                                  >
                                    Địa chỉ :{cumRap.tenCumRap}
                                  </p>
                                </div>
                                <div className='thong-tin-lich-chieu grid grid-cols-4'>
                                  {cumRap.lichChieuPhim
                                    ?.slice(0, 12)
                                    .map((lichChieu, index) => {
                                      return (
                                        <NavLink
                                          to={`/checkout/${lichChieu.maLichChieu}`}
                                          key={index}
                                          className='col-span-1 ml-2'
                                        >
                                          {moment(
                                            lichChieu.ngayChieuGioChieu
                                          ).format("hh:mm A")}
                                        </NavLink>
                                      );
                                    })}
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </TabPane>
                    );
                  })}
                </Tabs>
              </div>
            </TabPane>

            <TabPane tab='Thông tin' key='2'>
              Thông Tin
            </TabPane>
            <TabPane tab='Đánh Giá' key='3'>
              Đánh Giá
            </TabPane>
          </Tabs>
        </div>
      </CustomCard>
    </div>
  );
}
