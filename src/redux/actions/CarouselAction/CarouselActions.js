import { SET_CAROUSEL } from "../../types/CarouselTpye";
import { quanLyPhimService } from "../../../services/QuanLyPhimService";
export const getCarouselAction = () => {
  return async (dispatch) => {
    try {
      const result = await quanLyPhimService.layDanhSachBanner();
      dispatch({
        type: SET_CAROUSEL,
        arrImg: result.data.content,
      });
    } catch (errors) {
      console.log("errors", errors);
    }
  };
};
