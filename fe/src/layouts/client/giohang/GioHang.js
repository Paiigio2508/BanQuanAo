import React, { useState, useEffect, useCallback } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaMapMarkerAlt } from "react-icons/fa";
import {
  Slider,
  Checkbox,
  Card,
  Col,
  Collapse,
  Row,
  Space,
  Tag,
  Button,
} from "antd";
import LogoVNP from "../../../assets/images/vnp.png";
import Moment from "moment";
import ModalDiaChi from "./modalDiaChi";
import "./giohang.css";
import { get, set } from "local-storage";
import { HomeAPI } from "../../../pages/api/client/HomeAPI";
import { ShipAPI } from "../../../pages/api/ship/ShipAPI";
import GioHangChiTiet from "./GioHangChiTiet";
import { GioHangAPI } from "../../../pages/api/client/GioHangAPI";
export const GioHang = ({ children }) => {
  const [openModalDiaChi, setOpenModalDiaChi] = useState(false);
  const [khachHang, setKhachHang] = useState(null);
  const [diaChi, setDiaChi] = useState(null);
  const [userID, setUserID] = useState("");
  const [ngayShip, setNgayShip] = useState("");
  const [moneyShip, setMoneyShip] = useState("");
  const [email, setEmail] = useState(null);
  const [gioHangCT, setGioHangCT] = useState(0);
  const [clickCountTM, setClickCountTM] = useState(1);
  const [clickCountVNP, setClickCountVNP] = useState(0);
  const [phuongThuc, setPhuongThuc] = useState(0);
  const storedData = get("userData");
  const storedGioHang = get("GioHang");
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
    // loadGHCT();
  }, []);
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
    // if (idHuyen && idXa) {
    //   setNgayShip(
    //     await ShipAPI.fetchAllDayShip(idHuyen, idXa).then(
    //       (res) => res.data.data.leadtime * 1000
    //     )
    //   );
    //   setMoneyShip(
    //     await ShipAPI.fetchAllMoneyShip(idHuyen, idXa, soLuongSPGH).then(
    //       (res) => res.data.data.total
    //     )
    //   );
    // }
  };
  const ensureCartId = useCallback(async () => {
    if (storedData?.userID) {
      const r = await GioHangAPI.getByIDKH(storedData.userID);
      return r?.data?.id || null;
    }
    return storedGioHang?.id || null;
  }, [storedData, storedGioHang]);

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
        <div className="mt-4 row">
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
      <div className="row mt-5">
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
        <div className="col-md-4 donHangOL ">
          <h4 className="text-center">Hóa đơn</h4>
          <hr
            style={{ height: 2, backgroundColor: "black", fontWeight: "bold" }}
          />

          <div className="row ps-2 pb-2 mt-3">
            <div className="col-md-6" style={{ marginLeft: 30 }}>
              <span>Đơn hàng</span>
            </div>
            <div className="col-md-5">
              <span style={{ color: "blue" }}>3,000,000</span> <span>VND</span>
            </div>
          </div>

          <div
            className="row ps-2 pb-2 mt-3"
            style={{ borderBottom: "1px dashed black" }}
          >
            <div className="col-md-6" style={{ marginLeft: 30 }}>
              <span>Giảm</span>
            </div>
            <div className="col-md-5">
              <span style={{ color: "blue" }}>200,000</span> <span>VND</span>
            </div>
          </div>

          <div className="ps-2 pb-2 mt-3 d-flex align-items-end">
            <h5 className="col-md-6" style={{ marginLeft: 30 }}>
              <span>Tổng tiền</span>
            </h5>
            <h5 className="col-md-5">
              <span style={{ color: "blue" }}>2,800,000 VND</span>
            </h5>
          </div>

          {/* Nút thanh toán */}
          <div className="text-center mt-3">
            <button className="btn btn-primary w-75">Thanh toán</button>
          </div>
        </div>
      </div>
      <div className="row">
        <h5 className="col-md-3 d-flex align-items-center">
          Phương thức thanh toán
        </h5>
        <div className="col-md-8">
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

      {/* Thông tin thanh toán */}
      <div className="row">
        <div className="col-md-7"></div>
        <div className="col-md-5 fw-bold">
          <div className="row">
            <h5 className="col">Tổng tiền</h5>
            <h5 className="col">: 3,000,000 VND</h5>
          </div>

          <div className="row mt-3">
            <h5 className="col">Phí vận chuyển</h5>
            <h5 className="col">: 30,000 VND</h5>
          </div>

          <div className="row mt-3" style={{ color: "red" }}>
            <h5 className="col">Tổng thanh toán</h5>
            <h5 className="col">: 2,830,000 VND</h5>
          </div>

          <hr className="mt-5 mb-5" />

          <div className="d-flex flex-row-reverse bd-highlight mb-5">
            <a href="#btnCheckout" className="checkout-button" id="btnCheckout">
              Thanh toán ngay!
            
            </a>
          </div>
        </div>
      </div>

      <ModalDiaChi
        openModalDiaChi={openModalDiaChi}
        setOpenModalDiaChi={setOpenModalDiaChi}
        userID={userID}
        loadDiaChiMacDinh={loadDiaChiMacDinh}
      />
    </div>
  );
};
