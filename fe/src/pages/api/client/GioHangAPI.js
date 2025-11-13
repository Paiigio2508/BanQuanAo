import { requestClient } from "../../helper/request";

export class GioHangAPI {
  static getByIDKH = (idKH) => {
    return requestClient({
      method: "GET",
      url: `/gio-hang/detailByKH/${idKH}`,
    });
  };
  static addGH = (data) => {
    return requestClient({
      method: "POST",
      url: "/gio-hang/addGH",
      data: data,
    });
  };
  static getAllGhctByIdGh = (id) => {
    return requestClient({
      method: "GET",
      url: `/gio-hang-chi-tiet/getAll/${id}`,
    });
  };
  static addGHCT = (data) => {
    return requestClient({
      method: "POST",
      url: "/gio-hang-chi-tiet/addGHCT",
      data: data,
    });
  };
  static updateGHCT = (data) => {
    return requestClient({
      method: "POST",
      url: "/gio-hang-chi-tiet/updateGHCT",
      data: data,
    });
  };
  static deleteGHCT = (id) => {
    return requestClient({
      method: "DELETE",
      url: `/gio-hang-chi-tiet/deleteGHCT/${id}`,
    });
  };
  
}
