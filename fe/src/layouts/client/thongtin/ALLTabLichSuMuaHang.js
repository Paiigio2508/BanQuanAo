import { Breadcrumb, Tabs } from "antd";
import React, { useEffect, useState } from "react";
import { get } from "local-storage";
import { HoaDonClientAPI } from "../../../pages/api/client/HoaDonClientAPI";
import TabHistoryClient from "./TabHistoryClient";
import ProfileMenu from "./thongtintaikhoan/ProfileMenu";
import { Link } from "react-router-dom";

const ALLTabLichSuMuaHang = () => {
  const [listBill, setListBill] = useState([]);
  const storedData = get("userData") || {};
  const [userName, setUserName] = useState("");
  const [AnhUser, setLinkAnhUser] = useState("");
  const id = storedData?.userID;
  const [key, setKey] = useState("10");

  const keyToStatusMapping = {
    1: "0",
    2: "1",
    3: "2",
    4: "3",
    5: "4",
    6: "-1",
    10: "",
  };

useEffect(() => {
  setUserName(storedData?.ten || "");
  setLinkAnhUser(storedData?.anh || "");
  const trangThai = keyToStatusMapping[key] ?? "";

  const payload = { id, trangThai };

  HoaDonClientAPI.getALLHoaDonOnlineByIdKH(payload).then((res) => {
    const data = Array.isArray(res?.data) ? res.data : [];
    const promises = data.map((item) =>
      HoaDonClientAPI.detailSanPham(item.idHD).then((resSP) => {
        // Tùy cấu trúc backend: resSP.data hay resSP.data.data
        const hoaDonDetail = Array.isArray(resSP?.data) ? resSP.data : [];
        return {
          id: item.idHD,
          ma: item.ma,
          thanhTien: item.thanhTien,
          trangThai: item.trangThai,
          hoaDonDetail,
        };
      })
    );

    Promise.all(promises).then((results) => {
      setListBill(results);
    
    });
  });
}, [key, id, storedData?.ten, storedData?.anh]);
  const onChange = (k) => setKey(k);

  return (
    <div className="container">
      <Breadcrumb
        style={{
          marginBottom: 10,
          borderBottom: "1px solid #E2E1E4",
          paddingBottom: 5,
        }}
      >
        <Breadcrumb.Item>
          <Link to="/" className="no-underline text-dark">
            Trang chủ
          </Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <Link to="/thong-tin-tai-khoan" className="no-underline text-dark">
            Thông tin tài khoản
          </Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <Link to="/lich-su-mua-hang" className="no-underline text-dark">
            <b>Đơn mua</b>
          </Link>
        </Breadcrumb.Item>
      </Breadcrumb>

      <div className="row mt-4 mb-5">
        <ProfileMenu />
        <div className="col-md-9" style={{ padding: 20 }}>
          <Tabs onChange={onChange} type="card">
            <Tabs.TabPane tab="Tất cả" key="10">
              <TabHistoryClient listBill={listBill} />
            </Tabs.TabPane>
            <Tabs.TabPane tab="Chờ xác nhận" key="1">
              <TabHistoryClient listBill={listBill} />
            </Tabs.TabPane>
            <Tabs.TabPane tab="Xác nhận" key="2">
              <TabHistoryClient listBill={listBill} />
            </Tabs.TabPane>
            <Tabs.TabPane tab="Chờ vận chuyển" key="3">
              <TabHistoryClient listBill={listBill} />
            </Tabs.TabPane>
            <Tabs.TabPane tab="Vận chuyển" key="4">
              <TabHistoryClient listBill={listBill} />
            </Tabs.TabPane>
            <Tabs.TabPane tab="Hoàn thành" key="5">
              <TabHistoryClient listBill={listBill} />
            </Tabs.TabPane>
            <Tabs.TabPane tab="Đã hủy" key="6">
              <TabHistoryClient listBill={listBill} />
            </Tabs.TabPane>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default ALLTabLichSuMuaHang;