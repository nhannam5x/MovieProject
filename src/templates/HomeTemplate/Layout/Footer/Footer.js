import React from "react";
import "./_Footer.scss";
import partNersLogo from "../../../../data/partNersLogo.json";
import ScrollButton from "../../../../components/BackToTop/ScrollButton";

export default function Footer(props) {
  const renderPartners = () => {
    return partNersLogo.arrPartners.map((partNer, index) => {
      return (
        <a href={partNer.webSite} target='_blank' key={index}>
          <img
            src={partNer.hinhAnh}
            alt={partNer.name}
            style={{
              width: "30px",
              height: "30px",
              background: "#fff",
              borderRadius: "50%",
            }}
          />
        </a>
      );
    });
  };
  return (
    <footer id='footer' className='footer'>
      <div className='footer__wrapper'>
        <div className='footer__top'>
          <div className='footer__item'>
            <h3>MovieStar</h3>
            <ul>
              <li>
                <a href=''>FAQ</a>
              </li>
              <li>
                <a href=''>Brand Guidelines</a>
              </li>
              <li>
                <a href=''>Thoả thuận sử dụng</a>
              </li>
              <li>
                <a href=''>Chính sách bảo mật</a>
              </li>
            </ul>
          </div>
          <div className='footer__item'>
            <h3>Đối tác</h3>
            <div className='footer__partner'>{renderPartners()}</div>
          </div>
          <div className='footer__item ml-3'>
            <div className='footer__contact'>
              <h3>Mobile App</h3>
              <div className='footer__app'>
                <a
                  href='https://apps.apple.com/vn/app/tix-%C4%91%E1%BA%B7t-v%C3%A9-nhanh-nh%E1%BA%A5t/id615186197'
                  target='_blank'
                >
                  <img
                    src='https://tix.vn/app/assets/img/icons/apple-logo.png'
                    alt='appstore'
                  />
                </a>

                <a
                  href='https://play.google.com/store/apps/details?id=vn.com.vng.phim123'
                  target='_blank'
                >
                  <img
                    src='https://tix.vn/app/assets/img/icons/android-logo.png'
                    alt='playstore'
                  />
                </a>
              </div>
              <div className='footer__social mt-3'>
                <h3>Social</h3>
                <a href='https://www.facebook.com/tix.vn/' target='_blank'>
                  <img
                    src='https://tix.vn/app/assets/img/icons/facebook-logo.png'
                    alt='facebook'
                  />
                </a>
                <a href='https://zalo.me/tixdatve' target='_blank'>
                  <img
                    src='https://tix.vn/app/assets/img/icons/zalo-logo.png'
                    alt='zalo'
                  />
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className='footer__midle'>
          <hr />
        </div>
        <div className='footer__bottom'>
          <div className='footer__bottom--item1'>
            <img
              src='https://tix.vn/app/assets/img/icons/zion-logo.jpg'
              alt='zion'
            />
          </div>
          <div className='footer__bottom--item2'>
            <h3>CyberCinema – SẢN PHẨM CỦA CÔNG TY CỔ PHẦN ZION</h3>
            <p>
              Địa chỉ: Z06 Đường số 13, Phường Tân Thuận Đông, Quận 7, Tp. Hồ
              Chí Minh, Việt Nam.
            </p>
            <p>
              Giấy chứng nhận đăng ký kinh doanh số: 0101659783, <br />
              đăng ký thay đổi lần thứ 30, ngày 22 tháng 01 năm 2020 do Sở kế
              hoạch và đầu tư Thành phố Hồ Chí Minh cấp.
            </p>
            <p>Số Điện Thoại (Hotline): 1900 545 436</p>
            <p>
              Email: <a href='mailto:support@tix.vn'>support@tix.vn</a>
            </p>
          </div>
          <div className='footer__bottom--item3'>
            <img
              src='https://s3img.vcdn.vn/123phim/2020/03/d1e6bd560daa9e20131ea8a0f62e87f8.png'
              alt='Bộ Công Thương'
              className='mb-3'
            />
            <ScrollButton />
          </div>
        </div>
      </div>
    </footer>
  );
}
