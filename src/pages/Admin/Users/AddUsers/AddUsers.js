import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useFormik } from "formik";
import { Form, Input, Radio } from "antd";
import "./_AddUsers.scss";
import { Fragment } from "react";
import { GROUP_ID } from "../../../../util/setting";
import * as Yup from "yup";
import { Select } from "antd";
import { themNguoiDungAction } from "../../../../redux/actions/QuanLyNguoiDungActions/QuanLyNguoiDungActions";
const { Option } = Select;

export default function AddUsers(props) {
  const [componentSize, setComponentSize] = useState("default");
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      taiKhoan: "",
      hoTen: "",
      email: "",
      soDt: "",
      matKhau: "",
      maLoaiNguoiDung: "",
    },
    validationSchema: Yup.object({
      taiKhoan: Yup.string().required("Tài khoản không được bỏ trống!"),
      hoTen: Yup.string().required("Họ tên không được bỏ trống!"),
      email: Yup.string()
        .required("Email không được bỏ trống!")
        .matches(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
          "Email không đúng định dạng(example@gmail.com)"
        ),
      soDt: Yup.string()
        .required("Số điện thoại không được bỏ trống!")
        .matches(
          /((09|03|07|08|05)+([0-9]{8})\b)/g,
          "Số điện thoại không đúng định dạng!"
        ),
      matKhau: Yup.string()
        .required("Mật khẩu không được bỏ trống!")
        .matches(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
          "Mật khẩu phải có 8 ký tự bao gồm một chữ cái viết hoa, một ký tự đặc biệt và ký tự chữ và số!"
        ),
    }),
    onSubmit: (values) => {
      values.maNhom = GROUP_ID;
      let formData = values;
      dispatch(themNguoiDungAction(formData));
    },
  });

  const handleChangeLoaiNguoiDung = (value) => {
    formik.setFieldValue("maLoaiNguoiDung", value);
    console.log("Loại người dùng: ", value);
  };

  const onFormLayoutChange = ({ size }) => {
    setComponentSize(size);
  };

  return (
    <Fragment>
      <h3 className='text-3xl'>Thêm Người Dùng</h3>
      <Form
        onSubmitCapture={formik.handleSubmit}
        labelCol={{
          span: 4,
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
        <Form.Item label='Form Size' name='size' labelAlign='left'>
          <Radio.Group>
            <Radio.Button value='small'>Small</Radio.Button>
            <Radio.Button value='default'>Default</Radio.Button>
            <Radio.Button value='large'>Large</Radio.Button>
          </Radio.Group>
        </Form.Item>
        <Form.Item label='Tài khoản: ' labelAlign='left'>
          <Input
            name='taiKhoan'
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.taiKhoan && formik.errors.taiKhoan ? (
            <div style={{ color: "#fa0000" }}>{formik.errors.taiKhoan}</div>
          ) : null}
        </Form.Item>
        <Form.Item label='Tên Người Dùng: ' labelAlign='left'>
          <Input
            name='hoTen'
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.hoTen && formik.errors.hoTen ? (
            <div style={{ color: "#fa0000" }}>{formik.errors.hoTen}</div>
          ) : null}
        </Form.Item>
        <Form.Item label='Email' labelAlign='left'>
          <Input
            name='email'
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.email && formik.errors.email ? (
            <div style={{ color: "#fa0000" }}>{formik.errors.email}</div>
          ) : null}
        </Form.Item>
        <Form.Item label='Số điện thoại: ' labelAlign='left'>
          <Input
            name='soDt'
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.soDt && formik.errors.soDt ? (
            <div style={{ color: "#fa0000" }}>{formik.errors.soDt}</div>
          ) : null}
        </Form.Item>
        <Form.Item label='Mật khẩu: ' labelAlign='left'>
          <Input.Password
            name='matKhau'
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.matKhau && formik.errors.matKhau ? (
            <div style={{ color: "#fa0000" }}>{formik.errors.matKhau}</div>
          ) : null}
        </Form.Item>
        <Form.Item label='Loại Người Dùng' labelAlign='left'>
          <Select name='maLoaiNguoiDung' onChange={handleChangeLoaiNguoiDung}>
            <Option value='KhachHang'>Khách Hàng</Option>
            <Option value='QuanTri'>Quản Trị</Option>
          </Select>
        </Form.Item>
        <button type='submit' className='btn__themnguoiDung'>
          Thêm Người Dùng
        </button>
      </Form>
    </Fragment>
  );
}
