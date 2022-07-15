import { quanLyPhimService } from "../../../services/QuanLyPhimService";
import {
  SET_DANH_SACH_PHIM,
  SET_THONG_TIN_PHIM,
} from "../../types/QuanLyPhimType";
export const layDanhSachPhimAction = (tenPhim = "", maPhim = "") => {
  return async (dispatch) => {
    try {
      const result = await quanLyPhimService.layDanhSachPhim(tenPhim);
      dispatch({
        type: SET_DANH_SACH_PHIM,
        arrFilms: result.data.content,
      });
    } catch (errors) {
      console.log("errors", errors);
    }
  };
};

export const themPhimUpLoadHinhAction = (formData) => {
  return async (dispatch) => {
    try {
      let result = await quanLyPhimService.themPhimUploadHinh(formData);
      alert("Thêm phim thành công!");
      console.log("Thêm phim thành công:", result.data.content);
    } catch (errors) {
      alert("Thêm phim thất bại!");
      console.log("Thêm phim thất bại:", errors.response?.data);
    }
  };
};

export const capNhatPhimUploadAction = (formData) => {
  return async (dispatch) => {
    try {
      let result = await quanLyPhimService.capNhatPhimUpload(formData);
      alert("Cập nhật phim thành công!");
      console.log("result", result.data.content);
    } catch (errors) {
      console.log(errors.response?.data);
    }
  };
};

export const layThongTinPhimAction = (maPhim) => {
  return async (dispatch) => {
    try {
      let result = await quanLyPhimService.layThongTinPhim(maPhim);
      console.log("result", result.data.content);
      dispatch({
        type: SET_THONG_TIN_PHIM,
        thongTinPhim: result.data.content,
      });
    } catch (errors) {
      console.log("errors", errors.response?.data);
    }
  };
};

export const xoaPhimAction = (maPhim) => {
  return async (dispatch) => {
    try {
      const result = await quanLyPhimService.xoaPhim(maPhim);
      console.log("result", result.data.content);
      alert("Xoá phim thành công !");
      dispatch(layDanhSachPhimAction());
    } catch (errors) {
      console.log("errors", errors.response?.data);
    }
  };
};
