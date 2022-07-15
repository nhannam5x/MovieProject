import { ACCESS_TOKEN, USER_LOGIN } from "../../../util/setting";
import {
  DANG_NHAP_ACTION,
  SET_THONG_TIN_NGUOI_DUNG,
  SET_DANH_SACH_NGUOI_DUNG,
  SET_DANH_SACH_MA_LOAI_NGUOI_DUNG,
} from "../../types/QuanLyNguoiDungTypes";

let user = {};
if (localStorage.getItem(USER_LOGIN)) {
  user = JSON.parse(localStorage.getItem(USER_LOGIN));
}

const stateDefault = {
  userLogin: user,
  thongTinNguoiDung: {},
  thongTinDangKy: {},
  danhSachNguoiDung: {},
  danhSachMaLoaiNguoiDung: {},
};

export const QuanLyNguoiDungReducer = (state = stateDefault, action) => {
  switch (action.type) {
    case DANG_NHAP_ACTION: {
      const { thongTinDangNhap } = action; 
      localStorage.setItem(USER_LOGIN, JSON.stringify(thongTinDangNhap)); 
      localStorage.setItem(ACCESS_TOKEN, thongTinDangNhap.accessToken);
      return { ...state, userLogin: thongTinDangNhap };
    }

    case SET_THONG_TIN_NGUOI_DUNG: {
      state.thongTinNguoiDung = action.thongTinNguoiDung;
      return { ...state };
    }

    case SET_DANH_SACH_NGUOI_DUNG: {
      state.danhSachNguoiDung = action.danhSachNguoiDung;
      return { ...state };
    }
    case SET_DANH_SACH_MA_LOAI_NGUOI_DUNG: {
      state.danhSachMaLoaiNguoiDung = action.danhSachMaLoaiNguoiDung;
      return { ...state };
    }

    default:
      return { ...state };
  }
};
