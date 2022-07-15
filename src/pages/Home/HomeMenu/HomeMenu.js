import React, { useState, Fragment } from "react";
import { Tabs, Radio, Space } from "antd";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import moment from "moment";
const { TabPane } = Tabs;

export default function HomeMenu(props) {
  const [state, setState] = useState({
    tabPosition: "left",
  });

  const changeTabPosition = (e) => {
    setState({ tabPosition: e.target.value });
  };
  const { tabPosition } = state;

  const { heThongRapChieu } = useSelector((state) => state.QuanLyRapReducer);

  const renderHeThongRap = () => {
    return heThongRapChieu?.map((heThongRap, index) => {
      let { tabPosition } = state;
      return (
        <TabPane
          tab={
            <img src={heThongRap.logo} className='rounded-full' width='50' />
          }
          key={index}
        >
          <Tabs tabPosition={tabPosition}>
            {heThongRap.lstCumRap?.map((cumRap, index) => {
              return (
                <TabPane
                  tab={
                    <div style={{ width: "300px", display: "flex" }}>
                      <img
                        src='https://s3img.vcdn.vn/123phim/2018/09/ddc-dong-da-15379624326697.jpg'
                        width='50'
                      />{" "}
                      <br />
                      <div className='text-left ml-2 '>
                        {cumRap.tenCumRap}
                        <p className='text-red-200'>Chi tiết</p>
                      </div>
                    </div>
                  }
                  key={index}
                >
                  {cumRap.danhSachPhim.slice(0, 4).map((phim, index) => {
                    return (
                      <Fragment key={index}>
                        <div className='my-5'>
                          <div style={{ display: "flex" }}>
                            <img
                              style={{ height: 75, width: 75 }}
                              src={phim.hinhAnh}
                              alt={phim.tenPhim}
                              onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = "https://picsum.photos/75/75";
                              }}
                            />

                            <div className='ml-2'>
                              <h1 className='text-2xl text-green-700'>
                                {phim.tenPhim}
                              </h1>
                              <p>{cumRap.diaChi}</p>
                              <div className='grid grid-cols-6 gap-6'>
                                {phim.lstLichChieuTheoPhim
                                  ?.slice(0, 12)
                                  .map((lichChieu, index) => {
                                    return (
                                      <NavLink
                                        className='text-lg text-green-400'
                                        to={`/checkout/${lichChieu.maLichChieu}`}
                                        key={index}
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
                        </div>
                        <hr />
                      </Fragment>
                    );
                  })}
                </TabPane>
              );
            })}
          </Tabs>
        </TabPane>
      );
    });
  };

  return (
    <Fragment>
      <Tabs
        className='border-separate border border-green-800 border-opacity-10'
        tabPosition={tabPosition}
      >
        {renderHeThongRap()}
      </Tabs>
    </Fragment>
  );
}
