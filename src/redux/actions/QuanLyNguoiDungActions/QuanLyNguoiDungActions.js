import { quanLyNguoiDungService } from "../../../services/QuanLyNguoiDungService";
import {
  DANG_NHAP_ACTION,
  SET_THONG_TIN_NGUOI_DUNG,
  SET_DANH_SACH_NGUOI_DUNG,
  SET_DANH_SACH_MA_LOAI_NGUOI_DUNG,
} from "../../types/QuanLyNguoiDungTypes";
import { history } from "../../../App";

export const dangNhapAction = (thongTinDangNhap) => {
  return async (dispatch) => {
    try {
      const result = await quanLyNguoiDungService.dangNhap(thongTinDangNhap);
      if (result.data.statusCode === 200) {
        dispatch({
          type: DANG_NHAP_ACTION,
          thongTinDangNhap: result.data.content,
        });
        history.goBack();
      }
      console.log("result", result);
    } catch (error) {
      console.log("error", error.response.data);
    }
  };
};

export const layThongTinNguoiDungAction = (thongTinDangNhap) => {
  return async (dispatch) => {
    try {
      const result = await quanLyNguoiDungService.layThongTinNguoiDung();
      if (result.data.statusCode === 200) {
        dispatch({
          type: SET_THONG_TIN_NGUOI_DUNG,
          thongTinNguoiDung: result.data.content,
        });
      }
      console.log("result", result);
    } catch (error) {
      console.log("error", error.response.data);
    }
  };
};

export const layDanhSachNguoiDungAction = (tuKhoa = "") => {
  return async (dispatch) => {
    try {
      const result = await quanLyNguoiDungService.layDanhSachNguoiDung(tuKhoa);
      console.log("Lấy Danh Sách Người Dùng Thành Công: ", result);
      dispatch({
        type: SET_DANH_SACH_NGUOI_DUNG,
        danhSachNguoiDung: result.data.content,
      });
    } catch (errors) {
      console.log("Lấy danh sách người dùng thất bại: ", errors.response.data);
    }
  };
};

export const layDanhSachMaLoaiNguoiDungAction = () => {
  return async (dispatch) => {
    try {
      const result = await quanLyNguoiDungService.layDanhSachLoaiNguoiDung();
      console.log("Lấy Danh Sách Loại Người Dùng Thành Công: ", result);
      dispatch({
        type: SET_DANH_SACH_MA_LOAI_NGUOI_DUNG,
        danhSachMaLoaiNguoiDung: result.data.content,
      });
    } catch (errors) {
      console.log(
        "Lấy danh sách loại người dùng thất bại: ",
        errors.response.data
      );
    }
  };
};

export const themNguoiDungAction = (formData) => {
  return async (dispatch) => {
    try {
      let result = await quanLyNguoiDungService.themNguoiDung(formData);
      console.log("Thêm người dùng thành công: ", result);
      alert("Thêm người dùng thành công!");
      history.push("/admin/quanlynguoidung");
    } catch (errors) {
      console.log("Thêm người dùng thất bại: ", errors.response.data);
    }
  };
};

export const xoaNguoiDungAction = (taiKhoan) => {
  return async (dispatch) => {
    try {
      let result = await quanLyNguoiDungService.xoaNguoiDung(taiKhoan);
      alert("Xóa người dùng thành công!");
      console.log("Xóa người dùng thành công: ", result.data.content);
      dispatch(layDanhSachNguoiDungAction());
    } catch (errors) {
      console.log("Xóa người dùng thất bại!", errors.respons?.data);
    }
  };
};

export const capNhatThongTinNguoiDungAction = (formData) => {
  return async (dispatch) => {
    try {
      const result = await quanLyNguoiDungService.capNhatThongTinNguoiDung(
        formData
      );
      console.log(
        "Cập nhật thông tin người dùng thành công: ",
        result.data.content
      );
      alert("Cập Nhật Thành Công");
    } catch (errors) {
      console.log(
        "Cập nhật thông tin người dùng thất bại: ",
        errors.response.data
      );
    }
  };
};
