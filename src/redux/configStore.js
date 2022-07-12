import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";
import { CarouselReducer } from "./reducers/CarouselReducer/CarouselReducer";
import { QuanLyPhimReducer } from "./reducers/QuanLyPhimReducer/QuanLyPhimReducer";
import { QuanLyRapReducer } from "./reducers/QuanLyRapReducer/QuanLyRapReducer";
import { QuanLyNguoiDungReducer } from "./reducers/QuanLyNguoiDungReducer/QuanLyNguoiDungReducer";
import { QuanLyDatVeReducer } from "./reducers/QuanLyDatVeReducer/QuanLyDatVeReducer";
import { LoadingReducer } from "./reducers/LoadingReducer/LoadingReducer";
const rootReducer = combineReducers({
  // State
  CarouselReducer,
  QuanLyPhimReducer,
  QuanLyRapReducer,
  QuanLyNguoiDungReducer,
  QuanLyDatVeReducer,
  LoadingReducer,
});
export const store = createStore(rootReducer, applyMiddleware(thunk));
