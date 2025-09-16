import { Button, Modal, Table, Tag, Radio } from "antd";
import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import { HomeAPI } from "../../../pages/api/client/HomeAPI";
import ModalUpdateDiaChiClient from "./modalupdateDiaChiClient";
import AddModalDiaChiClient from "./addNewDiaChiClient";

const ModalDiaChi = (props) => {
  const { openModalDiaChi, setOpenModalDiaChi, loadDiaChiMacDinh, userID } =
    props;
  const [nowAddress, setNowAddress] = useState("");
  const [datas, setData] = useState([]);
  const [ngayDuKienGiao, setNgayDuKienGiao] = useState(null);

  const [openModalAddDiaChi, setOpenModalAddDiaChi] = useState(false);
  const [openModalUpdateDiaChi, setOpenModalUpdateDiaChi] = useState(false);
  const [diaChiUpdate, setDiaChiUpdate] = useState({});

  const handleClose = () => setOpenModalDiaChi(false);
  const handleOpenADDModalDiaChi = () => setOpenModalAddDiaChi(true);

  const handleOpenUpdateDiaChi = (value) => {
    setDiaChiUpdate(value);
    setOpenModalUpdateDiaChi(true);
  };

  // load địa chỉ khách hàng
  const loadDiaChi = () => {
    if (userID) {
      HomeAPI.getDiaChiByKHClient(userID)
        .then((result) => {
          setData(result.data);
          result.data.forEach((item) => {
            if (item.trangThai === 0) {
              setNowAddress(item.id);
            }
          });
        })
        .catch((error) => console.log(error));
    }
  };

  // cập nhật địa chỉ mặc định
  const handleUpdateTT = () => {
    HomeAPI.updateDiaChiMacDinhKHClient(nowAddress)
      .then(() => {
        toast("✔️ Cập nhật địa chỉ mặc định thành công!", { theme: "light" });
        loadDiaChi();
        loadDiaChiMacDinh();

        // 👉 set ngày dự kiến giao: cộng 3 ngày từ hôm nay
        const today = new Date();
        today.setDate(today.getDate() + 3);
        const dateStr = today.toLocaleDateString("vi-VN");
        setNgayDuKienGiao(dateStr);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    if (userID) loadDiaChi();
  }, [userID]);

  const dataSource = datas.map((item) => ({
    key: item.id,
    id: item.id,
    tenNguoiNhan: item.tenNguoiNhan,
    soDienThoai: item.soDienThoai,
    tenThanhPho: item.tenThanhPho,
    idThanhPho:item.idThanhPho,
    tenHuyen: item.tenHuyen,
    idHuyen:item.idHuyen,
    tenXa: item.tenXa,
    idXa:item.idXa,
    diaChi: item.diaChi,
    trangThai: item.trangThai,
  }));

  const columns = [
    {
      render: (_, record) => (
        <Radio
          checked={nowAddress === record.id}
          onChange={() => setNowAddress(record.id)}
        />
      ),
    },
    {
      title: "Địa chỉ giao hàng",
      dataIndex: "id",
      key: "id",
      render: (_, record) => (
        <div>
          <h6>
            {record.tenNguoiNhan} | {record.soDienThoai}
          </h6>
          <p>
            {record.diaChi}, {record.tenXa}, {record.tenHuyen},{" "}
            {record.tenThanhPho}
          </p>
          {record.trangThai === 0 && <Tag color="red">Mặc định</Tag>}
        </div>
      ),
    },
    {
      render: (_, record) => (
        <Button type="primary" onClick={() => handleOpenUpdateDiaChi(record)}>
          Cập nhật
        </Button>
      ),
    },
  ];

  return (
    <Modal
      title="Địa chỉ"
      centered
      open={openModalDiaChi}
      onCancel={handleClose}
      footer={null}
      width={600}
    >
      <Button
        style={{ marginBottom: 16, float: "right" }}
        type="primary"
        onClick={handleOpenADDModalDiaChi}
      >
        + Thêm địa chỉ mới
      </Button>

      <Table
        pagination={{
          showQuickJumper: true,
          position: ["bottomCenter"],
          defaultPageSize: 5,
        }}
        columns={columns}
        dataSource={dataSource}
      />
      <div style={{ textAlign: "right", marginTop: 16 }}>
        <Button onClick={handleClose} style={{ marginRight: 8 }}>
          Đóng
        </Button>
        <Button type="primary" onClick={handleUpdateTT}>
          Cập nhật mặc định
        </Button>
      </div>

      <ToastContainer autoClose={5000} theme="light" />

      <AddModalDiaChiClient
        openModalAddDiaChi={openModalAddDiaChi}
        setOpenModalAddDiaChi={setOpenModalAddDiaChi}
        idKH={userID}
        loadDiaChi={loadDiaChi}
      />
      <ModalUpdateDiaChiClient
        openModalUpdateDiaChi={openModalUpdateDiaChi}
        setOpenModalUpdateDiaChi={setOpenModalUpdateDiaChi}
        diaChiUpdate={diaChiUpdate}
        setDiaChiUpdate={setDiaChiUpdate}
        loadDiaChi={loadDiaChi}
      />
    </Modal>
  );
};

export default ModalDiaChi;
