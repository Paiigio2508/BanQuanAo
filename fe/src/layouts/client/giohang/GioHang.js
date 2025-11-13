import React, { useState, useEffect, useCallback, useMemo } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaMapMarkerAlt } from "react-icons/fa";
import {
  Tag,
  Button,
  Modal,
} from "antd";
import LogoVNP from "../../../assets/images/vnp.png";
import Moment from "moment";
import ModalDiaChi from "./modalDiaChi";
import "./giohang.css";
import localStorage, { get, set } from "local-storage";
import { HomeAPI } from "../../../pages/api/client/HomeAPI";
import { ShipAPI } from "../../../pages/api/ship/ShipAPI";
import GioHangChiTiet from "./GioHangChiTiet";
import { GioHangAPI } from "../../../pages/api/client/GioHangAPI";
import { BanHangClientAPI } from "../../../pages/api/client/BanHangClientAPI";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
export const GioHang = ({ children }) => {
  const [openModalDiaChi, setOpenModalDiaChi] = useState(false);
  const [khachHang, setKhachHang] = useState(null);
  const [diaChi, setDiaChi] = useState(null);
  const [userID, setUserID] = useState("");
  const [ngayShip, setNgayShip] = useState("");
  const [moneyShip, setMoneyShip] = useState("");
  const [email, setEmail] = useState(null);
  const [gioHangCT, setGioHangCT] = useState([]);
  const [clickCountTM, setClickCountTM] = useState(1);
  const [clickCountVNP, setClickCountVNP] = useState(0);
  const [phuongThuc, setPhuongThuc] = useState(0);
  const storedData = get("userData");
  const storedGioHang = get("GioHang");
  const [dataVanChuyen, setDataVanchuyen] = useState("");
  const router = useNavigate();
    const getButtonTMType = () => {
      // Xác định loại button dựa trên giá trị biến đếm
      return clickCountTM % 2 === 0 ? "default" : "primary";
    };
    const getButtonVNPType = () => {
      // Xác định loại button dựa trên giá trị biến đếm
      return clickCountVNP % 2 === 0 ? "default" : "primary";
    };
      const handleClickButtonVNP = () => {
        setClickCountVNP((prevCount) => prevCount + 1);
        setClickCountTM(0);
        setPhuongThuc(1);
      };
        const handleClickButtonTM = () => {
          setClickCountTM((prevCount) => prevCount + 1);
          setClickCountVNP(0);
          setPhuongThuc(0);
        };

  useEffect(() => {
    if (storedData) {
      setKhachHang(storedData.userID);
      setEmail(storedData.email);
      setUserID(storedData.userID);
      loadDiaChiMacDinh();
    }
    loadGHCT();
  }, []);
  //tính số lượng sp trong giỏ hàng
  const soLuongSPGH = useMemo(
    () => gioHangCT.reduce((sum, gh) => sum + Number(gh?.soLuong || 0), 0),
    [gioHangCT]
  );
  //tính tổng tiền
  const total = useMemo(
    () => gioHangCT.reduce((sum, gh) => sum + Number(gh?.thanhTien || 0), 0),
    [gioHangCT]
  );
  // load giỏ hàng mặc định
  const loadDiaChiMacDinh = async () => {
    let idHuyen = "";
    let idXa = "";
    if (storedData?.userID) {
      await HomeAPI.getDiaChiMacDinhKHClient(storedData.userID).then((res) => {
        setDiaChi(res.data);
        idHuyen = res.data.idHuyen;
        idXa = res.data.idXa;
      });
    }
    if (idHuyen && idXa) {
      setNgayShip(
        await ShipAPI.fetchAllDayShip(idHuyen, idXa).then(
          (res) => res.data.data.leadtime * 1000
        )
      );
      setMoneyShip(
        await ShipAPI.fetchAllMoneyShip(idHuyen, idXa, soLuongSPGH).then(
          (res) => res.data.data.total
        )
      );
    }
  };
  // lấy thông tin giỏ hàng
  const ensureCartId = useCallback(async () => {
    if (storedData?.userID) {
      const r = await GioHangAPI.getByIDKH(storedData.userID);
      return r?.data?.id || null;
    }
    return storedGioHang?.id || null;
  }, [storedData, storedGioHang]);
// hiển thị giỏ hàng chi tiết
  const loadGHCT = useCallback(async () => {
    try {
      const cartId = await ensureCartId();
      if (!cartId) {
        setGioHangCT([]);
        return;
      }
      const { data: items = [] } = await GioHangAPI.getAllGhctByIdGh(cartId);
      setGioHangCT(items);
    } catch (e) {
      console.error("loadGHCT:", e);
      setGioHangCT([]);
    }
  }, [ensureCartId]);
  // khi lỗi thì hiển thị message
  const showErr = (msg) =>
  toast.error(msg, {
    position: "top-right",
    autoClose: 1000,
    theme: "light",
  });
  // ====== Thanh toán ======
  const handleMuaHang = async (
    total,
    gioHangCT,
    userID,
    diaChi,
    phuongThuc, // 0 = COD, 1 = VNPAY
    dataVanChuyen
  ) => {
    if (!gioHangCT?.length) return showErr("Giỏ hàng trống!");
    if (total >= 15000000)
      return showErr("Vui lòng không mua quá 15.000.000 VND!");

    if (!diaChi && !dataVanChuyen) {
      return showErr("Vui lòng nhập địa chỉ giao hàng!");
    }

    const hdct = gioHangCT.map(({ idCTSP, thanhTien, soLuong, idGioHang }) => ({
      idCTSP,
      donGia: thanhTien,
      soLuong,
      idGioHang,
    }));

    const diaChiText = diaChi
      ? `${diaChi.diaChi}/${diaChi.tenXa}/${diaChi.tenHuyen}/${diaChi.tenThanhPho}`
      : dataVanChuyen?.diaChi;

    const hoaDon = {
      idPayMethod: phuongThuc,
      maGiaoDich: "",
      idUser: userID,
      tongTien: total,
      diaChi: diaChiText,
      email: email ?? dataVanChuyen?.email ,
      tenNguoiNhan:
        diaChi?.tenNguoiNhan ??
        dataVanChuyen?.tenNguoiNhan ,
      tienShip: moneyShip,
      ngayDuKienNhan: ngayShip,
      sdt:
        diaChi?.soDienThoai ??
        dataVanChuyen?.soDienThoai ,
      listHDCT: hdct,
    };

    const tongThanhToan = total + moneyShip;

    try {
      if (phuongThuc === 1) {
        const res = await BanHangClientAPI.getLinkVnpay(tongThanhToan);
        const data = res?.data;
        if (!data) {
          return showErr("Không lấy được link thanh toán VNPAY");
        }

        const maGiaoDich = Object.keys(data)[0];
        const url = data[maGiaoDich];

        localStorage.setItem(
          "formData",
          JSON.stringify({ ...hoaDon, maGiaoDich })
        );
        window.location.href = url;
        return;
      }

      const check = await BanHangClientAPI.checkout(hoaDon);
      if (check?.data) {
        setMoneyShip(0);
        router("/thanh-toan-thanh-cong");
      } else {
        showErr("Số lượng sản phẩm không đủ!");
        return;
      }
    } catch (e) {
      console.error(e);
      showErr("Có lỗi khi xử lý thanh toán. Vui lòng thử lại!");
    } finally {
    }
  };
  return (
    <div className="container-fuild">
      <div className="banner-san-pham-shop mt-4">
        <img
          src="https://png.pngtree.com/background/20210715/original/pngtree-white-gray-wave-abstract-background-soft-design-graphic-banner-background-picture-image_1298688.jpg"
          alt="Logo Banner"
        />
        <h1 className="banner-title-logo">Giỏ hàng</h1>
      </div>
      {/* địa chỉ */}
      <div className="xBNaac"></div>
      {khachHang !== null && diaChi !== null ? (
        <div className="mt-4 row ps-5 fs-5">
          {/* địa chỉ  */}
          <h5 style={{ color: "red" }}>
            <FaMapMarkerAlt size={25} className="text-danger" />
            <span className="ms-2"> Địa Chỉ Nhận Hàng</span>
          </h5>
          <div className="row mt-1">
            <h6 className="col-md-12">
              <b>
                {diaChi.tenNguoiNhan} | {diaChi.soDienThoai}
              </b>
              <span style={{ marginLeft: 40 }}>
                {diaChi.diaChi}, {diaChi.tenXa}, {diaChi.tenHuyen},{" "}
                {diaChi.tenThanhPho}
              </span>
              {diaChi.trangThai == 0 ? (
                <span style={{ marginLeft: 40 }}>
                  <Tag color="red">Mặc định</Tag>
                </span>
              ) : (
                <></>
              )}

              <Button
                style={{ marginLeft: 30 }}
                onClick={() => setOpenModalDiaChi(true)}
              >
                Thay đổi
              </Button>
            </h6>
          </div>
          <div className="col-md-6 align-self-center fw-bold">
            <p>
              Thời gian giao hàng dự kiến :{" "}
              <span className="text-danger">
                {ngayShip
                  ? Moment(ngayShip).format("DD/MM/yyyy")
                  : "dd/MM/yyyy"}
              </span>
            </p>
          </div>
        </div>
      ) : khachHang && !diaChi ? (
        <>
          <Button
            style={{ marginLeft: 30, width: 100, height: 50, marginTop: 20 }}
            onClick={() => setOpenModalDiaChi(true)}
          >
            Chọn địa chỉ
          </Button>
        </>
      ) : (
        <></>
      )}
      <div className="row mt-5 ps-5 pe-5">
        {/* Bảng sản phẩm */}
        <div className="col-md-8">
        {gioHangCT?.length
            ? gioHangCT.map((ghct) => (
                <GioHangChiTiet
                  key={ghct.idGH || ghct.idCTSP || ghct.id}
                  product={ghct}
                  loadghct={loadGHCT}
                />
              ))
            : ""}
        </div>

        {/* Hóa đơn */}
        <div className="col-md-4 donHangOL pt-4 pb-4">
          <h4 className="text-center fw-bold fs-2">Hóa đơn</h4>
          <hr
            style={{ height: 2, backgroundColor: "black", fontWeight: "bold" }}
          />

          <div className="row ps-2 pb-2 mt-3 fs-3">
            <div className="col-md-6" style={{ marginLeft: 30 }}>
              <span>Đơn hàng</span>
            </div>
            <div className="col-md-5">
              <span style={{ color: "blue" }}>{Intl.NumberFormat("en-US").format(total)}</span> <span>VND</span>
            </div>
          </div>

          <div
            className="row ps-2 pb-2 mt-3 fs-3"
          >
            <div className="col-md-6" style={{ marginLeft: 30 }}>
              <span>Phí ship</span>
            </div>
            <div className="col-md-5">
              <span style={{ color: "blue" }}>{Intl.NumberFormat("en-US").format(moneyShip)}</span> <span>VND</span>
            </div>
          </div>
          <hr
            style={{ height: 2, backgroundColor: "black", fontWeight: "bold" }}
          />
          <div className="ps-2 pb-2 mt-3 d-flex align-items-end fs-3 fw-bold">
            <div className="col-md-6" style={{ marginLeft: 30 }}>
              <span>Tổng tiền</span>
            </div>
            <div className="col-md-5">
              <span style={{ color: "red", fontWeight:"bolder" }}>{Intl.NumberFormat("en-US").format(total+moneyShip)} VND</span> 
            </div>
          </div>

          {/* Nút thanh toán */}
          <div className="text-center mt-3">
            <button className="btn btn-primary w-50 fs-4"
            onClick={()=>{handleMuaHang(
              total,
              gioHangCT,
              userID,
              diaChi,
              phuongThuc,
              dataVanChuyen
            );}}
            >
              {phuongThuc === 0 ? "Đặt hàng" : "Thanh toán"}
            </button>
          </div>
        </div>
      </div>
      <div className="row ps-5">
        <h5 className="col-md-2 d-flex align-items-center">
          Phương thức thanh toán:
        </h5>
        <div className="col-md-6 ps-5">
          <Button
            style={{ width: 300, height: 50 }}
            type={getButtonTMType()}
            onClick={handleClickButtonTM}
          >
            Thanh toán khi nhận hàng
          </Button>
          <Button
            className="ms-4"
            style={{ width: 300, height: 50 }}
            type={getButtonVNPType()}
            onClick={handleClickButtonVNP}
          >
            Thanh toán VNP
            <img
              className="ms-2"
              src={LogoVNP}
              style={{ width: 20, height: 20 }}
            ></img>
          </Button>
        </div>
      </div>
      <hr className="mt-5 mb-5" />

      <ModalDiaChi
        openModalDiaChi={openModalDiaChi}
        setOpenModalDiaChi={setOpenModalDiaChi}
        userID={userID}
        loadDiaChiMacDinh={loadDiaChiMacDinh}
      />
    </div>
  );
};
