import React, { useState } from "react";
import {
  Button,
  DatePicker,
  Form,
  Select,
  Table,
  Divider,
  Badge,
  Tabs,
  Tag,
  Space,
} from "antd";
import { BsFillEyeFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import moment from "moment";
import Input from "antd/es/input/Input";
import { FaMoneyBills } from "react-icons/fa6";
import { FilterFilled, RetweetOutlined, UnorderedListOutlined } from "@ant-design/icons";

export default function HoaDon() {
  // ================== STATE ==================
  const [hoaDons, setHoaDons] = useState({
    all: [],
    cho: [],
    xn: [],
    cvc: [],
    vc: [],
    tt: [],
    ht: [],
    huy: [],
  });

  // ================== UTILS ==================
  const formatCurrency = (value) =>
    new Intl.NumberFormat("vi-VN").format(value) + " VND";

  const TRANG_THAI_MAP = {
    "-1": { text: "Hủy", color: "#cd201f" },
    0: { text: "Chờ xác nhận", color: "red" },
    1: { text: "Xác nhận", color: "purple" },
    2: { text: "Chờ vận chuyển", color: "geekblue" },
    3: { text: "Vận chuyển", color: "blue" },
    4: { text: "Thanh toán", color: "cyan" },
    5: { text: "Hoàn thành", color: "green" },
  };

  // ================== TABLE COLUMNS ==================
  const columns = [
    {
      title: "STT",
      render: (_, __, index) => index + 1,
    },
    {
      title: "Mã hóa đơn",
      dataIndex: "ma",
      sorter: (a, b) => a.ma - b.ma,
    },
    { title: "Mã NV", dataIndex: "maNV" },
    { title: "Khách hàng", dataIndex: "tenKH" },
    { title: "SDT KH", dataIndex: "sdt" },
    {
      title: "Ngày mua",
      dataIndex: "ngayMua",
      render: (val) => moment(val).format("HH:mm:ss DD/MM/YYYY"),
    },
    {
      title: "Thành tiền",
      dataIndex: "thanhTien",
      render: (val) => <span>{formatCurrency(val)}</span>,
    },
    {
      title: "Trạng thái",
      dataIndex: "trangThai",
      render: (val) => {
        const tt = TRANG_THAI_MAP[val];
        return <Tag color={tt?.color}>{tt?.text || "Khác"}</Tag>;
      },
    },
    {
      title: "Hành động",
      dataIndex: "idHD",
      render: (id) => (
        <Space>
          <Link to={`/admin-detail-hoa-don/${id}`} className="btn btn-danger">
            <BsFillEyeFill />
          </Link>
        </Space>
      ),
    },
  ];

  // ================== COMPONENT TABLE ==================
  const HoaDonTable = ({ data }) => (
    <Table
      dataSource={data}
      columns={columns}
      rowKey="idHD"
      pagination={{
        showQuickJumper: true,
        position: ["bottomCenter"],
        defaultPageSize: 5,
      }}
    />
  );

  // ================== TABS CONFIG ==================
  const tabConfig = [
    { key: "1", label: "Tất cả", data: hoaDons.all },
    { key: "2", label: <Badge count={hoaDons.cho.length}>Chờ xác nhận</Badge>, data: hoaDons.cho },
    { key: "3", label: <Badge count={hoaDons.xn.length}>Xác nhận</Badge>, data: hoaDons.xn },
    { key: "4", label: <Badge count={hoaDons.cvc.length}>Chờ vận chuyển</Badge>, data: hoaDons.cvc },
    { key: "5", label: <Badge count={hoaDons.vc.length}>Vận chuyển</Badge>, data: hoaDons.vc },
    { key: "6", label: <Badge count={hoaDons.tt.length}>Thanh toán</Badge>, data: hoaDons.tt },
    { key: "7", label: "Hoàn thành", data: hoaDons.ht },
    { key: "8", label: <Badge count={hoaDons.huy.length}>Hủy</Badge>, data: hoaDons.huy },
  ];

  const items = tabConfig.map((t) => ({
    key: t.key,
    label: t.label,
    children: <HoaDonTable data={t.data} />,
  }));

  // ================== FORM ==================
  const [form] = Form.useForm();

  return (
    <div className="container-fluid">
      <Divider orientation="center">
        <h2 className="text-start pt-1 fw-bold">
          <FaMoneyBills /> Quản lý hóa đơn
        </h2>
      </Divider>

      {/* Bộ lọc */}
      <div
        className="bg-light m-2 p-3 pt-2"
        style={{
          border: "1px solid #ddd",
          boxShadow: "0 3px 8px rgba(0, 0, 0, 0.1)",
          borderRadius: "8px",
        }}
      >
        <h5 className="text-start">
          <FilterFilled /> Bộ lọc
        </h5>
        <hr />
        <Form
          form={form}
          className="row col-md-12"
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 14 }}
          layout="horizontal"
          style={{ maxWidth: 1600 }}
        >
          <div className="col-md-6">
            <Form.Item label="Tìm kiếm" name="tenHD">
              <Input maxLength={30} />
            </Form.Item>

          </div>
          <div className="col-md-6">
            <Form.Item label="Ngày bắt đầu" name="ngayBDHD">
              <DatePicker style={{ width: "100%" }} />
            </Form.Item>
            <Form.Item label="Ngày kết thúc" name="ngayKTHD">
              <DatePicker style={{ width: "100%" }} />
            </Form.Item>
          </div>
          <Form.Item className="d-flex justify-content-center">
            <Button type="primary" htmlType="reset" icon={<RetweetOutlined />}>
              Làm mới
            </Button>
          </Form.Item>
        </Form>
      </div>

      {/* Bảng hóa đơn */}
      <div
        className="mt-4"
        style={{
          border: "1px solid #ddd",
          boxShadow: "0 3px 6px rgba(0, 0, 0, 0.1)",
          borderRadius: "8px",
          padding: "10px",
        }}
      >
        <div className="text-start fw-bold">
          <p>
            <UnorderedListOutlined /> Danh sách hóa đơn
          </p>
        </div>
        <Tabs defaultActiveKey="1" items={items} />
      </div>
    </div>
  );
}
