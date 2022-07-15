import React, { Fragment, useEffect, useState } from "react";
import HomeMenu from "./HomeMenu/HomeMenu";
import { useSelector, useDispatch } from "react-redux";
import MultipleRowSlick from "../../components/ReactSlick/MultipleRowSlick";
import { layDanhSachPhimAction } from "../../redux/actions/QuanLyPhimAction/QuanLyPhimAction";
import { layDanhSachHeThongRapAction } from "../../redux/actions/QuanLyRapAction/QuanLyRapAction";
import HomeCarousel from "../../templates/HomeTemplate/Layout/Homecarousel/Homecarousel";

export default function Home(props) {
  const { arrFilms } = useSelector((state) => state.QuanLyPhimReducer);
  const dispatch = useDispatch();
  useEffect(() => {
    const action = layDanhSachPhimAction();
    dispatch(action); 
    dispatch(layDanhSachHeThongRapAction());
  }, []);
  return (
    <Fragment>
      <HomeCarousel />
      <section className='text-gray-600 body-font'>
        <div className='container px-5 py-24 mx-auto '>
          <MultipleRowSlick arrFilms={arrFilms} />
        </div>
      </section>

      <div className='mx-10'>
        <HomeMenu />
      </div>
    </Fragment>
  );
}
