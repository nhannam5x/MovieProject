import React ,{Fragment, useEffect} from "react";
import { useSelector , useDispatch } from 'react-redux';
import { QuanLyNguoiDungReducer } from './../../redux/reducers/QuanLyNguoiDungReducer/QuanLyNguoiDungReducer';
import style from './Checkout.module.css'
import { QuanLyDatVeService } from './../../services/QuanLyDatVeServices';
import { QuanLyDatVeReducer } from './../../redux/reducers/QuanLyDatVeReducer/QuanLyDatVeReducer';
import { datVeAction, layChiTietPhongVeAction } from './../../redux/actions/QuanLyDatveActions';
import {CheckOutlined, CloseOutlined , UserAddOutlined,CrownOutlined} from '@ant-design/icons'
import './checkout.css'
import { DAT_VE } from "../../redux/types/QuanLyDatVeType";
import _ from "lodash";
import { ThongTinDatVe, thongTinDatVe } from './../../_core/models/ThongTinDatVe';
import { Tabs } from 'antd';
import { layThongTinNguoiDungAction } from "../../redux/actions/QuanLyNguoiDungActions/QuanLyNguoiDungActions";
import moment from "moment";

 function Checkout(props) {
  const  {userLogin} = useSelector(state => state.QuanLyNguoiDungReducer)

  const {chiTietPhongVe,danhSachGheDangDat} = useSelector(state => state.QuanLyDatVeReducer)

  const dispatch = useDispatch()
  console.log('danhSachGheDangDat',danhSachGheDangDat)
  useEffect(() => {
    // Gọi hàm tạo ra 1 async funtion
    const action = layChiTietPhongVeAction(props.match.params.id)
    // Dispatch funtion
    dispatch(action)
  },[])
    console.log({chiTietPhongVe})

    const{thongTinPhim,danhSachGhe} = chiTietPhongVe

    const rederSeats = () => {

      return danhSachGhe.map((ghe,index)=>{

        let classGheVip = ghe.loaiGhe === 'Vip' ? 'gheVip' : '';
        let classGheDaDat = ghe.daDat === true ? 'gheDaDat' : '';
        let classGheDangDat = ''
        let indexGheDD = danhSachGheDangDat.findIndex(gheDD => gheDD.maGhe === ghe.maGhe)
        let classGheDaDuocDat = '';
        if(userLogin.taiKhoan === ghe.taiKhoanNguoiDat){
          classGheDaDuocDat = 'gheDaDuocDat'
        }
        if(indexGheDD != -1) {
          classGheDaDat = 'gheDangDat';
        }
        return <Fragment key = {index}>
         <button onClick= {()=>{
           dispatch({
             type: DAT_VE,
             gheDuocChon:ghe
           })
         }} disabled ={ghe.daDat} className = {`ghe ${classGheVip} ${classGheDaDat} ${classGheDaDuocDat} text-center`} key = {index}> { ghe.daDat ? classGheDaDuocDat != '' ? <UserAddOutlined style = {{textAlign : "center"}}/> : <CloseOutlined /> : ghe.stt}
         </button> 
            
            {(index + 1)%14 === 0 ? <br/> : ''}
        </Fragment>
      })
    }

  return ( 
  <div className="container min-h-screen mt-5" >
    <div className = "grid grid-cols-12">
      <div className="col-span-9">
        <div className ="flex flex-col items-center mt-5">
          <div className ="bg-black" style = {{width:'80%' , height:15}}>

          </div>
          <div className ={`${style['trapezoid']} text-center`}>
            <h3 className = "text-black mt-3">Màn Hình</h3>
          </div>
          <div>
            {rederSeats()}
          </div>
          </div>
          <div className = "mt-5 flex justify-center">
            <table className = "divide-y divide-gray-200 w-2/3">
              <thead className = "bg-gray-50 p-5 text-center">
                <tr>
                  <th>Ghế Chưa Đặt</th>
                  <th>Ghế Đang Đặt</th>
                  <th>Ghế Vip</th>
                  <th>Ghế Đã Được Đặt</th>
                </tr>
              </thead>
              <tbody className = "bg-white divide-y divide-gray-200 text-center">
                <tr>
                  <td><button className = "ghe text-center"><CheckOutlined style={{marginBottom:7.5,fontWeight:'bold'}}/></button></td>
                  <td><button className = "ghe gheDangDat text-center bg-black"><CloseOutlined style={{marginBottom:7.5,fontWeight:'bold'}}/></button></td>
                  <td><button className = "ghe gheVip text-center"><CrownOutlined style={{marginBottom:7.5,fontWeight:'bold'}}/></button></td>
                  <td><button className = "ghe gheDaDuocDat text-center"><UserAddOutlined style={{marginBottom:7.5,fontWeight:'bold'}}/></button></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      <div className = "col-span-3 ">
          <h3 className = "text-center text-green-400 text-4xl">{danhSachGheDangDat.reduce((tongTien,ghe,index)=>{
                  return tongTien += ghe.giaVe;
                },0).toLocaleString()} đ</h3>
          <hr/>
          <h3 className = "text-xl">{thongTinPhim?.tenPhim}</h3>
          <p>Địa điểm : {thongTinPhim?.tenCumRap}-{thongTinPhim?.tenRap}</p>
          <p>Ngày chiếu : {thongTinPhim?.ngayChieu} - {thongTinPhim?.gioChieu}</p>
          <hr/>
          <div className="flex flex-row my-5 font-bold">
            <div className = "w-4/5"><span className = "text-red-400 text-lg">Ghế</span>
            {_.sortBy(danhSachGheDangDat,['stt']).map((gheDD,index)=> {
              return <span key = {index} className = "text-green-500 text-xl mt-2">{gheDD.stt}</span>
            })}
            </div>
            <div className = "col-span-1 text-right">
              <span className = "text-right text-green-400">
                {danhSachGheDangDat.reduce((tongTien,ghe,index)=>{
                  return tongTien += ghe.giaVe;
                },0).toLocaleString()}
              </span>đ
              </div>
          </div>
          <hr/>
          <div className = "my-5">
            <i>Email</i> <br/>
            {userLogin.email}
          </div>
          <div className = "my-5">
            <i>Phone</i> <br/>
            {userLogin.soDT}
          </div>
          <hr/>
          <div className=" my-5 flex">
            <div>
              <p className = "text-xs">Mã giảm giá</p>
              <p className = "text-sm  font-bold">Nhập tại đây...</p></div>
            <div className = "text-right ml-10 mt-1"><button className = "bg-gray-400 text-white p-1.5 rounded-md">
              Áp dụng</button></div>
          </div>
          <hr/>
          <div className  ="">
            <p className = "text-md font-bold mt-3">Hình thức thanh toán </p>
            <div className = "mb-4"><p className ="text-red-400 font-bold text-xs"> Vui lòng chọn ghế để hiển thị phương thức thanh toán phù hợp</p></div>
          </div>
          <hr/>
          {/* <div className ="mt-16">
            <div className = "text-center">
              <p className = "flex justify-center"><a><svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg></a>Vé đã mua không thể đổi hoặc hoàn tiền 
                </p>
              <p className = "">Mã vé sẽ được gửi qua tin nhắn <a className ="text-yellow-500">ZMS</a>(Tin nhắn Zalo) và <a className ="text-yellow-300">Email</a> đã nhập</p>
              </div>
          </div>
          <hr/> */}
          <div className ="mb-0 h-full flex flex-col  items-center" style = {{marginBottom:0}}>
            <div onClick={()=>{
              const thongTinDatVe = new ThongTinDatVe();
              thongTinDatVe.maLichChieu = props.match.params.id;
              thongTinDatVe.danhSachVe = danhSachGheDangDat
              console.log(thongTinDatVe)
              dispatch(datVeAction(thongTinDatVe))
            }} className = "bg-green-500 text-white w-full text-center py-3 fond-bold text-2xl cursor-pointer shadow-lg rounded-2xl">
              ĐẶT VÉ

            </div>
          </div>
      </div>
    </div>
    
  </div>
  )
}



const { TabPane } = Tabs;


function callback(key) {
  console.log(key);
}

export default function CheckoutTab(props)  {
  
  const {tabActive} = useSelector(state => state.QuanLyDatVeReducer)
  console.log('tabActive',tabActive)
  return <div className = "p-5">
    <Tabs defaultActiveKey={tabActive} onChange={callback}>
  <TabPane tab="CHỌN GHẾ & THANH TOÁN" key="1">
    <Checkout {...props}/>
  </TabPane>
  <TabPane tab="KẾT QUẢ ĐẶT VÉ" key="2">
    <KetQuaDatVe {...props}/>
  </TabPane>
</Tabs>
  </div>
}
  
 function KetQuaDatVe (props){
   const dispatch = useDispatch()
   const {thongTinNguoiDung} = useSelector(state => state.QuanLyNguoiDungReducer)
   const {userLogin} = useSelector(state => state.QuanLyNguoiDungReducer)

   useEffect (()=>{
     const action = layThongTinNguoiDungAction()
        dispatch(action)
   },[])
   console.log('thongtinnguoidung',thongTinNguoiDung)
   const renderTicketItem = function(){
     return thongTinNguoiDung.thongTinDatVe?.map((ticket,index) => {
       const seats = _.first(ticket.danhSachGhe)
       return <div className="p-2 lg:w-1/3 md:w-1/2 w-full">
       <div className="h-full flex items-center border-gray-200 border p-4 rounded-lg" key = {index}>
         <img alt="team" className="w-16 h-16 bg-gray-100 object-cover object-center flex-shrink-0 rounded-full mr-4" src="https://picsum.photos/200/200" />
         <div className="flex-grow">
           <h2 className="text-gray-900 title-font font-medium">{ticket.tenPhim}</h2>
           <p className="text-gray-500">{moment(ticket.ngayDat).format('hh:mm A - DD-MM-YYYY')}</p>
            <p>Địa điểm: {seats.tenHeThongRap} - </p> 
            <p>{seats.tenCumRap} - Ghế {ticket.danhSachGhe.map((ghe,index)=> {return <span key={index}>{ghe.tenGhe}</span>})}</p>
         </div>
       </div> 
 </div>
     })
   }
      return <div className = 'p-5'>
        <h3>Kết quả đặt vé</h3>
<section className="text-gray-600 body-font">
  <div className="container px-5 py-24 mx-auto">
    <div className="flex flex-col text-center w-full mb-20">
      <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-purple-600">Lịch Sử Đặt Vé</h1>
      <p className="lg:w-2/3 mx-auto leading-relaxed text-base">Hãy xem thông tin địa điểm và thời gian để xem phim vui vẻ bạn nhé !</p>
    </div>
    <div className="flex flex-wrap -m-2">
      {renderTicketItem()}
      {/* <div className="p-2 lg:w-1/3 md:w-1/2 w-full">
        <div className="h-full flex items-center border-gray-200 border p-4 rounded-lg">
          <img alt="team" className="w-16 h-16 bg-gray-100 object-cover object-center flex-shrink-0 rounded-full mr-4" src="https://picsum.photos/200/200" />
          <div className="flex-grow">
            <h2 className="text-gray-900 title-font font-medium">Lật mặt 48h</h2>
            <p className="text-gray-500">10h20 Rạp 5</p>
          </div>
        </div> 
  </div>*/}
      </div>
  </div>
</section>

      </div>
      

      
 }