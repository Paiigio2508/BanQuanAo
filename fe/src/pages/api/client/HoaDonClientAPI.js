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
    });
  };
  static detailHD = (id) => {
    return requestClient({
      method: "GET",
      url: `/home/detail-hoa-don/${id}`,
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
  static huyHoaDonQLHoaDon = (data, id, tenKH ) => {
    return requestClient({
      method: "PUT",
      url: `/home/xoa-hoa-don/${id}/${tenKH}`,
      data: data,
      headers: {
        Authorization: this.getToken,
      },
    });
  };
  static deleteInvoiceAndRollBackProduct = (idCTSP, id) => {
    return requestClient({
      method: "DELETE",
      url: `/home/delete-hoa-don-chi-tiet/${idCTSP}/${id}`,
      headers: {
        Authorization: this.getToken,
      },
    });
  };
}