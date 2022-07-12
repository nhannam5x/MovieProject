import React, { Fragment, useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { debounce } from "lodash";
import { Button, Table } from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  CalendarOutlined,
} from "@ant-design/icons";
import "./_Film.scss";
import {
  layDanhSachPhimAction,
  xoaPhimAction,
} from "../../../redux/actions/QuanLyPhimAction/QuanLyPhimAction";
import { NavLink } from "react-router-dom";
import { history } from "../../../App";
import { Input } from "antd";
const { Search } = Input;

export default function Films(props) {
  // Lấy arrFilms từ QuanLyPhimReducer
  const { arrFilmsDefault } = useSelector((state) => state.QuanLyPhimReducer);
  const dispatch = useDispatch();
  const data = arrFilmsDefault;
  const [keyword, setKeyword] = useState("");
  // Dùng useEffect để fect lại lần nữa tránh trường hợp người dùng đăng nhập không có dữ liệu
  useEffect(() => {
    dispatch(layDanhSachPhimAction());
  }, []);

  // Table
  const columns = [
    {
      title: "Mã Phim",
      dataIndex: "maPhim",
      key: "maPhim",
      sorter: (a, b) => a.maPhim - b.maPhim,
      defaultSortOrder: "descend", //  Sắp xếp từ dưới lên trên đểm khi thêm phim mới sẽ nằm ở trên
      width: "10%",
      align: "center",
    },
    {
      title: "Hình Ảnh",
      dataIndex: "hinhAnh",
      key: "hinhAnh",
      defaultSortOrder: "descend",
      render: (text, phim, index) => {
        return (
          <Fragment>
            <img
              src={phim.hinhAnh}
              alt={phim.tenPhim}
              style={{ width: "auto", height: "40%" }}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = `https://picsum.photos/id/${index}/50/50`;
              }}
            />
          </Fragment>
        );
      },
      width: "10%",
    },
    {
      title: "Tên Phim",
      dataIndex: "tenPhim",
      key: "tenPhim",
      sorter: (a, b) => {
        let tenPhimA = a.tenPhim.toLowerCase().trim(),
          tenPhimB = b.tenPhim.toLowerCase().trim();
        if (tenPhimA > tenPhimB) {
          return 1;
        }
        return -1;
      },
      sortDirections: ["descend", "ascend"],
      width: "15%",
      align: "center",
    },
    {
      title: "Mô Tả",
      dataIndex: "moTa",
      key: "moTa",
      render: (text, film) => {
        return (
          <Fragment>
            {film.moTa.length > 100
              ? film.moTa.substr(0, 200) + " ..."
              : film.moTa}
          </Fragment>
        );
      },
      width: "45%",
    },
    {
      title: "Quản Lý Phim",
      dataIndex: "quanLyPhim",
      key: "quanLyPhim",
      render: (text, film) => {
        return (
          <Fragment>
            <div className='flex item-center justify-center text-[16px]'>
              {/* Dùng 2 thẻ đồng cấp thêm key vào để không warning */}
              <NavLink
                key={1}
                className='w-4 mr-3 transform text-blue-500 hover:text-purple-500 hover:scale-110 '
                to={`/admin/films/edit/${film.maPhim}`}
              >
                <EditOutlined />
              </NavLink>
              <span
                // key={2}
                className='w-4 mr-3 transform text-red-500 hover:text-purple-500 hover:scale-110'
                onClick={() => {
                  // Gọi action xoá
                  if (
                    window.confirm("Bạn có chắc muốn xoá phim " + film.tenPhim)
                  ) {
                    // Sau khi confirm gọi action xoá
                    dispatch(xoaPhimAction(film.maPhim));
                  }
                }}
              >
                <DeleteOutlined />
              </span>
              <NavLink
                key={2}
                className='w-4 transform text-green-500 hover:text-purple-500 hover:scale-110'
                to={`/admin/films/showtime/${film.maPhim}/${film.tenPhim}`}
              >
                <CalendarOutlined />
              </NavLink>
            </div>
          </Fragment>
        );
      },
      width: "25%",
      align: "center",
    },
  ];

  function onChange(pagination, filters, sorter, extra) {
    console.log("params", pagination, filters, sorter, extra);
  }

  //  Debound search
  function fetchSearchOptions(value) {
    dispatch(layDanhSachPhimAction(value));
  }

  const debounceSearch = useRef(
    debounce((nextValue) => fetchSearchOptions(nextValue), 50)
  ).current;

  function handleInputOnchange(event) {
    const { value } = event.target;
    setKeyword(value);
    debounceSearch(value);
  }
  // End Debound search

  return (
    <div className='container'>
      <h3 className='capitalize text-3xl'>Quản lý phim</h3>
      <div className='flex mb-5'>
        <Button
          className='mr-3 font-semibold'
          onClick={() => {
            history.push("/admin/films/addnew");
          }}
        >
          Thêm phim
        </Button>
        <Search
          placeholder='Nhập thông tin cần tìm...'
          enterButton
          style={{ width: "50%" }}
          onChange={handleInputOnchange}
        />
      </div>
      <Table
        columns={columns}
        dataSource={data}
        onChange={onChange}
        rowKey='maPhim'
      />
    </div>
  );
}
