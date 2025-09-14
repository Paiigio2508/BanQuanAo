import React, { useEffect, useState } from "react";
import { Button, Card, Col, Divider, Form, Input, Row, Select, InputNumber } from "antd";
import { FaMoneyBills } from "react-icons/fa6";
import UpLoadImage from "../../uploadAnh/UpLoadImage";
import { AddressApi } from "../../../pages/api/address/AddressApi";
import { ChiTietSanPhamAPI } from "../../../pages/api/sanpham/ChiTietSanPham.api";
import { ToastContainer, toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { ThuocTinhAPI } from "../../../pages/api/sanpham/ThuocTinh.api";
import { useParams } from 'react-router-dom';
import './SanPham.css'

// helpers
const safe = (v) => (v == null ? "" : String(v));
const sTrim = (v) => safe(v).trim();

export default function AddChiTietSanPham() {
  const [form] = Form.useForm();
  const nav = useNavigate();
  const { TextArea } = Input;
  const { id } = useParams();

  // Địa chỉ
  const [listProvince, setListProvince] = useState([]);
  const [listDistricts, setListDistricts] = useState([]);
  const [listWard, setListWard] = useState([]);

  const [province, setProvince] = useState(null);
  const [district, setDistrict] = useState(null);
  const [ward, setWard] = useState(null);

  const [imageUrl, setImageUrl] = useState("");

  //Load Combobox Danh Mục
  const [danhMuc, setDanhMucs] = useState([]);

  useEffect(() => {
    loadDanhMuc();
  }, []);

  const loadDanhMuc = () => {
    ThuocTinhAPI.getAll("danh-muc",)
      .then((res) => {
        setDanhMucs(res.data);
      })
  };
  //Load Combobox Chất Liệu
  const [chatLieu, setChatLieus] = useState([]);

  useEffect(() => {
    loadChatLieu();
  }, []);

  const loadChatLieu = () => {
    ThuocTinhAPI.getAll("chat-lieu")
      .then((res) => {
        setChatLieus(res.data);
      })
  };

  useEffect(() => {
    AddressApi.fetchAllProvince().then((res) => {
      setListProvince(res?.data?.data ?? []);
    });
  }, []);
  //Load Combobox Giới Tính
  const [gioiTinh, setGioiTinhs] = useState([]);

  useEffect(() => {
    loadGioiTinh();
  }, []);

  const loadGioiTinh = () => {
    ThuocTinhAPI.getAll("gioi-tinh")
      .then((res) => {
        setGioiTinhs(res.data);
      })
  };
  //Load Combobox Hãng
  const [hang, setHangs] = useState([]);

  useEffect(() => {
    loadHang();
  }, []);

  const loadHang = async () => {
    ThuocTinhAPI.getAll("hang")
      .then((res) => {
        setHangs(res.data);
      })
  };
  // Load Combobox Kích Thước
  const [kichThuoc, setKichThuocs] = useState([]);

  useEffect(() => {
    loadKichThuoc();
  }, []);

  const loadKichThuoc = () => {
    ThuocTinhAPI.getAll("kich-thuoc",)
      .then((res) => {
        setKichThuocs(res.data);
      })
  };
  // Load Combobox Màu Sắc
  const [mauSac, setMauSacs] = useState([]);

  useEffect(() => {
    loadMauSac();
  }, []);

  const loadMauSac = () => {
    ThuocTinhAPI.getAll("mau-sac")
      .then((res) => {
        setMauSacs(res.data);
      })
  };
  const handleFileUpload = (cloudinaryUrl) => setImageUrl(cloudinaryUrl);

  const handleProvinceChange = (value) => {
    try {
      const provinceObj = JSON.parse(value);
      setProvince(provinceObj);
      form.setFieldsValue({ tenThanhPho: provinceObj.ProvinceName });

      AddressApi.fetchAllProvinceDistricts(provinceObj.ProvinceID).then((res) =>
        setListDistricts(res?.data?.data ?? [])
      );

      // reset cấp dưới
      setDistrict(null);
      setWard(null);
      setListWard([]);
      form.setFieldsValue({ tenHuyen: undefined, tenXa: undefined });
    } catch { }
  };

  const handleDistrictChange = (value) => {
    try {
      const districtObj = JSON.parse(value);
      setDistrict(districtObj);
      form.setFieldsValue({ tenHuyen: districtObj.DistrictName });

      AddressApi.fetchAllProvinceWard(districtObj.DistrictID).then((res) =>
        setListWard(res?.data?.data ?? [])
      );

      // reset xã
      setWard(null);
      form.setFieldsValue({ tenXa: undefined });
    } catch { }
  };

  const handleWardChange = (value) => {
    try {
      const wardObj = JSON.parse(value);
      setWard(wardObj);
      form.setFieldsValue({ tenXa: wardObj.WardName });
    } catch { }
  };

  // Submit form
  const handleFinish = (values) => {
    const data = {
      ...values,
      hinhAnh:
        imageUrl ||
        "https://res.cloudinary.com/dm0w2qws8/image/upload/v1707054561/pryndkawgsxymspxkxcm.png",
    };

    ChiTietSanPhamAPI.themChiTietSanPham(data)
      .then(() => {
        toast.success("🦄 Thêm Chi Tiết Sản Phẩm Thành Công !");
        nav(`/admin-chi-tiet-san-pham/${id}`);
      })
      .catch((err) => {
        console.error(err);
        toast.error("🦄 Thêm Chi Tiết Sản Phẩm Thất Bại!");
      });
  };

  const back = () => nav("/admin-khach-hang");

  return (
    <>
      <Divider orientation="center">
        <h3 className="text-first fw-bold">
          <FaMoneyBills /> Thêm chi tiết sản phẩm
        </h3>
      </Divider>

      <Form
        form={form}
        layout="vertical"
        className="mt-5"
        onFinish={handleFinish}
        initialValues={{
          ten: "",
          email: "",
          soDienThoai: "",
          canCuocCongDan: "",
          gioiTinh: undefined,
          ngaySinh: undefined,
          tenThanhPho: undefined,
          tenHuyen: undefined,
          tenXa: undefined,
          diaChi: "",
        }}
      >
        <Row gutter={14}>
          <Col span={7}>
            <Card style={{ height: "100%", minHeight: "550px" }}>
              <h5 className="text-center fw-bold">Ảnh đại diện</h5>
              <Row justify="center" className="mt-5">
                <UpLoadImage onFileUpload={handleFileUpload} />
              </Row>
            </Card>
          </Col>

          <Col span={17}>
            <Card>
              <h5 className="text-center fw-bold">Thông tin khách hàng</h5>

              <Row justify="end" style={{ marginBottom: 15, marginTop: 10 }}>
                <Col>
                  <Button htmlType="submit" className="btn3">
                    Hoàn tất
                  </Button>
                  <Button
                    onClick={back}
                    className="btn3"
                    style={{ marginLeft: 8 }}
                  >
                    Hủy
                  </Button>
                </Col>
              </Row>

              <Row>
                <Col span={11} style={{ marginRight: 20 }}>
                  <Form.Item
                    name="sanPham"
                    initialValue={id}
                    hidden
                    rules={[{ required: true, message: "Thiếu id sản phẩm." }]}
                  >
                    <Input type="hidden" />
                  </Form.Item>

                  <Form.Item
                    name="danhMuc"
                    label="Danh Mục"
                    rules={[{ required: true, message: "Hãy chọn danh mục" }]}
                  >
                    <Select
                      placeholder="-- Chọn Danh Mục --"
                    >
                      {danhMuc.map((item) => (
                        <Select.Option key={item.id} value={item.id}>
                          {item.ten}
                        </Select.Option>
                      ))}
                    </Select>
                  </Form.Item>

                  <Form.Item
                    name="chatLieu"
                    label="Chất Liệu"
                    rules={[{ required: true, message: "Hãy chọn chất liệu" }]}
                  >
                    <Select
                      placeholder="-- Chọn Chất Liệu --"
                    >
                      {chatLieu.map((item) => (
                        <Select.Option key={item.id} value={item.id}>
                          {item.ten}
                        </Select.Option>
                      ))}
                    </Select>
                  </Form.Item>

                  <Form.Item
                    name="gioiTinh"
                    label="Giới Tính"
                    rules={[{ required: true, message: "Hãy chọn giới tính" }]}
                  >
                    <Select
                      onChange={handleProvinceChange}
                      placeholder="-- Chọn Giới Tính --"
                    >
                      {gioiTinh.map((item) => (
                        <Select.Option key={item.id} value={item.id}>
                          {item.ten}
                        </Select.Option>
                      ))}
                    </Select>
                  </Form.Item>

                  <Form.Item
                    name="giaBan"
                    label="Giá Bán"
                    rules={[
                      {
                        required: true,
                        message: "Vui lòng không để trống giá bán !",
                      },
                    ]}
                  >
                    <InputNumber
                      className="border"
                      style={{ width: 376 }}
                      defaultValue={0}
                      formatter={(value) =>
                        `VND ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                      }
                      parser={(value) => value.replace(/\VND\s?|(,*)/g, "")}
                    />
                  </Form.Item>
                </Col>

                <Col span={11}>
                  <Form.Item
                    name="mauSac"
                    label="Màu Sắc"
                    rules={[{ required: true, message: "Hãy chọn màu sắc" }]}
                  >
                    <Select
                      onChange={handleProvinceChange}
                      placeholder="-- Chọn Màu Sắc --"
                    >
                      {mauSac.map((item) => (
                        <Select.Option key={item.id} value={item.id}>
                          {item.ten}
                        </Select.Option>
                      ))}
                    </Select>
                  </Form.Item>

                  <Form.Item
                    name="hang"
                    label="Hãng"
                    rules={[{ required: true, message: "Hãy chọn hãng" }]}
                  >
                    <Select
                      onChange={handleProvinceChange}
                      placeholder="-- Chọn Hãng --"
                    >
                      {hang.map((item) => (
                        <Select.Option key={item.id} value={item.id}>
                          {item.ten}
                        </Select.Option>
                      ))}
                    </Select>
                  </Form.Item>

                  <Form.Item
                    name="kichThuoc"
                    label="Kích Thước"
                    rules={[{ required: true, message: "Hãy chọn kích thước" }]}
                  >
                    <Select
                      onChange={handleProvinceChange}
                      placeholder="-- Chọn Kích Thước --"
                    >
                      {kichThuoc.map((item) => (
                        <Select.Option key={item.id} value={item.id}>
                          {item.ten}
                        </Select.Option>
                      ))}
                    </Select>
                  </Form.Item>

                  <Form.Item
                    name="giaNhap"
                    label="Giá Nhập"
                    rules={[
                      {
                        required: true,
                        message: "Vui lòng không để trống giá nhập !",
                      },
                    ]}
                  >
                    <InputNumber
                      className="border"
                      style={{ width: 376 }}
                      defaultValue={0}
                      formatter={(value) =>
                        `VND ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                      }
                      parser={(value) => value.replace(/\VND\s?|(,*)/g, "")}
                    />
                  </Form.Item>
                </Col>
              </Row>
              <Form.Item
                label="Số lượng"
                name="soLuong"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng không để trống số lượng !",
                  },
                ]}
              >
                <Input
                  style={{ width: 770 }}
                  placeholder="Nhập số lượng sản phẩm"
                  type="number"
                  min={1}
                  className="border"
                />
              </Form.Item>
              <Form.Item
                name="moTa"
                label="Mô tả"
                hasFeedback
                rules={[
                  { required: true, message: "Vui lòng không để trống mô tả!" },
                ]}
              >
                <TextArea
                  style={{ width: 770 }}
                  rows={4}
                  maxLength={200}
                  placeholder="Nhập mô tả sản phẩm"
                />
              </Form.Item>
            </Card>
          </Col>
        </Row>
      </Form>

      <ToastContainer />
    </>
  );
}
