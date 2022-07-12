import React, { Fragment, useEffect } from "react";
import { useState } from "react";
import { Form, Input, Radio } from "antd";
import { Select } from "antd";
import { GROUP_ID } from "../../../../util/setting";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import {
  layDanhSachNguoiDungAction,
  capNhatThongTinNguoiDungAction,
} from "../../../../redux/actions/QuanLyNguoiDungActions/QuanLyNguoiDungActions";
import "../../../../assets/scss/component/_button.scss";

const { Option } = Select;

export default function EditNguoiDung(props) {
  const [componentSize, setComponentSize] = useState("default");
  const dispatch = useDispatch();
  const { danhSachNguoiDung } = useSelector(
    (state) => state.QuanLyNguoiDungReducer
  );

  const data = danhSachNguoiDung[0];

  useEffect(() => {
    let { taiKhoan } = props.match.params;
    dispatch(layDanhSachNguoiDungAction(taiKhoan));
  }, []);

  const handleChangeLoaiNguoiDung = (values) => {
    formik.setFieldValue("maLoaiNguoiDung", values);
  };

  const formik = useFormik({
    enableReinitialize: true, // enableReinitialize  dùng để set dữ liệu mặc đinh cho formik - chỉ nên dùng cho trang edit không dùng vs những trang khác, dùng sai sẽ bị vòng lặp vô tận
    initialValues: {
      taiKhoan: data.taiKhoan,
      matKhau: data.matKhau,
      email: data.email,
      soDt: data.soDt,
      maNhom: data.maNhom,
      maLoaiNguoiDung: data.maLoaiNguoiDung,
      hoTen: data.hoTen,

      // taiKhoan: danhSachNguoiDung.taiKhoan,
      // matKhau: danhSachNguoiDung.matKhau,
      // email: danhSachNguoiDung.email,
      // soDt: danhSachNguoiDung.soDt,
      // maNhom: danhSachNguoiDung.maNhom,
      // maLoaiNguoiDung: danhSachNguoiDung.maLoaiNguoiDung,
      // hoTen: danhSachNguoiDung.hoTen,
    },
    onSubmit: (values) => {
      values.maNhom = GROUP_ID;
      //Tạo đối tượng formdata => Đưa giá trị values từ formik vào formdata
      let formData = values;
      //Cập nhật người dùng
      dispatch(capNhatThongTinNguoiDungAction(formData));
    },
  });

  const onFormLayoutChange = ({ size }) => {
    setComponentSize(size);
  };

  return (
    <Fragment>
      <Form
        onSubmitCapture={formik.handleSubmit}
        labelCol={{
          span: 5,
        }}
        wrapperCol={{
          span: 14,
        }}
        layout='horizontal'
        initialValues={{
          size: componentSize,
        }}
        onValuesChange={onFormLayoutChange}
        size={componentSize}
      >
        <h1 className='mb-5'>Chỉnh Sửa Người Dùng</h1>
        <Form.Item label='Form Size' name='size'>
          <Radio.Group>
            <Radio.Button value='small'>Small</Radio.Button>
            <Radio.Button value='default'>Default</Radio.Button>
            <Radio.Button value='large'>Large</Radio.Button>
          </Radio.Group>
        </Form.Item>
        <Form.Item label='Tài Khoản'>
          <Input
            disabled
            name='taiKhoan'
            onChange={formik.handleChange}
            value={formik.values.taiKhoan}
          />
        </Form.Item>
        <Form.Item label='Mật Khẩu'>
          <Input.Password
            name='matKhau'
            onChange={formik.handleChange}
            value={formik.values.matKhau}
          />
        </Form.Item>
        <Form.Item label='Email'>
          <Input
            name='email'
            onChange={formik.handleChange}
            value={formik.values.email}
          />
        </Form.Item>
        <Form.Item label='Họ Tên'>
          <Input
            name='hoTen'
            onChange={formik.handleChange}
            value={formik.values.hoTen}
          />
        </Form.Item>
        <Form.Item label='Số Điện Thoại'>
          <Input
            name='soDt'
            onChange={formik.handleChange}
            value={formik.values.soDt}
          />
        </Form.Item>

        <Form.Item label='Loại Người Dùng'>
          <Select
            name='maLoaiNguoiDung'
            onChange={handleChangeLoaiNguoiDung}
            style={{ width: 120 }}
          >
            <Option value='KhachHang'>Khách Hàng</Option>
            <Option value='QuanTri'>Quản Trị</Option>
          </Select>
        </Form.Item>
        <div className='text-center m-10'>
          <button className='btn__confirm' type='submit'>
            Cập nhật
          </button>
        </div>
      </Form>
    </Fragment>
  );
}
