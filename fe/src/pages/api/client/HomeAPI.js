import { requestClient } from "../../helper/request";

export class HomeAPI {
  static getAllSanPham = () => {
    return requestClient({
      method: "GET",
      url: `/home`,
    });
  };

  static timMang = (data) => {
    return requestClient({
      method: "POST",
      url: `/home/searchMang`,
      data: data
    });
  };

  static timKiemDashboard = (tenTim) => {
    return requestClient({
      method: "GET",
      url: `/home/tim-kiem/${tenTim}`,
    });
  };
} 