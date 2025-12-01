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

    static getAllChiTietSanPham = () => {
        const getToken = getHeader();
        return requestAdmin({
            method: "GET",
            url: `/admin/chi-tiet-san-pham/getall`,
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

    static detailChiTietSanPham = (id) => {
        const getToken = getHeader();
        return requestAdmin({
            method: "GET",
            url: `/admin/chi-tiet-san-pham/detail/${id}`,
            headers: {
                Authorization: getToken,
            },
        });
    };

    static updateChiTietSanPham = (id, data) => {
        const getToken = getHeader();
        return requestAdmin({
            method: "PUT",
            url: `/admin/chi-tiet-san-pham/update/${id}`,
            data: data,
            headers: {
                Authorization: getToken,
            },
        });
    };

    static searchChiTietSanPham = (id, data) => {
        const getToken = getHeader();
        return requestAdmin({
            method: "POST",
            url: `/admin/chi-tiet-san-pham/search-ctsp/${id}`,
            data: data,
            headers: {
                Authorization: getToken,
            },
        });
    };

    static getAnhCTSP = (ten, idSP) => {
        const getToken = getHeader();
        return requestAdmin({
            method: "GET",
            url: `/admin/hinh-anh/${ten}/${idSP}`,
            headers: {
                Authorization: getToken,
            },
        });
    };

    static addAnhTheoMau = (id, data) => {
        const getToken = getHeader();
        return requestAdmin({
            method: "POST",
            data: data,
            url: `/admin/hinh-anh/add-anh/${id}`,
            headers: {
                Authorization: getToken,
            },
        });
    };

    static deleteAnh = (idAnh) => {
        const getToken = getHeader();
        return requestAdmin({
            method: "DELETE",
            url: `admin/hinh-anh/delete-anh/${idAnh}`,
            headers: {
                Authorization: getToken,
            },
        });
    };
}