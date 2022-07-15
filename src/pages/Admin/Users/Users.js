import React, { Fragment, useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { debounce } from "lodash";
import { Table, Button } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { layDanhSachNguoiDungAction } from "../../../redux/actions/QuanLyNguoiDungActions/QuanLyNguoiDungActions";
import { Input } from "antd";
import { NavLink } from "react-router-dom";
import { history } from "../../../App";
const { Search } = Input;
export default function Users(props) {
  // Lấy arrUsers từ QuanLyNguoiDungReducer
  const { danhSachNguoiDung } = useSelector(
    (state) => state.QuanLyNguoiDungReducer
  );
  const [keyword, setKeyword] = useState("");

  useEffect(() => {
    dispatch(layDanhSachNguoiDungAction());
  }, []);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(layDanhSachNguoiDungAction());
  }, []);

  const columns = [
    {
      title: "STT",
      dataIndex: "stt",
      key: "stt",
      with: "10%",
      defaultSortOrder: "ascend",
      sorter: (a, b) => {
        let sttA = a.stt,
          sttB = b.stt;
        if (sttA > sttB) {
          return 1;
        }
        return -1;
      },
    },
    {
      title: "Tài Khoản",
      dataIndex: "taiKhoan",
      key: "taiKhoan",
      defaultSortOrder: "descend",
      sorter: (a, b) => {
        let taiKhoanA = a.taiKhoan.toLowerCase().trim(),
          taiKhoanB = b.taiKhoan.toLowerCase().trim();
        if (taiKhoanA > taiKhoanB) {
          return 1;
        }
        return -1;
      },
      sortDirections: ["descend", "ascend"],
      with: "10%",
    },
    {
      title: "Họ Tên",
      dataIndex: "hoTen",
      key: "hoTen",
      sorter: (a, b) => {
        let hoTenA = a.hoTen.toLowerCase().trim(),
          hoTenB = b.hoTen.toLowerCase().trim();
        if (hoTenA > hoTenB) {
          return 1;
        }
        return -1;
      },
      sortDirections: ["descend", "ascend"],
      with: "15%",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      with: "20%",
    },
    {
      title: "Số Điện Thoại",
      dataIndex: "soDt",
      key: "soDt",
      with: "15%",
    },
    {
      title: "Loại Người Dùng",
      dataIndex: "maLoaiNguoiDung",
      key: "maLoaiNguoiDung",
      sorter: (a, b) => {
        let maLoaiNguoiDungA = a.maLoaiNguoiDung.toLowerCase().trim(),
          maLoaiNguoiDungB = b.maLoaiNguoiDung.toLowerCase().trim();
        if (maLoaiNguoiDungA > maLoaiNguoiDungB) {
          return 1;
        }
        return -1;
      },
      sortDirections: ["descend", "ascend"],
      with: "10%",
    },
    {
      title: "Quản Lý Người Dùng",
      dataIndex: "quanLyNguoiDung",
      key: "quanLyNguoiDung",
      render: (text, nguoiDung) => {
        return (
          <Fragment>
            <div className='flex item-center justify-center text-[16px]'>
              <NavLink
                key={1}
                className='w-4 mr-3 transform text-blue-500 hover:text-purple-500 hover:scale-110 '
                to={`/admin/users/editusers/${nguoiDung.taiKhoan}`}
              >
                <EditOutlined />
              </NavLink>
              <span
                className='w-4 mr-3 transform text-red-500 hover:text-purple-500 hover:scale-110'
              >
                <DeleteOutlined />
              </span>
            </div>
          </Fragment>
        );
      },
      width: "20%",
      align: "center",
    },
  ];

  const createData = (danhSachNguoiDung) => {
    const data = [];
    for (let index = 0; index < danhSachNguoiDung.length; index++) {
      const element = danhSachNguoiDung[index];
      data.push({
        stt: index + 1,
        hoTen: element.hoTen,
        taiKhoan: element.taiKhoan,
        email: element.email,
        soDt: element.soDt,
        maLoaiNguoiDung: element.maLoaiNguoiDung,
      });
    }
    return data;
  };
  const data = createData(danhSachNguoiDung);

  function onChange(pagination, filters, sorter, extra) {
    console.log("params", pagination, filters, sorter, extra);
  }

  function fetchSearchOptions(value) {
    dispatch(layDanhSachNguoiDungAction(value));
  }

  const debounceSearch = useRef(
    debounce((nextValue) => fetchSearchOptions(nextValue), 50)
  ).current;

  function handleInputOnchange(event) {
    const { value } = event.target;
    setKeyword(value);
    debounceSearch(value);
  }

  return (
    <div className='container'>
      <h3 className='capitalize text-3xl'>Quản Người Dùng</h3>
      <div className='flex mb-5'>
        <Button
          className='mr-3 font-semibold'
          onClick={() => {
            history.push("/admin/users/addusers");
          }}
        >
          Thêm người dùng
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
        rowKey='maNguoiDung'
      />
    </div>
  );
}
