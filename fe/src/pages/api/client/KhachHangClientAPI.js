import { requestClient } from "../../helper/request";

export class KhachHangClientAPI {
  static getOneByIdUser = (id) => {
    return requestClient({
      method: "GET",
      url: `/home/khach-hang/${id}`,
    });
  };

  static update = (data) => {
 
    return requestClient({
      method: "PUT",
      url: `/home/khach-hang`,
      data: data,
    });
  };
}
