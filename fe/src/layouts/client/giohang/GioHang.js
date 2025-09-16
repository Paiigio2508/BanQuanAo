import React, { useState, useEffect } from "react";
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
import Moment from "moment";
import ModalDiaChi from "./modalDiaChi";
import "./giohang.css";
import { get, set } from "local-storage";
import { BanHangClientAPI } from "../../../pages/api/client/banHangClient.api";
import { ShipAPI } from "../../../pages/api/ship/ShipAPI";
export const GioHang = ({ children }) => {
    const [openModalDiaChi, setOpenModalDiaChi] = useState(false);
     const [khachHang, setKhachHang] = useState(null);
       const [diaChi, setDiaChi] = useState(null);
        const [userID, setUserID] = useState("");
          const [ngayShip, setNgayShip] = useState("");
            const [moneyShip, setMoneyShip] = useState("");
              const [soLuongSPGH, setSoLuongSPGH] = useState(0);
       const storedData = get("userData");
       const storedGioHang = get("GioHang");

       // load giỏ hàng mặc định
         const loadDiaChiMacDinh = async () => {
           let idHuyen = "";
           let idXa = "";
           if (storedData?.userID) {
             await BanHangClientAPI.getDiaChiMacDinh(storedData.userID).then(
               (res) => {
                 setDiaChi(res.data);

                 idHuyen = res.data.idHuyen;
                 idXa = res.data.idXa;
               }
             );
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
      <ModalDiaChi
        openModalDiaChi={openModalDiaChi}
        setOpenModalDiaChi={setOpenModalDiaChi}
        userID={userID}
        loadDiaChiMacDinh={loadDiaChiMacDinh}
      />
    </div>
  );
};
