import { requestClient } from "../../helper/request";

export class HomeAPI {
  static getAllSanPham = () => {
    return requestClient({
      method: "GET",
      url: `/home`,
    });
  };
} 