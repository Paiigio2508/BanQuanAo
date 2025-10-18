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

export default function AddChiTietSanPham() {
  const [form] = Form.useForm();
  const nav = useNavigate();
  const { TextArea } = Input;
  const { id } = useParams();
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
  // Load CTSP
  const [ctsp, setCTSPs] = useState([]);

  useEffect(() => {
    loadCTSP();
  }, []);

  const loadCTSP = () => {
    ChiTietSanPhamAPI.getAllChiTietSanPham()
      .then((res) => {
        setCTSPs(res.data);
      })
  };
  const handleFileUpload = (cloudinaryUrl) => setImageUrl(cloudinaryUrl);
  // Submit form
  const handleFinish = (values) => {
    const data = {
      ...values,
      hinhAnh:
        imageUrl ||
        "https://res.cloudinary.com/dm0w2qws8/image/upload/v1707054561/pryndkawgsxymspxkxcm.png",
    };

    for (let i = 0; i < ctsp.length; i++) {
      const item = ctsp[i];
      if (
        item.idSP === data.sanPham &&
        item.idMS === data.mauSac &&
        item.idKT === data.kichThuoc
      ) {
        toast.error(
          "Sản phẩm có kích thước và màu sắc trùng với sản phẩm khác!",
          {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          }
        );
        return;
      }
    }

    if (data.soLuong < 1) {
      toast.error("Số lượng >= 1", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return;
    }

    if (data.giaBan < 0) {
      toast.error("Giá bán > 0", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return;
    }

    if (data.moTa.length > 200) {
      toast.error("Mô tả không quá 200 kí tự!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return;
    }

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

  const back = () => nav("/admin-san-pham");

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
              <h5 className="text-center fw-bold">Ảnh sản phẩm</h5>
              <Row justify="center" className="mt-5">
                <UpLoadImage onFileUpload={handleFileUpload} />
              </Row>
            </Card>
          </Col>

          <Col span={17}>
            <Card>
              <h5 className="text-center fw-bold">Thông tin chi tiết sản phẩm</h5>

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
                      placeholder="-- Chọn Màu Sắc --"
                    >
                      {mauSac.map((item) => (
                        <Select.Option key={item.id} value={item.id}>
                          <div
                            style={{
                              color: "white",
                              fontWeight: "bolder",
                              backgroundColor: `${item.ma}`,
                              borderRadius: 6,
                              border: "1px solid black",
                              width: 400,
                              height: 25,
                            }}
                            className="text-center"
                          >{item.ten} - {item.ma}</div>
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
