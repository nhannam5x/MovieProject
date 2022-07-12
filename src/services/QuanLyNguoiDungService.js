import { baseService } from "./baseService";
import { GROUP_ID } from "../util/setting";
export class QuanLyNguoiDungService extends baseService {
  constructor() {
    super();
  }
  dangNhap = (thongTinDangNhap) => {
    // (thongTinDangNhap) => {taiKhoan:'', matKhau:"}
    return this.post(`/api/QuanLyNguoiDung/DangNhap`, thongTinDangNhap);
  };
  layThongTinNguoiDung = () => {
    return this.post(`/api/QuanLyNguoiDung/ThongTinTaiKhoan`);
  };
  layDanhSachNguoiDung = (tuKhoa = "") => {
    if (tuKhoa != "") {
      return this.get(
        `api/QuanLyNguoiDung/LayDanhSachNguoiDung?MaNhom=${GROUP_ID}&tuKhoa=${tuKhoa}`
      );
    }
    return this.get(
      `api/QuanLyNguoiDung/LayDanhSachNguoiDung?MaNhom=${GROUP_ID}`
    );
  };
  layDanhSachLoaiNguoiDung = () => {
    return this.get(`api/QuanLyNguoiDung/LayDanhSachLoaiNguoiDung`);
  };
  themNguoiDung = (formData) => {
    return this.post(`api/QuanLyNguoiDung/ThemNguoiDung`, formData);
  };
  xoaNguoiDung = (taiKhoan) => {
    return this.delete(`api/QuanLyNguoiDung/XoaNguoiDung?TaiKhoan=${taiKhoan}`);
  };
  capNhatThongTinNguoiDung = (formData) => {
    return this.post(`api/QuanLyNguoiDung/CapNhatThongTinNguoiDung`, formData);
  };
}
export const quanLyNguoiDungService = new QuanLyNguoiDungService();
// Nếu api có thay đổi chỉ chỉnh sửa trên file này, không sửa file CarouselActions
