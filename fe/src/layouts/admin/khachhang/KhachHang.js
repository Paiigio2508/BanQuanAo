import "./khachhang.css";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState, useEffect } from "react";
import {
  Button,
  Form,
  Input,
  Divider,
  Select,
  Space,
  Table,
  Tag,
  Image,
} from "antd";
import { FilterFilled } from "@ant-design/icons";
import { BsPencilSquare } from "react-icons/bs";
import { PlusCircleOutlined } from "@ant-design/icons";
import { ToastContainer, toast } from "react-toastify";
import { BiSolidUserBadge } from "react-icons/bi";
import { GrMapLocation } from "react-icons/gr";
import { KhachHangAPI } from "../../../pages/api/khachhang/KhachHangAPI";
import { Link, useNavigate } from "react-router-dom";
import ModalDiaChi from "./ModalDiaChi";

export default function KhachHang() {
  const [idKH, setIdKH] = useState("");
  const [componentSize] = useState("default");
  const nav = useNavigate();
  const [openModalDiaChi, setOpenModalDiaChi] = useState(false);
  const [form] = Form.useForm();
  const [khachHang, setKhachHang] = useState([]);

  useEffect(() => {
    loadKhachHang();
  }, []);

  const loadKhachHang = () => {
    KhachHangAPI.getAll()
      .then((res) => setKhachHang(res.data))
      .catch((err) => {
        toast.error("Tải danh sách khách hàng thất bại!");
        console.error(err);
      });
  };

  const onChangeFilter = (changedValues, allValues) => {
    if (
      allValues.hasOwnProperty("tenTimKiem") &&
      typeof allValues.tenTimKiem === "string"
    ) {
      allValues.tenTimKiem = allValues.tenTimKiem.trim();
    }
    timKiemKH(allValues);
  };

  const timKiemKH = (dataSearch) => {
    KhachHangAPI.timKiem(dataSearch)
      .then((res) => setKhachHang(res.data))
      .catch((err) => {
        toast.error("Tìm kiếm khách hàng thất bại!");
        console.error(err);
      });
  };

  const themKH = () => {
    nav("/admin-them-khach-hang");
  };

  const detailDiaChi = (row) => {
    setIdKH(row);
    setOpenModalDiaChi(true);
  };

  const columns = [
    {
      title: "#",
      dataIndex: "id",
      key: "id",
      render: (id, record, index) => index + 1,
      showSorterTooltip: false,
    },
    {
      title: "Ảnh",
      dataIndex: "anh",
      key: "anh",
      align: "center",
      render: (text) => (
        <Image
          width={100}
          height={100}
          style={{ borderRadius: "15px" }}
          src={text}
        />
      ),
    },
    {
      title: "Mã khách hàng",
      dataIndex: "ma",
      sorter: (a, b) => a.ma.localeCompare(b.ma),
    },
    {
      title: "Tên khách hàng",
      dataIndex: "ten",
      sorter: (a, b) => a.ten.localeCompare(b.ten),
    },
    {
      title: "CCCD",
      dataIndex: "cccd",
      sorter: (a, b) => a.cccd.localeCompare(b.cccd),
    },
    {
      title: "Số điện thoại",
      dataIndex: "soDienThoai",
      sorter: (a, b) => a.soDienThoai.localeCompare(b.soDienThoai),
    },
    {
      title: "Giới tính",
      dataIndex: "gioiTinh",
      key: "gioiTinh",
      render: (gioiTinh) => (
        <>
          {gioiTinh === "true" ? (
            <Tag color="blue">Nam</Tag>
          ) : (
            <Tag color="red">Nữ</Tag>
          )}
        </>
      ),
    },
    {
      title: "Ngày sinh",
      dataIndex: "ngaySinh",
      render: (ngaySinh) => <>{new Date(ngaySinh * 1).toLocaleDateString()}</>,
      sorter: (a, b) => a.ngaySinh - b.ngaySinh,
    },
    {
      title: "Trạng thái",
      dataIndex: "trangThai",
      key: "trangThai",
      render: (trangThai) =>
        trangThai === 1 ? (
          <Tag color="red">Không hoạt động</Tag>
        ) : (
          <Tag color="green">Hoạt động</Tag>
        ),
      filters: [
        { text: "Hoạt động", value: "0" },
        { text: "Không Hoạt động", value: "1" },
      ],
      onFilter: (value, record) => record.trangThai.toString() === value,
    },
    {
      title: "Action",
      key: "action",
      dataIndex: "id",
      render: (id) => (
        <Space size="middle">
     
          <Link
            to={`/admin-update-khach-hang/${id}`}
            className="btn btn-danger"
          >
            <BsPencilSquare />
          </Link>
          <Button
            style={{
              width: 41,
              height: 37.6,
              backgroundColor: "#35afb1",
              color: "white",
            }}
            className="btn"
            type="primary"
            onClick={() => detailDiaChi(id)}
          >
            <GrMapLocation />
          </Button>
        </Space>
      ),
      align: "center",
    },
  ];

  return (
    <div className="container-fluid">
      <Divider orientation="center" color="none">
        <h2 className="text-first pt-1 fw-bold">
          <BiSolidUserBadge /> Quản lý khách hàng
        </h2>
      </Divider>

      <div
        className="bg-light m-2 p-3 pt-2"
        style={{
          border: "1px solid #ddd",
          boxShadow: "0 3px 8px rgba(0,0,0,0.1)",
          borderRadius: "8px",
        }}
      >
        <h4 className="text-start">
          <FilterFilled size={30} /> Bộ lọc
        </h4>
        <hr />
        <Form
          className="row "
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 14 }}
          layout="horizontal"
          initialValues={{ size: componentSize }}
          onValuesChange={onChangeFilter}
          size={componentSize}
          form={form}
        >
          <div className="col-md-5">
            <Form.Item label="Tìm kiếm" name="tenTimKiem">
              <Input
                maxLength={30}
                placeholder="Nhập mã hoặc tên hoặc sđt ..."
              />
            </Form.Item>
          </div>
          <div className="col-md-5">
            <Form.Item label="Trạng thái" name="trangThai">
              <Select>
                <Select.Option value="0">Hoạt động</Select.Option>
                <Select.Option value="1">Không hoạt động</Select.Option>
              </Select>
            </Form.Item>
          </div>
        </Form>
        <Form.Item className="text-center">
          <Button className="btn3" htmlType="reset" onClick={loadKhachHang}>
            Làm mới
          </Button>
        </Form.Item>
      </div>

      <div className="text-end mt-3">
        <button onClick={themKH} className="button-them">
          <span className="text">
            <PlusCircleOutlined /> Thêm khách hàng
          </span>
        </button>
      </div>

      <div className="container-fluid mt-4">
        <Table
          dataSource={khachHang}
          columns={columns}
          pagination={{
            showQuickJumper: true,
            position: ["none", "bottomCenter"],
            defaultPageSize: 5,
            defaultCurrent: 1,
            total: khachHang.length,
          }}
          rowKey="id"
        />
      </div>

      {idKH && (
        <ModalDiaChi
          openModalDiaChi={openModalDiaChi}
          setOpenModalDiaChi={setOpenModalDiaChi}
          idKH={idKH}
          setIdKH={setIdKH}
        />
      )}

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
}
