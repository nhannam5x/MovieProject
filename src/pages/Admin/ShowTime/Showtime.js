import { Fragment, useEffect, useState } from "react";
import { Form, Select } from "antd";
import { DatePicker } from "antd";
import { InputNumber } from "antd";
import { quanLyRapService } from "../../../services/QuanLyRapService";
import { quanLyDatVeService } from "../../../services/QuanLyDatVeServices";
import { useFormik } from "formik";
import moment from "moment";
import * as Yup from "yup";
// import { quanLyDatVeService } from "../../../services/QuanLyDatVeServices";
export default function ShowTime(props) {
  const formik = useFormik({
    initialValues: {
      maPhim: props.match.params.id,
      ngayChieuGioChieu: "",
      maRap: "",
      giaVe: "",
    },
    validationSchema: Yup.object({
      giaVe: Yup.string().required("Giá vé không được bỏ trống!"),
    }),
    onSubmit: async (values) => {
      console.log("values", values);
      try {
        const result = await quanLyDatVeService.taoLichChieu(values);
        alert("Tạo lịch chiếu thành công: ", result.data.content);
      } catch (errors) {
        console.log("Tạo lịch chiếu thất bại: ", errors.response?.data);
      }
    },
  });

  const [state, setState] = useState({
    heThongRapChieu: [],
    cumRapChieu: [],
    // Đặt 2 state chung vs nhau để khi setState từng cái thì cái kia không chạy lại (performan)
  });
  // console.log("result", state.heThongRapChieu);

  // Lấy hệ thống rạp
  useEffect(async () => {
    try {
      let result = await quanLyRapService.layThongTinHeThongRap(); // gọi api
      console.log("Hệ thống rạp: ", result.data.content);
      setState({
        ...state, // giữ lại state cũ
        heThongRapChieu: result.data.content,
      });
    } catch (errors) {
      console.log(
        "Lấy thông tin hệ thống rạp thất bại: ",
        errors.response?.data
      );
    }
  }, []);

  const handleChangeHeThongRap = async (value) => {
    // Từ hệ thống rạp lấy thông tin rạp
    try {
      let result = await quanLyRapService.layThongTinCumRap(value);
      console.log("Cụm rạp: ", result.data.content);
      // Gán giá trị cụm rạp vào state.cumRap
      setState({
        ...state,
        cumRapChieu: result.data.content,
      });
    } catch (errors) {
      console.log("Lấy thông tin cụm rạp thất bại: ", errors.response?.data);
    }
  };

  const handleChangeCumRap = (value) => {
    formik.setFieldValue("maRap", value);
  };

  const onOk = (values) => {
    formik.setFieldValue(
      "ngayChieuGioChieu",
      moment(values).format("DD/MM/YYYY hh:mm:ss")
    );
    console.log(
      "Ngày chiếu giờ chiếu: ",
      moment(values).format("DD/MM/YYYY hh:mm:ss")
    );
  };

  const onChangeDate = (values) => {
    formik.setFieldValue(
      "ngayChieuGioChieu",
      moment(values).format("DD/MM/YYYY hh:mm:ss")
    );
    console.log(
      "Ngày chiếu giờ chiếu: ",
      moment(values).format("DD/MM/YYYY hh:mm:ss")
    );
  };

  const handleChangeInputNumber = (value) => {
    formik.setFieldValue("giaVe", value);
  };

  // Hàm lấy thông tin hệ thống rạp
  const convertSelectHTR = () => {
    // state.heThongRapChieu?.map((htr, index) => ({ label: htr.tenHeThongRap, value: htr.tenHeThongRap }))
    return state.heThongRapChieu?.map((htr, index) => {
      return { label: htr.tenHeThongRap, value: htr.maHeThongRap };
    });
  };

  // Hàm lấy thông tin cụm rạp từ hệ thống rạp. Sau khi chọn hệ thống rạp từ hàm convertSelectHTR sẽ chạy vào hàm này để lấy thông tin cụm rạp
  const getCumRap = () => {
    return state.cumRapChieu?.map((cumRap, index) => {
      return { label: cumRap.tenCumRap, value: cumRap.maCumRap };
    });
  };

  return (
    <Fragment>
      <h3 className='text-3xl mb-14'>
        {" "}
        Tạo Lịch Chiếu - Tên Phim: {props.match.params.tenphim}
      </h3>
      <Form
        name='basic'
        labelCol={{
          span: 4,
        }}
        wrapperCol={{
          span: 16,
        }}
        initialValues={{
          remember: true,
        }}
        onSubmitCapture={formik.handleSubmit}
      >
        <Form.Item label='Hệ thống rạp' labelAlign='left'>
          <Select
            placeholder='Chọn hệ thống rạp'
            labelAlign='left'
            onChange={handleChangeHeThongRap}
            options={convertSelectHTR()}
          />
        </Form.Item>

        <Form.Item label='Cụm rạp' labelAlign='left'>
          <Select
            placeholder='Chọn cụm rạp'
            onChange={handleChangeCumRap}
            options={getCumRap()}
          />
        </Form.Item>

        <Form.Item label='Ngày chiếu giờ chiếu' labelAlign='left'>
          <DatePicker
            placeholder='Ngày chiếu giờ chiếu'
            showTime
            format='DD/MM/YYYY hh:mm:ss'
            onChange={onChangeDate}
            onOk={onOk}
          />
        </Form.Item>

        <Form.Item label='Giá vé' labelAlign='left'>
          <InputNumber
            name='giaVe'
            min={75000}
            max={150000}
            formatter={(value) =>
              `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            }
            parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
            onChange={handleChangeInputNumber}
            onBlur={formik.handleBlur}
          />
          {formik.touched.giaVe && formik.errors.giaVe ? (
            <div style={{ color: "#fa0000" }}>{formik.errors.giaVe}</div>
          ) : null}
        </Form.Item>

        <button type='submit' className='btn__themPhim'>
          Thêm lịch chiếu
        </button>
      </Form>
    </Fragment>
  );
}
