// import axios from "axios";

export const TOKEN_CYBERSOFT =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCAxNyIsIkhldEhhblN0cmluZyI6IjI2LzEwLzIwMjIiLCJIZXRIYW5UaW1lIjoiMTY2Njc0MjQwMDAwMCIsIm5iZiI6MTYzNzYwMDQwMCwiZXhwIjoxNjY2ODkwMDAwfQ.bsbyK5ZxphAvsyp2ZqB_XhppPE9tnzCxMpCoHby_Wc0";
  
export const GROUP_ID = "GP01";
export const USER_LOGIN = "userLogin";
export const ACCESS_TOKEN = "accesstoken";
export const DOMAIN = "https://movienew.cybersoft.edu.vn/";

/**Không dùng phần này, đã cấu hình lại file baseService */
//Cấu hình interceptor cho axios (Tất cả request gọi = axios đều được cấu hình) (1 dự án làm 1 duy nhất)
// export const http = axios.create({
//   baseURL: "https://movienew.cybersoft.edu.vn/",
//   timeout: 30000, // Thời gian quy định request, quá tgian bỏ qua
// });

// http.interceptors.request.use(
//   (config) => {
//     const token = TOKEN_CYBERSOFT;
//     config.headers = {
//       ...config.headers,
//       TokenCyberSoft: TOKEN_CYBERSOFT,
//       Authorization: localStorage.getItem(ACCESS_TOKEN)
//         ? null
//         : localStorage.getItem(ACCESS_TOKEN), ///Token mà người dùng đăng nhập
//     };
//     return config;
//   },
//   (errors) => {
//     return Promise.reject(errors);
//   }
// );
