import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import { Form, Input, Radio, DatePicker, InputNumber, Switch } from "antd";
import "./_Edit.scss";
import moment from "moment";
import { GROUP_ID } from "../../../../util/setting";
import {
  capNhatPhimUploadAction,
  layThongTinPhimAction,
} from "../../../../redux/actions/QuanLyPhimAction/QuanLyPhimAction";
import * as Yup from "yup";

export default function EditFilm(props) {
  const [componentSize, setComponentSize] = useState("default");
  const { thongTinPhim } = useSelector((state) => state.QuanLyPhimReducer);
  const [imgSrc, setImgSrc] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    let { id } = props.match.params;
    dispatch(layThongTinPhimAction(id));
  }, []);

  const formik = useFormik({
    enableReinitialize: true, 
    initialValues: {
      maPhim: thongTinPhim.maPhim, 
      tenPhim: thongTinPhim.tenPhim,
      trailer: thongTinPhim.trailer,
      moTa: thongTinPhim.moTa,
      ngayKhoiChieu: thongTinPhim.ngayKhoiChieu,
      dangChieu: thongTinPhim.dangChieu,
      sapChieu: thongTinPhim.sapChieu,
      hot: thongTinPhim.hot,
      danhGia: thongTinPhim.danhGia,
      hinhAnh: null, 
      maNhom: GROUP_ID,
    },
    validationSchema: Yup.object({
      tenPhim: Yup.string().required("Tên phim không được bỏ trống!"),
      trailer: Yup.string()
        .required("Trailer không được bỏ trống!")
        .matches(
          /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
          "Url không đúng định dạng!"
        ),
      moTa: Yup.string().required("Mô tả không được bỏ trống!"),
      danhGia: Yup.string()
        .required("Đánh giá không được bỏ trống!")
        .nullable(),
      ngayKhoiChieu: Yup.string().required(
        "Ngày khởi chiếu không được bỏ trống!"
      ),
    }),
    onSubmit: (values) => {
      console.log("Phim Cập Nhật", values);
      let formData = new FormData();
      for (let key in values) {
        if (key !== "hinhAnh") {
          formData.append(key, values[key]);
        } else {
          if (values.hinhAnh !== null) {
            formData.append("File", values.hinhAnh, values.hinhAnh.name);
          }
        }
      }

      dispatch(capNhatPhimUploadAction(formData));
    },
  });
  const handleChangeDatePicker = (value) => {
    let ngayKhoiChieu = moment(value);
    formik.setFieldValue("ngayKhoiChieu", ngayKhoiChieu);
  };

   const handleChangeSwitch = (name) => {
    return (value) => {
      formik.setFieldValue(name, value);
    };
  };

  const handleChangeRating = (name) => {
    return (value) => {
      formik.setFieldValue(name, value);
    };
  };

  const handleChangeFile = (event) => {
    let file = event.target.files[0];
    if (
      file.type === "image/jpeg" ||
      file.type === "image/jpg" ||
      file.type === "image/gif" ||
      file.type === "image/png"
    ) {
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (event) => {
        setImgSrc(event.target.result);
      };
      formik.setFieldValue("hinhAnh", file);
    }
  };

  const onFormLayoutChange = ({ size }) => {
    setComponentSize(size);
  };

  return (
    <>
      <h3 className='text-3xl'>Cập Nhật Phim</h3>
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
        <Form.Item label='Tên Phim' labelAlign='left'>
          <Input
            name='tenPhim'
            value={formik.values.tenPhim}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.tenPhim && formik.errors.tenPhim ? (
            <div style={{ color: "#fa0000" }}>{formik.errors.tenPhim}</div>
          ) : null}
        </Form.Item>
        <Form.Item label='Trailer' labelAlign='left'>
          <Input
            name='trailer'
            value={formik.values.trailer}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.trailer && formik.errors.trailer ? (
            <div style={{ color: "#fa0000" }}>{formik.errors.trailer}</div>
          ) : null}
        </Form.Item>
        <Form.Item label='Mô Tả' labelAlign='left'>
          <Input
            name='moTa'
            value={formik.values.moTa}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.moTa && formik.errors.moTa ? (
            <div style={{ color: "#fa0000" }}>{formik.errors.moTa}</div>
          ) : null}
        </Form.Item>
        <Form.Item
          label='Ngày Khởi Chiếu'
          name='ngayKhoiChieu'
          labelAlign='left'
        >
          <DatePicker
            onChange={handleChangeDatePicker}
            format={"DD/MM/YYYY"}
            value={moment(formik.values.ngayKhoiChieu)}
            onBlur={formik.handleBlur}
          />
          {formik.touched.ngayKhoiChieu && formik.errors.ngayKhoiChieu ? (
            <div style={{ color: "#fa0000" }}>
              {formik.errors.ngayKhoiChieu}
            </div>
          ) : null}
        </Form.Item>
        <Form.Item label='Đang Chiếu' name='dangChieu' labelAlign='left'>
          <Switch
            onChange={handleChangeSwitch("dangChieu")}
            checked={formik.values.dangChieu}
          />
        </Form.Item>
        <Form.Item label='Sắp Chiếu' name='sapChieu' labelAlign='left'>
          <Switch
            onChange={handleChangeSwitch("sapChieu")}
            checked={formik.values.sapChieu}
          />
        </Form.Item>
        <Form.Item label='Hot' name='hot' labelAlign='left'>
          <Switch
            onChange={handleChangeSwitch("hot")}
            checked={formik.values.hot}
          />
        </Form.Item>
        <Form.Item label='Đánh Giá' labelAlign='left'>
          <InputNumber
            name='danhGia'
            value={formik.values.danhGia}
            onChange={handleChangeRating("danhGia")}
            onBlur={formik.handleBlur}
            min={1}
            max={10}
          />
          {formik.touched.danhGia && formik.errors.danhGia ? (
            <div style={{ color: "#fa0000" }}>{formik.errors.danhGia}</div>
          ) : null}
        </Form.Item>
        <Form.Item label='Hình Ảnh' labelAlign='left'>
          <div className='flex'>
            <input
              name='hinhAnh'
              type='file'
              onChange={handleChangeFile}
              accept='image/png,image/jpeg,image/gif,image/jpg'
            />
            <img
              src={imgSrc === "" ? thongTinPhim.hinhAnh : imgSrc}
              alt='...'
              width='150px'
              height='150px'
            />
          </div>
        </Form.Item>
        <button type='submit' className='.btn__chinhsua'>
          Cập Nhật
        </button>
      </Form>
    </>
  );
}
