import { getHeader, requestAdmin } from "../../helper/request";
export class ChiTietSanPhamAPI {

    static showCTSPBySanPhamId = (id) => {
        const getToken = getHeader();
        return requestAdmin({
            method: "GET",
            url: `/admin/chi-tiet-san-pham/showct/${id}`,
            headers: {
                Authorization: getToken,
            },
        });
    };

    static themChiTietSanPham = (data) => {
        const getToken = getHeader();
        return requestAdmin({
            method: "POST",
            url: `/admin/chi-tiet-san-pham/add`,
            data: data,
            headers: {
                Authorization: getToken,
            },
        });
    };
}