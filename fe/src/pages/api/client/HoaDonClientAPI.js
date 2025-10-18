import { requestClient } from "../../helper/request";

export class HoaDonClientAPI {
  static SearchHDClient = (ma) => {
    return requestClient({
      method: "GET",
      url: `/home/tim-hoa-don/${ma}`,
    });
  };
  static getAllLichSuHoaDon = (id) => {
    return requestClient({
      method: "GET",
      url: `/home/detail-lich-su-hoa-don/${id}`,
      headers: {
        Authorization: this.getToken,
      },
    });
  };
  static detailSanPham = (id) => {
    return requestClient({
      method: "GET",
      url: `/home/hoa-don/san-pham/${id}`,
    });
  };
  static getALLHoaDonOnlineByIdKH = (data) => {
    return requestClient({
      method: "POST",
      url: `/home/hoa-don`,
      data: data,
    });
  };
}