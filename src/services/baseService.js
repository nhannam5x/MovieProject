import Axios from "axios";
import { DOMAIN, ACCESS_TOKEN, TOKEN_CYBERSOFT } from "../util/setting";

export class baseService {
  put = (url, model) => {
    return Axios({
      url: `${DOMAIN}${url}`,
      method: "PUT",
      data: model,
      headers: {
        TokenCyberSoft: TOKEN_CYBERSOFT,
        Authorization: "Bearer " + localStorage.getItem(ACCESS_TOKEN),
      }, 
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
      }, 
    });
  };

  get = (url) => {
    return Axios({
      url: `${DOMAIN}${url}`,
      method: "GET",
      headers: {
        TokenCyberSoft: TOKEN_CYBERSOFT,
        Authorization: "Bearer " + localStorage.getItem(ACCESS_TOKEN),
      }, 
    });
  };

  delete = (url) => {
    return Axios({
      url: `${DOMAIN}${url}`,
      method: "DELETE",
      headers: {
        TokenCyberSoft: TOKEN_CYBERSOFT,
        Authorization: "Bearer " + localStorage.getItem(ACCESS_TOKEN),
      }, 
    });
  };
}
