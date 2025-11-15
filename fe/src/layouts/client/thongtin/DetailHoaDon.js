import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import LogoGHN from "../../../assets/images/LogoGHN.png";
import { HoaDonClientAPI } from "../../../pages/api/client/HoaDonClientAPI"; // chỉnh đúng path của bạn
import moment from "moment";

const DetailTraCuuDonHang = () => {
  const { idHD } = useParams();
  const [hoaDonState, setHoaDonState] = useState({});
  const [listSanPhams, setListSanPhams] = useState([]);

  useEffect(() => {
    if (!idHD) return;

    const fetchData = async () => {
      try {
        const [resHD, resSP] = await Promise.all([
          HoaDonClientAPI.detailHD(idHD),
          HoaDonClientAPI.detailSanPham(idHD),
        ]);

        setHoaDonState(resHD.data);
        setListSanPhams(resSP.data);
        console.log(resHD.data);
      } catch (error) {
        console.error("Lỗi khi load chi tiết đơn hàng:", error);
      }
    };

    fetchData();
  }, [idHD]);

  // helper định dạng VND
  const formatVND = (value) => {
    const n = Number(
      typeof value === "string" ? value.replace(/[^\d.-]/g, "") : value ?? 0
    );
    if (isNaN(n)) return "0 VND";
    return n.toLocaleString("vi-VN") + " VND";
  };

  const calcThanhTien = (hd) => {
    if (!hd) return 0;
    const giaGoc = Number(hd.thanhTien || 0);
    const tienVanChuyen = Number(hd.tienVanChuyen || 0);
    return giaGoc + tienVanChuyen;
  };

  const trangThaiStr = String(hoaDonState.trangThai ?? "");

  const labelTrangThai =
    trangThaiStr === "0"
      ? "Chờ xác nhận"
      : trangThaiStr === "1"
      ? "Xác nhận"
      : trangThaiStr === "2"
      ? "Chờ vận chuyển"
      : trangThaiStr === "3"
      ? "Đang vận chuyển"
      : trangThaiStr === "4"
      ? "Đã thanh toán"
      : trangThaiStr === "5"
      ? "Thành công"
      : trangThaiStr === "-1"
      ? "Đã hủy"
      : "Đã";

  return (
    <>
      <div className="container-fluid d-flex justify-content-center">
        {/* Tab */}
        <div className="col-md-10 ">
          <div
            className="d-flex fw-bold fs-6 justify-content-end"
            style={{ borderBottom: "1px solid #000" }}
          >
            <p className="me-4 ">Mã đơn hàng : {hoaDonState.ma}</p> |
            <span className="text-danger ms-4">{labelTrangThai}</span>
          </div>

          {/* sản phẩm */}
          <div className="container-fluid mt-3 bg-light radius p-3">
            {listSanPhams.map((sp, index) => (
              <div key={index} className="row align-items-center mb-3">
                {/* Cột ảnh */}
                <div className="col-md-3 d-flex justify-content-center">
                  <img
                    src={sp.linkAnh}
                    alt={sp.tenSP || "image"}
                    width={150}
                    height={150}
                    style={{ borderRadius: 8, objectFit: "cover" }}
                  />
                </div>

                {/* Cột thông tin sản phẩm */}
                <div className="col-md-5">
                  <h6 className="mb-2">
                    {sp.tenHang} {sp.tenSP}
                  </h6>

                  {/* Giá sau giảm */}
                  <div className="text-danger fw-bold">
                    {formatVND(sp.giaBan)}
                  </div>

                  <h6 className="mt-2">Size: {sp.tenKT}</h6>

                  {/* Màu sắc */}
                  <div
                    style={{
                      backgroundColor: sp.maMS,
                      borderRadius: 6,
                      width: 60,
                      height: 25,
                      border: "1px solid black",
                    }}
                  ></div>

                  <h6 className="mt-2">x{sp.soLuong}</h6>
                </div>

                {/* Thành tiền */}
                <div className="col-md-2 text-danger fw-bold text-center">
                  {formatVND(
                    (Number(sp.giaBan) || 0) * (Number(sp.soLuong) || 0)
                  )}
                </div>
              </div>
            ))}
          </div>

          <hr className="mt-5 mb-3" />

          {/* địa chỉ */}
          <div className="ms-4">
            <h4>Địa chỉ nhận hàng</h4>
            <p>{hoaDonState.tenNguoiNhan}</p>
            <p>{hoaDonState.sdt}</p>
            <p>{hoaDonState.diaChi}</p>
          </div>

          <hr className="mt-5 mb-3" />

          {/* thanh toán */}
          <div className="ms-4">
            <h4>Thanh toán</h4>
            <div className="row">
              <div className="col-md-8"></div>
              <div className="col-md-4 fs-6">
                {/* Tổng tiền hàng */}
                <div className="row">
                  <div className="col">Tổng tiền hàng:</div>
                  <div className="col">
                    {formatVND(hoaDonState?.thanhTien || 0)}
                  </div>
                </div>

                {/* Phí vận chuyển */}
                <div className="row mt-3">
                  <div className="col">Phí vận chuyển:</div>
                  <div className="col">
                    {formatVND(hoaDonState?.tienVanChuyen || 0)}
                  </div>
                </div>

                {/* Thành tiền */}
                <div className="row mt-3">
                  <div className="col">
                    <b>Thành tiền</b>
                  </div>
                  <div className="col text-danger fs-5">
                    <b>{formatVND(calcThanhTien(hoaDonState))}</b>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <hr className="mt-5 mb-3" />

          {/* ngày dự kiến */}
          <div className="ms-4 d-flex justify-content-start align-items-center">
            <h5 className="mt-4">Ngày dự kiến:</h5>
            <p className="ms-5 mt-1">
              <img src={LogoGHN} style={{ width: 200, height: 70 }} alt="GHN" />
            </p>
            <p className="mt-4 ms-5 fs-5 text-danger ">
              <b>
                {hoaDonState.ngayDuKienNhan
                  ? moment(hoaDonState.ngayDuKienNhan).format("DD/MM/YYYY")
                  : "-"}
              </b>
            </p>
          </div>

          <hr className="mt-5 mb-3" />

          {/* phương thức thanh toán */}
          <div className="ms-4 d-flex justify-content-start">
            <h5 className="mt-1">Phương thức thanh toán :</h5>
            <p className="ms-5 fs-5 mt-1 text-danger">
              <b>{hoaDonState.phuongThuc}</b>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default DetailTraCuuDonHang;
