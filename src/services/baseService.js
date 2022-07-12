import Axios from "axios";
import { DOMAIN, ACCESS_TOKEN, TOKEN_CYBERSOFT } from "../util/setting";
// import { DOMAIN, TOKEN_CYBERSOFT } from "../../../util/setting";

export class baseService {
  //put json về phía backend
  put = (url, model) => {
    return Axios({
      url: `${DOMAIN}${url}`,
      method: "PUT",
      data: model,
      headers: {
        TokenCyberSoft: TOKEN_CYBERSOFT,
        Authorization: "Bearer " + localStorage.getItem(ACCESS_TOKEN),
      }, //JWT
    });
  };

  post = (url, model) => {
    return Axios({
      url: `${DOMAIN}${url}`,
      method: "POST",
      data: model,
      headers: {
        TokenCyberSoft: TOKEN_CYBERSOFT,
        Authorization: "Bearer " + localStorage.getItem(ACCESS_TOKEN),
      }, //JWT
    });
  };

  get = (url) => {
    return Axios({
      url: `${DOMAIN}${url}`,
      method: "GET",
      headers: {
        TokenCyberSoft: TOKEN_CYBERSOFT,
        Authorization: "Bearer " + localStorage.getItem(ACCESS_TOKEN),
      }, //JWT
    });
  };

  delete = (url) => {
    return Axios({
      url: `${DOMAIN}${url}`,
      method: "DELETE",
      headers: {
        TokenCyberSoft: TOKEN_CYBERSOFT,
        Authorization: "Bearer " + localStorage.getItem(ACCESS_TOKEN),
      }, //JWT
    });
  };
}
