import { baseService } from "./baseService";
import { GROUP_ID } from "../util/setting";
export class QuanLyPhimService extends baseService {
  constructor() {
    super();
  }
  layDanhSachBanner = () => {
    return this.get(`/api/QuanLyPhim/LayDanhSachBanner`);
  };

  layDanhSachPhim = (tenPhim = "") => {
    if (tenPhim.trim() != "") {
      return this.get(
        `/api/QuanLyPhim/LayDanhSachPhim?maNhom=${GROUP_ID}&tenPhim=${tenPhim}`
      );
    }
    return this.get(`/api/QuanLyPhim/LayDanhSachPhim?maNhom=${GROUP_ID}`);
  };

  themPhimUploadHinh = (formData) => {
    // formData -> thông tin của phim
    return this.post(`/api/QuanLyPhim/ThemPhimUploadHinh`, formData);
  };

  layThongTinPhim = (maPhim) => {
    return this.get(`/api/QuanLyPhim/LayThongTinPhim?MaPhim=${maPhim}`);
  };
  capNhatPhimUpload = (formData) => {
    //  formData -> thông tin của phim
    return this.post(`/api/QuanLyPhim/CapNhatPhimUpload`, formData);
  };

  xoaPhim = (maPhim) => {
    return this.delete(`/api/QuanLyPhim/XoaPhim?MaPhim=${maPhim}`);
  };
}
export const quanLyPhimService = new QuanLyPhimService();
// Nếu api có thay đổi chỉ chỉnh sửa trên file này, không sửa file CarouselActions
