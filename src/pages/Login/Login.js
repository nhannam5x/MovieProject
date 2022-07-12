import { useFormik } from "formik";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { dangNhapAction } from "../../redux/actions/QuanLyNguoiDungActions/QuanLyNguoiDungActions";
export default function Login() {
  const dispatch = useDispatch();

  const { userLogin } = useSelector((state) => state.QuanLyNguoiDungReducer);
  console.log("userLogin", userLogin);

  const formik = useFormik({
    initialValues: {
      taiKhoan: "",
      matKhau: "",
      // Đặt giống api
    },
    onSubmit: (values) => {
      const action = dangNhapAction(values); // gọi hàm thì trả về hàm thực thi ở file actions
      dispatch(action); //  dispatch hàm
      console.log("values", values);
    },
  });

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault(); //  Chặn browser reload
        formik.handleSubmit(event);
      }}
      className="bg-white w-full md:max-w-md lg:max-w-full md:mx-auto md:w-1/2 xl:w-1/3 h-screen px-6 lg:px-16 xl:px-12
flex items-center justify-center"
    >
      <div className="w-full h-100">
        <h1 className="text-xl md:text-2xl font-bold leading-tight mt-12">
          Đăng Nhập
        </h1>
        <div className="mt-6" action="#" method="POST">
          <div>
            <label className="block text-gray-700">Tài khoản</label>
            <input
              name="taiKhoan"
              onChange={formik.handleChange}
              placeholder="Nhập tài khoản"
              className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
              autofocus
              autoComplete
            />
          </div>
          <div className="mt-4">
            <label className="block text-gray-700">Mật khẩu</label>
            <input
              type="password"
              name="matKhau"
              onChange={formik.handleChange}
              placeholder="Nhập mật khẩu"
              // minLength={6}
              className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500
focus:bg-white focus:outline-none"
            />
          </div>
          <div className="text-right mt-2">
            <a
              href="#"
              className="text-sm font-semibold text-gray-700 hover:text-blue-700 focus:text-blue-700"
            >
              Quên mật khẩu?
            </a>
          </div>
          <button
            type="submit"
            className="w-full block bg-indigo-500 hover:bg-indigo-400 focus:bg-indigo-400 text-white font-semibold rounded-lg
px-4 py-3 mt-6"
          >
            Đăng Nhập
          </button>
        </div>
        <hr className="my-6 border-gray-300 w-full" />
        <button
          type="button"
          className="w-full block bg-white hover:bg-gray-100 focus:bg-gray-100 text-gray-900 font-semibold rounded-lg px-4 py-3 border border-gray-300"
        >
          <div className="flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              className="w-6 h-6"
              viewBox="0 0 48 48"
            >
              <defs>
                <path
                  id="a"
                  d="M44.5 20H24v8.5h11.8C34.7 33.9 30.1 37 24 37c-7.2 0-13-5.8-13-13s5.8-13 13-13c3.1 0 5.9 1.1 8.1 2.9l6.4-6.4C34.6 4.1 29.6 2 24 2 11.8 2 2 11.8 2 24s9.8 22 22 22c11 0 21-8 21-22 0-1.3-.2-2.7-.5-4z"
                />
              </defs>
              <clipPath id="b">
                <use xlinkHref="#a" overflow="visible" />
              </clipPath>
              <path clipPath="url(#b)" fill="#FBBC05" d="M0 37V11l17 13z" />
              <path
                clipPath="url(#b)"
                fill="#EA4335"
                d="M0 11l17 13 7-6.1L48 14V0H0z"
              />
              <path
                clipPath="url(#b)"
                fill="#34A853"
                d="M0 37l30-23 7.9 1L48 0v48H0z"
              />
              <path
                clipPath="url(#b)"
                fill="#4285F4"
                d="M48 48L17 24l-4-3 35-10z"
              />
            </svg>
            <span className="ml-4">Đăng nhập với Google</span>
          </div>
        </button>
        <p className="mt-8">
          Bạn chưa có tài khoản?{" "}
          <NavLink
            to="register"
            className="text-blue-500 hover:text-blue-700 font-semibold"
          >
            Tạo tài khoản
          </NavLink>
        </p>
      </div>
    </form>
  );
}
