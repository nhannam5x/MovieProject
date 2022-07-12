import {
  SET_DANH_SACH_PHIM,
  SET_PHIM_DANG_CHIEU,
  SET_PHIM_SAP_CHIEU,
  SET_THONG_TIN_PHIM,
} from "../../types/QuanLyPhimType";
import { SET_CHI_TIET_PHIM } from "../../types/QuanLyRapType";

const stateDefault = {
  arrFilms: [
    {
      maPhim: 1316,
      tenPhim: "Lừa Đểu Gặp Lừa Đảo  ",
      biDanh: "lua-deu-gap-lua-dao",
      trailer: "https://www.youtube.com/embed/T36HGZagV5w",
      hinhAnh:
        "http://movieapi.cyberlearn.vn/hinhanh/lua-deu-gap-lua-dao_gp03.jpg",
      moTa: 'Lừa Đểu Gặp Lừa Đảo xoay quanh lần gặp gỡ "oan gia" giữa siêu lừa đảo Tower cùng cô nàng bị lừa tình Ina, cả 2 sẽ cùng hợp tác trong phi vụ "lừa lại tên lừa đểu" Petch - tên bạn trai bội bạc của Ina bằng những chiêu trò lừa đảo không hồi kết.',
      maNhom: "GP03",
      ngayKhoiChieu: "2021-06-23T00:00:00",
      danhGia: 10,
      hot: true,
      dangChieu: false,
      sapChieu: true,
    },
    {
      maPhim: 1317,
      tenPhim: "Lừa Đểu Gặp Lừa Đảo  ",
      biDanh: "lua-deu-gap-lua-dao",
      trailer: "https://www.youtube.com/embed/T36HGZagV5w",
      hinhAnh:
        "http://movieapi.cyberlearn.vn/hinhanh/lua-deu-gap-lua-dao_gp03.jpg",
      moTa: 'Lừa Đểu Gặp Lừa Đảo xoay quanh lần gặp gỡ "oan gia" giữa siêu lừa đảo Tower cùng cô nàng bị lừa tình Ina, cả 2 sẽ cùng hợp tác trong phi vụ "lừa lại tên lừa đểu" Petch - tên bạn trai bội bạc của Ina bằng những chiêu trò lừa đảo không hồi kết.',
      maNhom: "GP03",
      ngayKhoiChieu: "2021-06-23T00:00:00",
      danhGia: 10,
      hot: true,
      dangChieu: false,
      sapChieu: true,
    },
  ],
  dangChieu: true,
  sapChieu: true,
  arrFilmsDefault: [], // Tạo mảng để copy dữ liệu từ api sau lần gọi đầu tiền
  filmDetail: {},
  thongTinPhim: {},
};

export const QuanLyPhimReducer = (state = stateDefault, action) => {
  switch (action.type) {
    case SET_DANH_SACH_PHIM: {
      state.arrFilms = action.arrFilms;
      state.arrFilmsDefault = state.arrFilms; //  Gán mảng arrFilmsDefault = arrFilms (arrFilms là dữ liệu lần đầu tiên api trả về)

      return { ...state };
    }

    case SET_PHIM_DANG_CHIEU: {
      state.dangChieu = !state.dangChieu;
      // Filter trên arrFilmsDefault, không filter trên arrFilms
      state.arrFilms = state.arrFilmsDefault.filter(
        (film) => film.dangChieu === state.dangChieu
      );
      return { ...state };
    }

    case SET_PHIM_SAP_CHIEU: {
      state.sapChieu = !state.sapChieu;
      state.arrFilms = state.arrFilmsDefault.filter(
        (film) => film.sapChieu === state.sapChieu
      );
      return { ...state };
    }
    case SET_CHI_TIET_PHIM: {
      state.filmDetail = action.filmDetail;
      return { ...state };
    }

    case SET_THONG_TIN_PHIM: {
      state.thongTinPhim = action.thongTinPhim;
      return { ...state };
    }
    default:
      return { ...state };
  }
};
