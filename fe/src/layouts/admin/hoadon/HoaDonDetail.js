import { useLocation, useParams, useNavigate } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import { RiTruckFill } from "react-icons/ri";
import { SlNotebook } from "react-icons/sl";
import { GiNotebook } from "react-icons/gi";
import { FaMoneyBillTrendUp, FaTruckFast } from "react-icons/fa6";
import { ImCancelCircle } from "react-icons/im";
import { Button, Form, Table, Modal, Input } from "antd";
import { HoaDonAPI } from "../../../pages/api/hoadon/HoaDonAPI";
import { get } from "local-storage";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function HoaDonDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { state } = useLocation();

  const [hoaDonState, setHoaDonState] = useState(state?.hoaDon || null);
  const [listSanPhams, setlistSanPhams] = useState([]);
  const { TextArea } = Input;
  const storedData = get("userData");
  const maNV = storedData?.ma || null;
  // Helper format tiền VND
  const fmtVND = (n) =>
    new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(Number(n || 0));

  const thanhTien = Number(hoaDonState?.thanhTien ?? 0);
  const phiShip = Number(hoaDonState?.tienVanChuyen ?? 0);
  const tong = thanhTien + phiShip;
  // Modal & Form
  const [isModalVanDon, setIsModalVanDon] = useState(false);
  const [formVanDon] = Form.useForm();

  const [isModalHuy, setIsModalHuy] = useState(false);
  const [formHuy] = Form.useForm();

  // Fetch chi tiết hóa đơn
  const fetchHoaDonById = async () => {
    try {
      const res = await HoaDonAPI.detailHD(id);
      setHoaDonState(res.data);
    } catch (e) {
      console.error(e);
      toast.error("Không tải được chi tiết đơn hàng.");
    }
  };
  const loadListSanPhams = () => {
    HoaDonAPI.detailSanPham(id).then((res) => {
      setlistSanPhams(res.data);
    });
  };
  useEffect(() => {
    loadListSanPhams();
    console.log(listSanPhams);
    if (!hoaDonState) fetchHoaDonById();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!hoaDonState) navigate("/admin-hoa-don", { replace: true });
  }, [hoaDonState, navigate]);

  const STATUS_MAP = useMemo(
    () => ({
      0: { label: "Chờ xác nhận", icon: <GiNotebook />, nextBtn: "Xác nhận" },
      1: { label: "Xác nhận", icon: <SlNotebook />, nextBtn: "Chờ vận chuyển" },
      2: {
        label: "Chờ vận chuyển",
        icon: <RiTruckFill />,
        nextBtn: "Vận chuyển",
      },
      3: { label: "Vận chuyển", icon: <FaTruckFast />, nextBtn: "Thành công" },
      4: { label: "Thành công", icon: <FaMoneyBillTrendUp />, nextBtn: null },
      "-1": { label: "Đã hủy", icon: <ImCancelCircle />, nextBtn: null },
    }),
    []
  );

  // Handlers: vận đơn
  const openVanDon = () => setIsModalVanDon(true);
  const closeVanDon = () => {
    setIsModalVanDon(false);
    formVanDon.resetFields();
  };
  const submitVanDon = async (values) => {
    try {
      if (!maNV)
        return toast.error("Thiếu mã nhân viên. Vui lòng đăng nhập lại.");
      const payload = { ...values, maNV };
      await HoaDonAPI.updateTTHoaDon(id, payload);
      closeVanDon();
      await fetchHoaDonById();
      toast.success("Cập nhật trạng thái/ghi chú thành công!");
    } catch (err) {
      console.error(err);
      toast.error("Có lỗi khi cập nhật.");
    }
  };

  // Handlers: hủy đơn
  const openHuy = () => setIsModalHuy(true);
  const closeHuy = () => {
    setIsModalHuy(false);
    formHuy.resetFields();
  };
  const submitHuy = async (values) => {
    try {
      if (!maNV)
        return toast.error("Thiếu mã nhân viên. Vui lòng đăng nhập lại.");

      // Tuỳ BE: nếu có endpoint riêng hãy dùng, còn không có thể tái dùng updateTTHoaDon
      // ví dụ thêm trangThai=-1 + ghi chú hủy:
      const payload = {
        ...values, // { lyDoHuy: "..."} hoặc { ghiChu: "..."} tuỳ bạn đặt name
        maNV,
        trangThai: -1, // gợi ý: BE đọc và set -1
        action: "CANCEL", // nếu BE cần phân biệt hành động
      };

      // Nếu bạn có API riêng:
      // await HoaDonAPI.huyHoaDon(id, payload);
      // Nếu tái dùng update:
      await HoaDonAPI.updateTTHoaDon(id, payload);

      closeHuy();
      await fetchHoaDonById();
      toast.success("Đã hủy đơn hàng.");
    } catch (err) {
      console.error(err);
      toast.error("Hủy đơn thất bại.");
    }
  };

  if (!hoaDonState) return null;

  const ttKey = String(hoaDonState.trangThai ?? "0");
  const statusInfo = STATUS_MAP[ttKey] ?? {
    label: "Không xác định",
    icon: null,
    nextBtn: null,
  };

  const columnsChiTietSanPham = [
    {
      title: "STT",
      key: "stt",
      render: (_val, _rec, index) => index + 1,
      width: 70,
    },
    {
      title: "Hình ảnh",
      dataIndex: "linkAnh",
      key: "linkAnh",
      render: (src) =>
        src ? (
          <img
            src={src}
            alt="SP"
            style={{ width: 60, height: 60, objectFit: "cover" }}
          />
        ) : (
          "-"
        ),
    },
    {
      title: "Thông tin sản phẩm",
      key: "thongTinSP",
      render: (_, record) => (
        <>
          <div>
            {record.tenSP} {record.tenHang}, size:
            <span className="text-danger">{record.tenKT}</span> <b>Màu sắc:</b>{" "}
            {record.tenMS}
          </div>

          <div
            style={{
              backgroundColor: `${record.maMS}`,
              borderRadius: 6,
              width: 60,
              height: 25,
            }}
            className="custom-div"
          ></div>
        </>
      ),
    },
    { title: "Số lượng", dataIndex: "soLuong", key: "soLuong", width: 100 },
    {
      title: "Giá bán",
      dataIndex: "giaBan",
      key: "giaBan",
      render: (v) =>
        new Intl.NumberFormat("vi-VN", {
          style: "currency",
          currency: "VND",
        }).format(v ?? 0),
      width: 140,
    },
    {
      title: "Tổng tiền",
      key: "tongTien",
      render: (_, record) => {
        const tong = record.soLuong * record.giaBan;
        return tong.toLocaleString() + " ₫";
      },
    },
  ];

  return (
    <div>
      <h3 className="text-center">
        Thông tin đơn hàng :{" "}
        <span className="text-danger">{hoaDonState.ma}</span>
      </h3>

      <div className="row">
        <div className="col-md-4">
          <h5>Tên khách hàng : {hoaDonState.tenKH}</h5>
          <h5>Số điện thoại : {hoaDonState.sdt}</h5>
          <h5>Ngày mua: {hoaDonState.ngayMua}</h5>
          <div>
            <h5>
              Trạng thái: {statusInfo.label}{" "}
              <span className="text-success" style={{ fontSize: 30 }}>
                {statusInfo.icon}
              </span>
            </h5>
          </div>
          <h5>Ghi chú: {hoaDonState.ghiChu}</h5>
        </div>

        <div className="justify-content-center d-flex">
          {ttKey !== "4" && ttKey !== "-1" && statusInfo.nextBtn && (
            <Button className="text-white bg-primary me-3" onClick={openVanDon}>
              {statusInfo.nextBtn}
            </Button>
          )}
          {["0", "1", "2"].includes(ttKey) && (
            <Button className="text-white bg-danger" onClick={openHuy}>
              Hủy đơn
            </Button>
          )}
        </div>
      </div>

      <div>
        <h3 className="text-danger d-flex justify-content-center mt-5 ">
          Chi tiết sản phẩm
        </h3>
        <Table
          columns={columnsChiTietSanPham}
          dataSource={listSanPhams} // ✅ NÊN CÓ
          rowKey="id" // hoặc "idCTSP" nếu unique theo chi tiết
          style={{ marginTop: 25 }}
        />
      </div>

      {/* Modal vận đơn */}
      <Modal
        title="Cập nhật vận đơn / ghi chú"
        footer={null}
        open={isModalVanDon}
        onCancel={closeVanDon}
        destroyOnClose
      >
        <Form form={formVanDon} layout="vertical" onFinish={submitVanDon}>
          <Form.Item
            label="Ghi chú"
            name="ghiChu"
            hasFeedback
            rules={[
              { required: true, message: "Vui lòng không để trống ghi chú!" },
            ]}
          >
            <TextArea rows={4} />
          </Form.Item>

          <div className="d-flex justify-content-end gap-2">
            <Button onClick={closeVanDon}>Hủy</Button>
            <Button type="primary" htmlType="submit">
              Xác nhận
            </Button>
          </div>
        </Form>
      </Modal>

      {/* Modal hủy đơn — KHÔNG onOk, KHÔNG Modal.confirm */}
      <Modal
        title="Nhập lý do hủy hóa đơn"
        footer={null}
        open={isModalHuy}
        onCancel={closeHuy}
        destroyOnClose
      >
        <Form form={formHuy} layout="vertical" onFinish={submitHuy}>
          <Form.Item
            label="Lý do hủy"
            name="lyDoHuy" // bạn đổi tên theo BE (ghiChu/moTaHoatDong đều được)
            hasFeedback
            rules={[
              { required: true, message: "Vui lòng không để trống lý do!" },
            ]}
          >
            <TextArea rows={4} />
          </Form.Item>

          <div className="d-flex justify-content-end gap-2">
            <Button onClick={closeHuy}>Đóng</Button>
            <Button type="primary" htmlType="submit">
              Xác nhận hủy
            </Button>
          </div>
        </Form>
      </Modal>

      <div className="row mt-4">
        <div className="col-md-9"></div>
        <div className="col-md-3">
          <h3>
            Tiền đơn hàng:
            <span className="text-danger">{fmtVND(thanhTien)}</span>
          </h3>
          <h3>
            Tiền vận chuyển:
            <span className="text-danger">{fmtVND(phiShip)}</span>
          </h3>
          <h3>
            Tổng tiền: <span className="text-danger">{fmtVND(tong)}</span>
          </h3>
        </div>
      </div>
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}
