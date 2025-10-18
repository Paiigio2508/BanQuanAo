
import React, { useEffect, useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { FaCheckCircle } from "react-icons/fa";
import { GiNotebook, GiPiggyBank, GiReturnArrow } from "react-icons/gi";
import { SlNotebook } from "react-icons/sl";
import { RiTruckFill } from "react-icons/ri";
import { FaMoneyBillTrendUp, FaTruckFast } from "react-icons/fa6";
import { ImCancelCircle } from "react-icons/im";
import LogoGHN from "../../../assets/images/LogoGHN.png";
import { HoaDonClientAPI } from "../../../pages/api/client/HoaDonClientAPI"; // chỉnh đúng path của bạn
import moment from "moment";

const showIcon = (trangThai) => {
  const t = String(trangThai);
  if (t === "0") return GiNotebook;
  if (t === "1") return SlNotebook;
  if (t === "2") return RiTruckFill;
  if (t === "3") return FaTruckFast;
  if (t === "4") return GiPiggyBank;
  if (t === "5") return FaCheckCircle;
  if (t === "10") return GiReturnArrow;
  if (t === "-1") return ImCancelCircle;
  if (t === "-2") return FaMoneyBillTrendUp;
  return GiNotebook;
};

const showTitle = (trangThai) => {
  const t = String(trangThai);
  if (t === "0") return "Chờ xác nhận";
  if (t === "1") return "Đã xác nhận";
  if (t === "2") return "Chờ vận chuyển";
  if (t === "3") return "Đang vận chuyển";
  if (t === "4") return "Đã thanh toán";
  if (t === "5") return "Thành công";
  if (t === "10") return "Trả hàng";
  if (t === "-1") return "Hủy";
  if (t === "-2") return "Hoàn tiền";
  return "Không xác định";
};

const DetailTraCuuDonHang = () => {
  const { idHD } = useParams(); // route: /home-hoa-don/:idHD
  const location = useLocation();
 

  // LẤY hoaDon TỪ TRANG TRƯỚC (nav(..., { state: { hoaDon: res.data } }))
  const initialBill = location.state?.hoaDon ?? null;
  const [bill] = useState(initialBill ?? {});
  const [listSanPhams, setListSanPhams] = useState([]);
  const [listTimeLine, setListTimeLine] = useState([]);
  // Nếu bạn muốn refresh bill khi open trực tiếp (không dùng state),
  // uncomment đoạn fetchBill và gọi HoaDonClientAPI.DetailHoaDonClient(idHD)
useEffect(() => {
  if (!idHD) return;

  const load = async () => {
    try {
      // fetch sản phẩm
      const resSP = await HoaDonClientAPI.detailSanPham(idHD);
      setListSanPhams(Array.isArray(resSP?.data) ? resSP.data : []);
    } catch (e) {
      console.error("detailSanPham error:", e);
      setListSanPhams([]);
    }


  };

  load();
}, [idHD]);

  // helper định dạng VND
  const formatVND = (value) => {
    const n = Number(
      typeof value === "string" ? value.replace(/[^\d.-]/g, "") : value ?? 0
    );
    if (isNaN(n)) return "0 VND";
    return n.toLocaleString("vi-VN") + " VND";
  };
  const calcThanhTien = (bill) => {
    const giaGoc = Number(bill.giaGoc) ;
    const tienVanChuyen = Number(bill.tienVanChuyen);
    const giaGiam = Number(bill.giaGiam) ;
    return giaGoc + tienVanChuyen - giaGiam;
  };
  return (
    <>
      <div className="container-fuild d-flex justify-content-center">
        {/* Tab */}
        <div className="col-md-10 ">
          <div
            className="d-flex fw-bold fs-6 justify-content-end"
            style={{ borderBottom: "1px solid #000" }}
          >
            <p className="me-4 ">Mã đơn hàng : {bill.ma}</p> |
            <span className="text-danger ms-4">
              {bill.trangThai === "0"
                ? "Chờ xác nhận"
                : bill.trangThai === "1"
                ? "Xác nhận"
                : bill.trangThai === "2"
                ? "Chờ vận chuyển"
                : bill.trangThai === "3"
                ? "Đang vận chuyển"
                : bill.trangThai === "4"
                ? "Đã thanh toán"
                : bill.trangThai === "5"
                ? "Thành công"
                : bill.trangThai === "6"
                ? "Trả hàng"
                : bill.trangThai === "-1"
                ? "Đã hủy"
                : bill.trangThai === "-2"
                ? "Hoàn Tiền"
                : bill.trangThai === "10"
                ? "Trả hàng"
                : "Đã"}
            </span>
          </div>

          {/* timeline */}
          <div className="scroll-hoa-don mt-5 mb-4">
            <div className="hoa-don-cuon-ngang">
              {/* <Timeline
                minEvents={6}
                style={{ borderBottom: "1px solid rgb(224, 224, 224)" }}
                placeholder
              >
                {(listTimeLine.length
                  ? listTimeLine
                  : [
                      { trangThai: "0", ngayTao: null },
                      { trangThai: "1", ngayTao: null },
                      { trangThai: "2", ngayTao: null },
                      { trangThai: "3", ngayTao: null },
                      { trangThai: "4", ngayTao: null },
                      { trangThai: "5", ngayTao: null },
                    ]
                ).map((item, index) => (
                  <TimelineEvent
                    minEvents={6}
                    key={`${item.trangThai}-${item.ngayTao ?? index}-${index}`}
                    color={
                      item.trangThai == -1 || item.trangThai == 10
                        ? "#520808"
                        : "#3d874d"
                    }
                    icon={showIcon(item.trangThai)}
                    values={showTitle(item.trangThai)}
                    isOpenEnding={true}
                    title={showTitle(item.trangThai)}
                    subtitle={
                      item.ngayTao
                        ? moment(item.ngayTao).format("hh:mm:ss DD/MM/YYYY")
                        : ""
                    }
                  />
                ))}
              </Timeline> */}
            </div>
          </div>

          {/* sản phẩm */}
          <div className="container-fluid mt-3 bg-light radius p-3">
            {listSanPhams.map((sp, index) => (
              <div key={index} className="row align-items-center mb-3">
                {/* Cột ảnh */}
                <div className="col-md-3 d-flex justify-content-center">
                  <img
                    src={sp.urlHA}
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

                  {/* Giá gốc (nếu có giảm) */}
                  {Number(sp.giaGiam) > 0 && (
                    <div className="text-muted">
                      <del>
                        {formatVND(Number(sp.thanhTienSP) + Number(sp.giaGiam))}
                      </del>
                    </div>
                  )}

                  {/* Giá sau giảm */}
                  <div className="text-danger fw-bold">
                    {formatVND(sp.thanhTienSP)}
                  </div>

                  <h6 className="mt-2">Size: {sp.tenKichThuoc}</h6>

                  {/* Màu sắc */}
                  <div
                    style={{
                      backgroundColor: sp.tenMauSac,
                      borderRadius: 6,
                      width: 60,
                      height: 25,
                      border: "1px solid black",
                    }}
                  ></div>

                  <h6 className="mt-2">x{sp.soLuongSP}</h6>
                </div>

                {/* Thành tiền */}
                <div className="col-md-2 text-danger fw-bold text-center">
                  {formatVND(
                    (Number(sp.thanhTienSP) || 0) * (Number(sp.soLuongSP) || 0)
                  )}
                </div>
              </div>
            ))}
          </div>
          <hr className="mt-5 mb-3" />

          {/* địa chỉ */}
          <div className="ms-4">
            <h4>Địa chỉ nhận hàng</h4>
            <p>{bill.tenNguoiNhan}</p>
            <p>{bill.sdt}</p>
            <p>{bill.diaChi}</p>
          </div>

          <hr className="mt-5 mb-3"></hr>

          {/* thanh toán */}
          <div className="ms-4">
            <h4>Thanh toán</h4>
            <div className="row">
              <div className="col-md-8"></div>
              <div className="col-md-4 fs-6">
                {/* Tổng tiền hàng */}
                <div className="row">
                  <div className="col">Tổng tiền hàng:</div>
                  <div className="col">{formatVND(bill?.giaGoc || 0)}</div>
                </div>

                {/* Phí vận chuyển */}
                <div className="row mt-3">
                  <div className="col">Phí vận chuyển:</div>
                  <div className="col">
                    {formatVND(bill?.tienVanChuyen || 0)}
                  </div>
                </div>

                {/* Voucher */}
                <div
                  className="row mt-3"
                  style={{ borderBottom: "1px solid #000" }}
                >
                  <div className="col">Voucher cửa hàng:</div>
                  <div className="col">-{formatVND(bill?.giaGiam || 0)}</div>
                </div>

                {/* Thành tiền */}
                <div className="row mt-3">
                  <div className="col">
                    <b>Thành tiền</b>
                  </div>
                  <div className="col text-danger fs-5">
                    <b>
                      <b>{formatVND(calcThanhTien(bill))}</b>
                    </b>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <hr className="mt-5 mb-3"></hr>

          {/* ngày dự kiến */}
          <div className="ms-4 d-flex justify-content-start">
            <h5 className=" mt-4">Ngày dự kiến:</h5>
            <p className="ms-5 mt-1">
              <img src={LogoGHN} style={{ width: 200, height: 70 }} alt="GHN" />
            </p>
            <p className="mt-4 ms-5 fs-5 text-danger ">
              <b>
                {" "}
                {bill.ngayDuKienNhan
                  ? moment(bill.ngayDuKienNhan).format("DD/MM/YYYY")
                  : "-"}
              </b>
            </p>
          </div>

          <hr className="mt-5 mb-3"></hr>

          {/* phương thức thanh toán */}
          <div className="ms-4 d-flex justify-content-start">
            <h5 className=" mt-1">Phương thức thanh toán :</h5>
            <p className="ms-5 fs-5 mt-1 text-danger">
              <b>
                {bill.phuongThucVNP === null
                  ? "Thanh toán khi nhận hàng"
                  : "Thanh toán VNP"}
              </b>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};


export default DetailTraCuuDonHang;