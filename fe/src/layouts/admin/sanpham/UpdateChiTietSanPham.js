import {
  Button,
  Card,
  Col,
  Form,
  Input,
  Row,
  Select,
  Spin,
  InputNumber
} from "antd";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import UpLoadImageUpdate from "../../uploadAnh/UpLoadImage";
import { ChiTietSanPhamAPI } from "../../../pages/api/sanpham/ChiTietSanPham.api";
import { ThuocTinhAPI } from "../../../pages/api/sanpham/ThuocTinh.api";
import { ToastContainer, toast } from "react-toastify";
import { FaMoneyBills } from "react-icons/fa6";

export default function UpdateChiTietSanPham() {
  const [form] = Form.useForm();
  const { TextArea } = Input;
  const { id } = useParams();
  const nav = useNavigate();
  const [fileImage, setFileImage] = useState(null);
  const [oldImage, setOldImage] = useState(""); // link ảnh cũ
  const [loading, setLoading] = useState(true);
  const [ktCheck, setKtCheck] = useState('');
  const [msCheck, setMsCheck] = useState('');


  //Tạo nút back
  const [idSP, setIdSP] = useState("");
  useEffect(() => {
    ChiTietSanPhamAPI.detailChiTietSanPham(id).then((res) => {
      setIdSP(res.data.sanPham);
      setMsCheck(res.data.mauSac)
      setKtCheck(res.data.kichThuoc)
    });
  }, [id]);
  const back = () => {
    if (idSP) {
      nav(`/admin-chi-tiet-san-pham/${idSP}`);
    }
  };

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

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const empRes = await ChiTietSanPhamAPI.detailChiTietSanPham(id);
        const data = empRes.data;
        // lưu link ảnh cũ
        setOldImage(data.linkAnh || "");
        form.setFieldsValue({
          sanPham: data.sanPham || "",
          danhMuc: data.danhMuc || "",
          kichThuoc: data.kichThuoc || "",
          chatLieu: data.chatLieu || "",
          mauSac: data.mauSac || "",
          gioiTinh: data.gioiTinh || "",
          hang: data.hang || "",
          giaNhap: data.giaNhap,
          giaBan: data.giaBan,
          soLuong: data.soLuong,
          moTa: data.moTa,
        });
      } catch (err) {
        console.error(err);
      }
      setLoading(false);
    })();
  }, [id, form]);


  const handleFileUpload = (fileData) => {
    setFileImage(fileData); // file mới
  };

  const handleFinish = () => {
    form.validateFields().then((values) => {
      const dataUpdate = {
        ...values,
        id: id,
        hinhAnh: fileImage ? fileImage : oldImage,
      };

      if (dataUpdate.kichThuoc != ktCheck || dataUpdate.mauSac != msCheck) {
        for (let i = 0; i < ctsp.length; i++) {
          const item = ctsp[i];
          if (
            item.idSP === dataUpdate.sanPham &&
            item.idMS === dataUpdate.mauSac &&
            item.idKT === dataUpdate.kichThuoc
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
      }

      ChiTietSanPhamAPI.updateChiTietSanPham(dataUpdate.id, dataUpdate)
        .then(() => {
          toast.success("Cập nhật thành công!", { autoClose: 3000 });
          nav(`/admin-chi-tiet-san-pham/${dataUpdate.sanPham}`);
        })
        .catch(() => toast.error("Có lỗi xảy ra"));
    });
  };

  return (
    <div>
      <h3 className="text-first text-center fw-bold">
        <FaMoneyBills /> Update chi tiết sản phẩm
      </h3>
      {loading ? (
        <Spin spinning />
      ) : (
        <Form form={form} layout="vertical" onFinish={handleFinish}>
          <Row gutter={14} style={{ marginTop: 30 }}>
            <Col span={7}>
              <Card style={{ height: "100%", minHeight: "550px" }}>
                <h5 className="text-center fw-bold">Ảnh sản phẩm</h5>
                <Row justify="center" className="mt-5">
                  <UpLoadImageUpdate
                    onFileUpload={handleFileUpload}
                    defaultImage={oldImage} // set preview ảnh cũ
                  />
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
                        style={{ width: 503 }}
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
                                width: 390,
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
                        style={{ width: 503 }}
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
                    style={{ width: 1025 }}
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
                    style={{ width: 1025 }}
                    rows={4}
                    maxLength={200}
                    placeholder="Nhập mô tả sản phẩm"
                  />
                </Form.Item>
              </Card>
            </Col>
          </Row>
          <ToastContainer />
        </Form>
      )}
    </div>
  );
}
