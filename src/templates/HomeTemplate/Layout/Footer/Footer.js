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
                    src='https://thumbs.dreamstime.com/b/appstore-apple-company-icon-vector-image-can-also-be-used-social-media-logos-suitable-mobile-apps-web-apps-print-media-80364097.jpg'
                    alt='appstore'
                  />
                </a>

                <a
                  href='https://play.google.com/store/apps/details?id=com.mservice.momotransfer&utm_source=website-momo&utm_medium=download&utm_campaign=momo-1dong'
                  target='_blank'
                >
                  <img
                    src='https://i.pinimg.com/736x/92/a0/95/92a095876f6c2894a2014c4e1e291a2f.jpg'
                    alt='playstore'
                  />
                </a>
              </div>
              <div className='footer__social mt-3'>
                <h3>Social</h3>
                <a href='https://www.facebook.com/tix.vn/' target='_blank'>
                  <img
                    src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAb1BMVEU6VZ////82Up4zUJ1UbKx4ibswTpyMmsQ5V6EtTJupss8nSJnN0+WVosgqSpo4U56eqcyDksDj5vBwgbb3+PxFXqNabqt9jb3S2OhidbC9xdy3v9l0hLjZ3etLY6bq7fTEyt4dQpdJYqekrs2uttK97JEgAAADFUlEQVR4nO3c2XLiMBBAUUZmM3IsFsNgSIAk/P83TsLzjCNbI3c3de9rqlw+BV7VZDIhIiIiIiIiIiIiIiIiIlJeCM4VxbzsrJDey8G50s/3h91ss3jp7LdJYii8262rbfPr545eem/753y9qWJwjypzwqJuT7E6i0JX7459fOaEvn3r5zMmLPy5r8+W0L9Gn15MCkO9GuAzJHSh9xFoS1hcrsOAVoTzdsghaEhYTAcDbQjdfjjQhDAshx6DRoShrhKAFoR+nQI0ICzaJKABYZlyEFoQ1p9pQPVCd0m4UJgQ+lsiULvQXVKB2oW+1ysZg8KwTAYqF5ZpF3sDQr99cqFLvJ3RL0y+2usXDnw1Y0YYUh58TQiL3X8Aql57Kvschs3xdF/9pftC8fphj3vSalZ6X5tbA/axJ5rtzhdBem+HVEeeaKq55s+po1DHAW/vJj+/yfdifdxX1OYX9LuwjxIejH5Fv3LTGOBJ8eXup+KEH056P4cXJby+S+9mQlHCUy29mwlFCddz6d1MKEq4sXsmjRTOEGoOIUL9IUSoP4QI9YcQof4QItQfQoT6Q4hQR27+78qYucRX37GFR7Jrb65ddBQz1Hbv2sCjpSixvEcgEitlhcN+cNenRnZxagThm+wK6ghC4TXiEYSr8tmFwstvIwhb2XX+EYR72St+fmEj6htDuBW+a8svPArPauQXnp9e+CI8jZJfKP38mF8ofDnML2wuwsOn2YVX6ena7MKt9PRpduHt6YUr6eHM7MKF9HBmduGr9OvU7MKp9BR4bmEjDcwulJ9zzy2U/+1hbqH0s1N+4afsq8QRhPKT/LmFB+kb7+xC6Tua7ELhdacRhOLPTtmFCv7ZQOY14LP4xWISlh2FqFkM17UF8VPpF7Hjb3HTJl2nSwXAzp5jnqYrhAj1hxCh/hAi1B9ChPpDiFB/CBHqDyFC/SFEqD+ECPWHEKH+ECLUH0KE+kOIUH8IEeoPIUL9IUSoP4QI9YcQof4QItQfQoT6Q4hQfwgR6g8hQv0hRKg/hAj1hxCh/hAi1B9ChD36A+1ASVvVoq0WAAAAAElFTkSuQmCC'
                    alt='facebook'
                  />
                </a>
                <a href='https://zalo.me/tixdatve' target='_blank'>
                  <img
                    src='https://apksshare.com/wp-content/uploads/2021/06/Zalo-Video-Call-APK-MOD-Download-21.04.02.png'
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
              src='https://cybersoft.edu.vn/wp-content/uploads/2017/03/MIN-OP1.png'
              alt='cybersoft'
            />
          </div>
          <div className='footer__bottom--item2'>
            <h3>CyberCinema – SẢN PHẨM CỦA CÔNG TY CỔ PHẦN Cybersoft</h3>
            <p>
              Địa chỉ: Z06 Đường số 13, Phường Tân Thuận Đông, Quận 7, Tp. Hồ
              Chí Minh, Việt Nam.
            </p>
            <p>
              Giấy chứng nhận đăng ký kinh doanh số: 0101659783, <br />
              đăng ký thay đổi lần thứ 30, ngày 22 tháng 01 năm 2020 do Sở kế
              hoạch và đầu tư Thành phố Hồ Chí Minh cấp.
            </p>
            <p>Số Điện Thoại (Hotline):  (+84) 961.05.10.14</p>
            <p>
              Email: <a href='mailto:info@cybersoft.edu.vn'>info@cybersoft.edu.vn</a>
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
