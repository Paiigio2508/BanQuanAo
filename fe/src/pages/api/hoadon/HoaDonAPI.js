import { getHeader, requestAdmin } from "../../helper/request";
export class HoaDonAPI {
  static getAllbyTT = (trangThai) => {
    const getToken = getHeader();
    return requestAdmin({
      method: "GET",
      url: `/admin/hoa-don`,
      headers: {
        Authorization: getToken,
      },
    });
  };
}
