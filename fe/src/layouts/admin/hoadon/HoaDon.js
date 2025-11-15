import React, { useState, useEffect } from "react";
import {
  Button,
  DatePicker,
  Form,
  Table,
  Divider,
  Badge,
  Tabs,
  Tag,
  Space,
  message,
} from "antd";
import { BsFillEyeFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import moment from "moment";
import Input from "antd/es/input/Input";
import { FaMoneyBills } from "react-icons/fa6";
import {
  FilterFilled,
  RetweetOutlined,
  UnorderedListOutlined,
} from "@ant-design/icons";
import { HoaDonAPI } from "../../../pages/api/hoadon/HoaDonAPI";

export default function HoaDon() {
  // ================== STATE ==================
  const [loading, setLoading] = useState(false);
  const [activeKey, setActiveKey] = useState("1");

  // dữ liệu gốc (tab hiện tại sau khi gọi BE)
  const [master, setMaster] = useState([]);

  // dữ liệu hiển thị (đã áp filter, chia theo TT)
  const [hoaDons, setHoaDons] = useState({
    all: [],
    cho: [], // 0
    xn: [], // 1
    cvc: [], // 2
    vc: [], // 3
    ht: [], // 4 (Hoàn thành)
    huy: [], // -1
  });

  // filter state
  const [filters, setFilters] = useState({
    q: "", // mã / tên KH / SĐT
    start: null, // DatePicker (dayjs)
    end: null, // DatePicker (dayjs)
  });

  // ================== UTILS ==================
  const formatCurrency = (value) =>
    new Intl.NumberFormat("vi-VN").format(value ?? 0) + " VND";

  // Mapping TT: bỏ Thanh toán, 4 = Hoàn thành
  const TRANG_THAI_MAP = {
    "-1": { text: "Hủy", color: "#cd201f" },
    0: { text: "Chờ xác nhận", color: "red" },
    1: { text: "Xác nhận", color: "purple" },
    2: { text: "Chờ vận chuyển", color: "geekblue" },
    3: { text: "Vận chuyển", color: "blue" },
    4: { text: "Hoàn thành", color: "green" },
  };

  // Chuẩn hoá mọi kiểu -> moment hoặc null
  const toMoment = (v) => {
    if (!v) return null;
    try {
      if (typeof v === "string" || typeof v === "number" || v instanceof Date) {
        return moment(v);
      }
      if (v?.toDate) return moment(v.toDate()); // dayjs
      if (v?.$d) return moment(v.$d); // dayjs internals
      return moment(v); // fallback
    } catch {
      return null;
    }
  };

  const splitByStatus = (list = []) => {
    const safe = Array.isArray(list) ? list : [];
    return {
      all: safe,
      cho: safe.filter((x) => String(x.trangThai) === "0"),
      xn: safe.filter((x) => String(x.trangThai) === "1"),
      cvc: safe.filter((x) => String(x.trangThai) === "2"),
      vc: safe.filter((x) => String(x.trangThai) === "3"),
      ht: safe.filter((x) => String(x.trangThai) === "4"),
      huy: safe.filter((x) => String(x.trangThai) === "-1"),
    };
  };

  // áp bộ lọc trên mảng master
  const applyFilter = (data, f = filters) => {
    const q = (f.q || "").trim().toLowerCase();
    const mStart = f.start ? toMoment(f.start)?.startOf("day") : null;
    const mEnd = f.end ? toMoment(f.end)?.endOf("day") : null;

    return (Array.isArray(data) ? data : []).filter((row) => {
      // text search
      const text = `${row?.ma || ""} ${row?.tenKH || ""} ${
        row?.sdt || ""
      }`.toLowerCase();
      const okQ = q ? text.includes(q) : true;

      // date range
      const m = row?.ngayMua ? toMoment(row.ngayMua) : null;
      const okStart = mStart ? m && m.isSameOrAfter(mStart) : true;
      const okEnd = mEnd ? m && m.isSameOrBefore(mEnd) : true;

      return okQ && okStart && okEnd;
    });
  };

  // ================== API ==================
  // Map key tab -> mã trạng thái tương ứng (đã bỏ Thanh toán)
  const keyToTT = { 1: null, 2: 0, 3: 1, 4: 2, 5: 3, 6: 4, 7: -1 };

  const fetchHoaDon = async (tt = null) => {
    setLoading(true);
    try {
      // Nếu BE hỗ trợ ?tt=...: getAllbyTT(tt) | nếu để trống: getAllbyTT()
      const res =
        tt == null
          ? await HoaDonAPI.getAllbyTT()
          : await HoaDonAPI.getAllbyTT(tt);
      const raw = res?.data;
      const data = Array.isArray(raw) ? raw : raw?.data ?? [];
      setMaster(data);

      // áp filter hiện tại lên data mới lấy
      const filtered = applyFilter(data, filters);
      setHoaDons(splitByStatus(filtered));
    } catch (e) {
      console.error(e);
      setMaster([]);
      setHoaDons(splitByStatus([]));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // load ALL khi vào trang
    fetchHoaDon(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ================== TABLE COLUMNS ==================
  const columns = [
    { title: "STT", render: (_, __, index) => index + 1, width: 80 },
    {
      title: "Mã hóa đơn",
      dataIndex: "ma",
      sorter: (a, b) => String(a.ma).localeCompare(String(b.ma)),
    },

    { title: "Khách hàng", dataIndex: "tenKH" },
    { title: "SDT KH", dataIndex: "sdt" },
    {
      title: "Ngày mua",
      dataIndex: "ngayMua",
      render: (val) => (val ? moment(val).format("HH:mm:ss DD/MM/YYYY") : "-"),
      sorter: (a, b) => new Date(a.ngayMua || 0) - new Date(b.ngayMua || 0),
    },
    {
      title: "Thành tiền",
      dataIndex: "thanhTien",
      render: (val) => <span>{formatCurrency(val)}</span>,
      sorter: (a, b) => (a.thanhTien ?? 0) - (b.thanhTien ?? 0),
      align: "right",
    },
    { title: "Hình thức", dataIndex: "phuongThuc" },
    {
      title: "Trạng thái",
      dataIndex: "trangThai",
      render: (val) => {
        const tt = TRANG_THAI_MAP[String(val)];
        return <Tag color={tt?.color}>{tt?.text || "Khác"}</Tag>;
      },
    },
    {
      title: "Hành động",
      dataIndex: "idHD",
      render: (
        _,
        record // thêm record ở đây
      ) => (
        <Space>
          <Link
            to={`/admin-detail-hoa-don/${record.idHD}`}
            state={{ hoaDon: record }} // truyền trực tiếp bản ghi
            className="btn btn-danger"
          >
            <BsFillEyeFill />
          </Link>
        </Space>
      ),
      fixed: "right",
      width: 100,
    },
  ];

  // ================== COMPONENT TABLE ==================
  const HoaDonTable = ({ data }) => (
    <Table
      dataSource={data}
      columns={columns}
      rowKey="idHD"
      loading={loading}
      pagination={{
        showQuickJumper: true,
        position: ["bottomCenter"],
        defaultPageSize: 5,
      }}
      scroll={{ x: 1000 }}
    />
  );

  // ================== TABS CONFIG ==================
  const tabConfig = [
    { key: "1", label: "Tất cả", data: hoaDons.all },
    {
      key: "2",
      label: <Badge count={hoaDons.cho.length}>Chờ xác nhận</Badge>,
      data: hoaDons.cho,
    },
    {
      key: "3",
      label: <Badge count={hoaDons.xn.length}>Xác nhận</Badge>,
      data: hoaDons.xn,
    },
    {
      key: "4",
      label: <Badge count={hoaDons.cvc.length}>Chờ vận chuyển</Badge>,
      data: hoaDons.cvc,
    },
    {
      key: "5",
      label: <Badge count={hoaDons.vc.length}>Vận chuyển</Badge>,
      data: hoaDons.vc,
    },
    {
      key: "6",
      label: <Badge count={hoaDons.ht.length}>Hoàn thành</Badge>,
      data: hoaDons.ht,
    },
    {
      key: "7",
      label: <Badge count={hoaDons.huy.length}>Hủy</Badge>,
      data: hoaDons.huy,
    },
  ];

  const items = tabConfig.map((t) => ({
    key: t.key,
    label: t.label,
    children: <HoaDonTable data={t.data} />,
  }));

  // ================== FORM & FILTER ==================
  const [form] = Form.useForm();

  // đổi là áp filter ngay
  const onChangeFilter = (_, all) => {
    const newFilters = {
      q: all?.tenHD || "",
      start: all?.ngayBDHD || null,
      end: all?.ngayKTHD || null,
    };

    const mStart = newFilters.start
      ? toMoment(newFilters.start)?.startOf("day")
      : null;
    const mEnd = newFilters.end ? toMoment(newFilters.end)?.endOf("day") : null;

    if (mStart && mEnd && mEnd.isBefore(mStart)) {
      message.warning("Ngày kết thúc phải lớn hơn hoặc bằng ngày bắt đầu");
      return;
    }

    setFilters(newFilters);

    // áp filter trên data gốc hiện có
    const filtered = applyFilter(master, newFilters);
    setHoaDons(splitByStatus(filtered));
  };

  const handleReset = () => {
    form.resetFields();
    const reset = { q: "", start: null, end: null };
    setFilters(reset);
    setActiveKey("1");
    // áp filter rỗng trên data gốc hiện tại
    setHoaDons(splitByStatus(applyFilter(master, reset)));
  };

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
          boxShadow: "0 3px 8px rgba(0,0,0,0.1)",
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
          onValuesChange={onChangeFilter}
        >
          <div className="col-md-6">
            <Form.Item label="Tìm kiếm" name="tenHD">
              <Input
                maxLength={30}
                placeholder="Mã / tên / SĐT..."
                allowClear
              />
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
            <Button
              type="primary"
              htmlType="button"
              icon={<RetweetOutlined />}
              onClick={handleReset}
            >
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
          boxShadow: "0 3px 6px rgba(0,0,0,0.1)",
          borderRadius: "8px",
          padding: "10px",
        }}
      >
        <div className="text-start fw-bold">
          <p>
            <UnorderedListOutlined /> Danh sách hóa đơn
          </p>
        </div>
        <Tabs
          defaultActiveKey="1"
          activeKey={activeKey}
          items={items}
          onChange={async (key) => {
            setActiveKey(key);
            // gọi BE theo trạng thái tab, rồi áp filter hiện tại
            await fetchHoaDon(keyToTT[key]);
          }}
        />
      </div>
    </div>
  );
}
