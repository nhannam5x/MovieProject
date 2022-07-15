import { quanLyDatVeService } from "../../services/QuanLyDatVeServices"
import { thongTinDatVe } from "../../_core/models/ThongTinDatVe";
import { SET_CHI_TIET_PHONG_VE, DAT_VE_HOAN_TAT } from './../types/QuanLyDatVeType';
import { ThongTinLichChieu } from './../../_core/models/ThongTinPhongVe';
import { displayloadingAction, hideloadingAction } from './LoadingAction/LoadingAction';



export const layChiTietPhongVeAction = (maLichChieu) => {

    return async dispatch => {
        try{
            const result = await quanLyDatVeService.layChiTietPhongVe(maLichChieu);

            if(result.status === 200){
                dispatch({
                    type: SET_CHI_TIET_PHONG_VE,
                    chiTietPhongVe:result.data.content
                })
            }
        }catch(error){
            console.log('error',error)
            console.log('error',error.respone?.data)

        }
    }
}
export const datVeAction = (thongTinDatVe = new ThongTinLichChieu()) => {

    return async dispatch => {
        try{


            const result = await quanLyDatVeService.datVe(thongTinDatVe);

           console.log(result.data.content);

    }catch(error){
         console.log(error.respone?.data)
    }
}
}