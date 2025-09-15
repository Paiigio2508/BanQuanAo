import React, { useEffect, useState } from 'react';
import { Button, Divider, Form, Input, Radio, Select, Space, Table, Tag, Image, Slider } from 'antd';
import { PlusCircleOutlined, RetweetOutlined } from "@ant-design/icons";
import { BookFilled } from "@ant-design/icons";
import { FilterFilled } from "@ant-design/icons";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { GiMaterialsScience } from 'react-icons/gi';
import { BsFillEyeFill } from 'react-icons/bs';
import { ChiTietSanPhamAPI } from '../../../pages/api/sanpham/ChiTietSanPham.api';
import { ThuocTinhAPI } from '../../../pages/api/sanpham/ThuocTinh.api';
import { Link, useNavigate } from "react-router-dom";
import { useParams } from 'react-router-dom';
import { Color } from 'antd/es/color-picker';

export default function ChiTietSanPham() {
  //Form
  const { id } = useParams();
  const nav = useNavigate();
  const [selectedValue, setSelectedValue] = useState('1');

  const handleChange = (value) => {
    setSelectedValue(value);
  };
  const [componentSize, setComponentSize] = useState('default');
  const onFormLayoutChange = ({ size }) => {
    setComponentSize(size);
  };
  const [form] = Form.useForm();
  const [form1] = Form.useForm();
  const [formTim] = Form.useForm();

  const themCTSP = () => {
    nav(`/admin-them-chi-tiet-san-pham/${id}`);
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

  //Table
  const [chiTietSanPham, setChiTietSanPhams] = useState([]);

  useEffect(() => {
    loadChiTietSanPham();
  }, []);

  const loadChiTietSanPham = () => {
    ChiTietSanPhamAPI.showCTSPBySanPhamId(id).then((res) => {
      setChiTietSanPhams(res.data);
    })
  };

  //Tìm kiếm
  const onChangeTimKiem = (changedValues, allValues) => {
    const updatedValues = { ...allValues };
    if (updatedValues.soLuongCT && updatedValues.soLuongCT.length > 0) {
      updatedValues.soLuongBatDau = updatedValues.soLuongCT[0] !== undefined ? updatedValues.soLuongCT[0] : 1;
    } else {
      updatedValues.soLuongBatDau = 1;
    }
    if (updatedValues.soLuongCT && updatedValues.soLuongCT.length > 0) {
      updatedValues.soLuongKetThuc = updatedValues.soLuongCT[1] !== undefined ? updatedValues.soLuongCT[1] : 1000;
    } else {
      updatedValues.soLuongKetThuc = 1000;
    }
    if (updatedValues.giaBanCT && updatedValues.giaBanCT.length > 0) {
      updatedValues.giaBanBatDau = updatedValues.giaBanCT[0] !== undefined ? updatedValues.giaBanCT[0] : 100000;
    } else {
      updatedValues.giaBanBatDau = 100000;
    }
    if (updatedValues.giaBanCT && updatedValues.giaBanCT.length > 0) {
      updatedValues.giaBanKetThuc = updatedValues.giaBanCT[1] !== undefined ? updatedValues.giaBanCT[1] : 50000000;
    } else {
      updatedValues.giaBanKetThuc = 50000000;
    }
    timKiemCT(updatedValues)
    console.log(updatedValues);
    
  }
  const timKiemCT = (dataSearch) => {
    ChiTietSanPhamAPI.searchChiTietSanPham(id, dataSearch)
      .then(response => {
        setChiTietSanPhams(response.data);
        console.log(chiTietSanPham)
      })
      .catch(error => console.error('Error adding item:', error));
  }

  const columns = [
    {
      title: "STT",
      dataIndex: "idCTSP",
      key: "idCTSP",
      align: "center",
      render: (idCTSP, record, index) => {
        ++index;
        return index;
      },
      showSorterTooltip: false,
    }
    ,
    {
      title: "Ảnh",
      dataIndex: "linkAnh",
      key: "linkAnh",
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
      title: "Sản phẩm",
      dataIndex: "tenSP",
      align: "center",
      render: (_, record) => {
        return `${record.tenSP} [${record.tenMS} - ${record.tenKT}]`;
      },
    },
    {
      title: "Màu Sắc",
      dataIndex: "maMS",
      key: "maMS",
      align: "center",
      render: (text, record) => {
        return <>
          <Button
            style={{
              backgroundColor: record.maMS,
              borderColor: 'black',
              color: "#fff",
              width: 70,
              height: 20
            }}>
          </Button>
        </>;
      }
    },
    {
      title: "Số Lượng",
      dataIndex: "soLuong",
      align: "center",
    },
    {
      title: "Giá Bán",
      dataIndex: "giaBan",
      align: "center",
      key: "giaBan",
      render: (text) => {
        return new Intl.NumberFormat("vi-VN").format(text) + " VNĐ";
      }
    },
    {
      title: "Trạng thái",
      dataIndex: "trangThai",
      key: "trangThai",
      align: "center",
      render: (trang_thai) => (
        <>
          {trang_thai === 0 ? (
            <Tag color="green">
              Còn bán
            </Tag>
          ) : (
            <Tag color="red">
              Dừng bán
            </Tag>
          )}
        </>
      ),
    },
    {
      title: "Hành động",
      key: "action",
      dataIndex: "idCTSP",
      render: (title) => (
        <Space size="middle">
          <Link
            to={`/admin-update-chi-tiet-san-pham/${title}`}
            className="btn btn-danger"
          >
            <BsFillEyeFill />
          </Link>
        </Space>
      ),
    },
  ]

  return (
    <div className="container-fluid" style={{ borderRadius: 20 }}>
      <div className="container-fluid">
        <Divider orientation="center" color="#d0aa73">
          <h4 className="text-first pt-1 fw-bold">
            {" "}
            <GiMaterialsScience size={35} /> Quản lý Chi Tiết Sản Phẩm
          </h4>
        </Divider>
        <div
          className=" bg-light m-2 p-3 pt-2"
          style={{
            border: "1px solid #ddd", // Border color
            boxShadow: "0 3px 8px rgba(0, 0, 0, 0.1)", // Box shadow
            borderRadius: "8px",
          }}
        >
          <h5>
            <FilterFilled size={30} /> Bộ lọc
          </h5>
          <hr />
          <Form
            labelCol={{
              span: 6,
            }}
            wrapperCol={{
              span: 14,
            }}
            layout="horizontal"
            initialValues={{
              size: componentSize,
            }}
            onValuesChange={onChangeTimKiem}
            size={componentSize}
            style={{
              maxWidth: 1600,
            }}
          >
            {/* Form tìm kiếm */}
            {/* Các Thuộc Tính Dòng 1 */}
            <div className="row mt-3">
              {/* Kích Thước */}
              <div className="col-md-4">
                <Form.Item label="Kích Thước" name="idKT">
                  <Select placeholder="Chọn một giá trị">
                    {kichThuoc.map((item) => (
                      <Select.Option key={item.id} value={item.id}>
                        {item.ten}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
              </div>
              {/* Màu Sắc */}
              <div className="col-md-4">
                <Form.Item label="Màu Sắc" name="idMS">
                  <Select placeholder="Chọn một giá trị">
                    {mauSac.map((item) => (
                      <Select.Option key={item.id} value={item.id}>
                        <div
                          style={{
                            color: "white",
                            fontWeight: "bolder",
                            backgroundColor: `${item.ma}`,
                            borderRadius: 6,
                            border: "1px solid black",
                            width: 155,
                            height: 25,
                          }}
                          className="text-center"
                        >{item.ten} - {item.ma}</div>
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
              </div>
              {/* Danh Mục */}
              <div className="col-md-4">
                <Form.Item label="Danh Mục" name="idDM">
                  <Select placeholder="Chọn một giá trị">
                    {danhMuc.map((item) => (
                      <Select.Option key={item.id} value={item.id}>
                        {item.ten}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
              </div>
            </div>

            {/* Các Thuộc Tính Dòng 2 */}
            <div className="row">
              {/* Chất Liệu */}
              <div className="col-md-4">
                <Form.Item label="Chất Liệu" name="idCL">
                  <Select placeholder="Chọn một giá trị">
                    {chatLieu.map((item) => (
                      <Select.Option key={item.id} value={item.id}>
                        {item.ten}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
              </div>
              {/* Độ Cao */}
              <div className="col-md-4">
                <Form.Item label="Đế giày" name="idGT">
                  <Select placeholder="Chọn một giá trị">
                    {gioiTinh.map((item) => (
                      <Select.Option key={item.ma} value={item.id}>
                        {item.ten}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
              </div>
              <div className="col-md-4">
                <Form.Item label="Số lượng" name="soLuongCT">
                  <Slider
                    range
                    step={100}
                    defaultValue={[1, 1000]}
                    min={1}
                    max={1000}
                  />
                </Form.Item>
              </div>
            </div>

            {/* Các Thuộc Tính Dòng 3 */}
            <div className="row">
              {/* Hãng */}
              <div className="col-md-4">
                <Form.Item label="Hãng" name="idH">
                  <Select placeholder="Chọn một giá trị">
                    {hang.map((item) => (
                      <Select.Option key={item.id} value={item.id}>
                        {item.ten}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
              </div>
              {/* Trạng Thái */}
              <div className="col-md-4">
                <Form.Item label="Trạng thái" name="trangThaiCT">
                  <Select placeholder="Chọn một giá trị" defaultValue="0">
                    <Select.Option value="0">Còn Bán</Select.Option>
                    <Select.Option value="1">Dừng Bán</Select.Option>
                  </Select>
                </Form.Item>
              </div>
              <div className="col-md-4">
                <Form.Item
                  label="Giá bán"
                  name="giaBanCT"
                >
                  <Slider
                    range
                    step={100000}
                    defaultValue={[100000, 50000000]}
                    min={100000}
                    max={50000000}
                  />
                </Form.Item>
              </div>
            </div>
            <div className="container-fluid">
              <Form.Item className="text-center" style={{ paddingLeft: 360 }}>
                <Button
                  type="primary"
                  htmlType="reset"
                  onClick={loadChiTietSanPham}
                  icon={<RetweetOutlined />}
                >
                  Làm mới
                </Button>
              </Form.Item>
            </div>
          </Form>
        </div>

        <div className="text-end mt-3">
          <button onClick={themCTSP} className="button-them">
            <span className="text">
              <PlusCircleOutlined /> Thêm chi tiết sản phẩm
            </span>
          </button>
        </div>

        <div
          className=" bg-light mt-3 p-3 pt-2"
          style={{
            border: "1px solid #ddd", // Border color
            boxShadow: "0 3px 8px rgba(0, 0, 0, 0.1)", // Box shadow
            borderRadius: "8px",
          }}
        >
          <h5>
            <BookFilled size={30} /> Danh sách sản phẩm
          </h5>
          <hr />
          <div className="ms-3">
          </div>
          <div className="container-fluid mt-4">
            <div>
              <Table
                className="text-center"
                dataSource={chiTietSanPham}
                columns={columns}
                pagination={{
                  showQuickJumper: true,
                  defaultPageSize: 5,
                  position: ["bottomCenter"],
                  defaultCurrent: 1,
                  total: chiTietSanPham.length,
                }}
              />
            </div>
          </div>
        </div>
      </div>
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