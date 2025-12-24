import React, { useEffect, useState } from 'react';
import { Button, Divider, Form, Modal, Select, Space, Table, Tag, Image, Slider, InputNumber, QRCode, Popover } from 'antd';
import { EyeOutlined, RetweetOutlined, QrcodeOutlined } from "@ant-design/icons";
import { BookFilled } from "@ant-design/icons";
import { FilterFilled } from "@ant-design/icons";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { GiMaterialsScience } from 'react-icons/gi';
import { ChiTietSanPhamAPI } from '../../../pages/api/sanpham/ChiTietSanPham.api';
import { ThuocTinhAPI } from '../../../pages/api/sanpham/ThuocTinh.api';
import { Link, useNavigate } from "react-router-dom";
import { GrUpdate } from "react-icons/gr";
import { useParams } from 'react-router-dom';
import TextArea from 'antd/es/input/TextArea';
import { Color } from 'antd/es/color-picker';
import SuaAnhCTSP from './SuaAnhCTSP';

export default function ChiTietSanPham() {
  //Form
  const { id } = useParams();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [ktCheck, setKtCheck] = useState('');
  const [msCheck, setMsCheck] = useState('');
  const nav = useNavigate();
  const [selectedValue, setSelectedValue] = useState('1');
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleChange = (value) => {
    setSelectedValue(value);
  };
  const [componentSize, setComponentSize] = useState('default');
  const onFormLayoutChange = ({ size }) => {
    setComponentSize(size);
  };
  const [form] = Form.useForm();
  const [form1] = Form.useForm();
  const [form2] = Form.useForm();
  const [formTim] = Form.useForm();
  const [ctData, setCTDatas] = useState({});

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
    setCTDatas(dataSource)
    loadChiTietSanPham();
  }, []);

  const loadChiTietSanPham = () => {
    ChiTietSanPhamAPI.showCTSPBySanPhamId(id).then((res) => {
      setChiTietSanPhams(res.data);
    })
  };

  const dataSource = chiTietSanPham.map((item) => ({
    idCTSP: item.idCTSP,
    key: item.idCTSP,
    linkAnh: item.linkAnh,
    tenSP: item.tenSP,
    giaBan: item.giaBan,
    soLuong: item.soLuong,
    tenKT: item.tenKT,
    tenMS: item.tenMS,
    maMS: item.maMS,
    trangThai: item.trangThai
  }));
  // Update
  const showModal = async (idCT) => {
    ChiTietSanPhamAPI.detailChiTietSanPham(idCT).then((result) => {
      setMsCheck(result.data.mauSac)
      setKtCheck(result.data.kichThuoc)
      setCTDatas(result.data);
      setIsModalOpen(true);
    })
  };
  const [optionsCTSP, setOptionsCTSP] = useState([]);
  useEffect(() => {
    loadCTSP_Update();
  }, []);
  const loadCTSP_Update = async () => {
    ChiTietSanPhamAPI.getAllChiTietSanPham().then((res) => {
      setOptionsCTSP(res.data);
    })

  };
  const updateCTSanPham = () => {
    if (ctData.kichThuoc != ktCheck || ctData.mauSac != msCheck) {
      const checkTrung = (sanPham, mauSac, kichThuoc) => {
        return optionsCTSP.some(ctsp =>
          ctsp.idSP === sanPham &&
          ctsp.idMS === mauSac &&
          ctsp.idKT === kichThuoc
        );
      };

      if (checkTrung(ctData.sanPham, ctData.mauSac, ctData.kichThuoc)) {
        toast.error('Sản phẩm có kích thước và màu sắc trùng với sản phẩm khác !', {
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
    }
    if (ctData.moTa.length > 200) {
      toast.error('Mô tả không quá 200 kí tự !', {
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

    ChiTietSanPhamAPI.updateChiTietSanPham(ctData.id, ctData)
      .then(response => {
        toast.success('✔️ Sửa thành công!', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        setIsModalOpen(false)
        loadChiTietSanPham();
      })
      .catch(error => console.error('Error adding item:', error));
  }
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


  }
  const timKiemCT = (dataSearch) => {
    ChiTietSanPhamAPI.searchChiTietSanPham(id, dataSearch)
      .then(response => {
        setChiTietSanPhams(response.data);

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
          src={text || "https://www.gnf-liege.be/img/NoImage.jpg"}
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
          <a>
            <Button type="primary" shape='round' className='bg-success text-white' icon={<EyeOutlined />} onClick={() => showModal(`${title}`)} />
            <Modal
              centered={true}
              open={isModalOpen}
              onOk={handleOk}
              onCancel={handleCancel}
              width={700}
              footer={[]}>
              <div className='text-center mb-3'>
                <h3>Chi Tiết Sản Phẩm</h3>
              </div>
              <Form
                initialValues={{
                  size: componentSize,
                }}
                onValuesChange={onFormLayoutChange}
                size={componentSize}
                onFinish={updateCTSanPham}
                form={form2}>
                <div className='row'>
                  <Form.Item label={<b>Tên sản phẩm </b>} >
                    <Select defaultValue={ctData.sanPham} disabled>
                      <Select.Option key={ctData.sanPham} value={ctData.sanPham}>
                        {ctData.tenSP}
                      </Select.Option>
                    </Select>
                  </Form.Item>
                </div>
                <div className='row'>
                  <Form.Item label={<b>Mô tả </b>} hasFeedback rules={[{ required: true, message: 'Vui lòng nhập mô tả!', },]}>
                    <TextArea value={ctData.moTa} onChange={(e) => setCTDatas({ ...ctData, moTa: e.target.value })}></TextArea>
                  </Form.Item>
                </div>
                <div className='row'>
                  <div className='col-md-6'>
                    <Form.Item label={<b>Kích thước </b>}>
                      <Select placeholder="Chọn một giá trị" value={ctData.kichThuoc} onChange={(e) => setCTDatas({ ...ctData, kichThuoc: e })} >
                        {kichThuoc.map(item => (
                          <Select.Option key={item.id} value={item.id}>
                            {item.ten}
                          </Select.Option>
                        ))}
                      </Select>
                    </Form.Item>
                  </div>
                  <div className='col-md-6'>
                    <Form.Item label={<b>Màu Sắc</b>}>
                      <Select placeholder="Chọn một giá trị" value={ctData.mauSac} onChange={(e) => setCTDatas({ ...ctData, mauSac: e })}>
                        {mauSac.map(item => (
                          <Select.Option key={item.id} value={item.id}>
                            {item.ten}
                          </Select.Option>
                        ))}
                      </Select>
                    </Form.Item>
                  </div>
                </div>
                <div className='row'>
                  <div className='col-md-6'>
                    <Form.Item label={<b>Chất liệu </b>}>
                      <Select placeholder="Chọn một giá trị" value={ctData.chatLieu} onChange={(e) => setCTDatas({ ...ctData, chatLieu: e })}>
                        {chatLieu.map(item => (
                          <Select.Option key={item.id} value={item.id}>
                            {item.ten}
                          </Select.Option>
                        ))}
                      </Select>
                    </Form.Item>
                  </div>
                  <div className='col-md-6'>
                    <Form.Item label={<b>Giới tính</b>}>
                      <Select placeholder="Chọn một giá trị" value={ctData.gioiTinh} onChange={(e) => setCTDatas({ ...ctData, gioiTinh: e })}>
                        {gioiTinh.map(item => (
                          <Select.Option key={item.id} value={item.id}>
                            {item.ten}
                          </Select.Option>
                        ))}
                      </Select>
                    </Form.Item>
                  </div>
                </div>
                <div className='row'>
                  <div className='col-md-6'>
                    <Form.Item label={<b>Danh mục </b>}>
                      <Select placeholder="Chọn một giá trị" value={ctData.danhMuc} onChange={(e) => setCTDatas({ ...ctData, danhMuc: e })}>
                        {danhMuc.map(item => (
                          <Select.Option key={item.id} value={item.id}>
                            {item.ten}
                          </Select.Option>
                        ))}
                      </Select>
                    </Form.Item>
                  </div>
                  <div className='col-md-6'>
                    <Form.Item label={<b>Hãng</b>}>
                      <Select placeholder="Chọn một giá trị" value={ctData.hang} onChange={(e) => setCTDatas({ ...ctData, hang: e })}>
                        {hang.map(item => (
                          <Select.Option key={item.id} value={item.id}>
                            {item.ten}
                          </Select.Option>
                        ))}
                      </Select>
                    </Form.Item>
                  </div>
                </div>
                <div className='row'>
                  <div className='col-md-4'>
                    <Form.Item label={<b>Số lượng </b>}>
                      <InputNumber
                        min={0}
                        placeholder='Nhập số lượng'
                        value={ctData.soLuong}
                        onChange={(e) => setCTDatas({ ...ctData, soLuong: e })}
                      ></InputNumber>
                    </Form.Item>
                  </div>
                  <div className='col-md-4'>

                    <Form.Item label={<b>Giá bán </b>}>
                      <InputNumber
                        min={100000}
                        formatter={(value) =>
                          `VND ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                        }
                        parser={(value) => value.replace(/\VND\s?|(,*)/g, "")}
                        style={{ width: 150 }}
                        value={ctData.giaBan}
                        onChange={(e) => setCTDatas({ ...ctData, giaBan: e })}
                      ></InputNumber>
                    </Form.Item>
                  </div>
                  <div className='col-md-4'>
                    <Form.Item label={<b>Trạng thái </b>}>
                      <Select defaultValue={ctData.trangThai == 0 ? 'Còn bán' : 'Dừng bán'} onChange={(e) => setCTDatas({ ...ctData, trangThai: e })}>
                        <Select.Option value='0'>Còn Bán</Select.Option>
                        <Select.Option value='1'>Dừng Bán</Select.Option>
                      </Select>
                    </Form.Item>
                  </div>
                  <label className='mb-2'><b>QR Code :</b></label>
                  <Popover
                    overlayInnerStyle={{ padding: 0 }}
                    content={<QRCode value={ctData.id} bordered={false} size={250} />}
                  >
                    <Button icon={<QrcodeOutlined />} className='mb-2 ms-3' style={{ border: '1px solid #C6C5C5', borderRadius: '10px', objectFit: 'cover', width: 150 }}>
                      View QR
                    </Button>
                  </Popover>
                  <label className='mb-2'><b>Hình ảnh :</b></label>
                  <SuaAnhCTSP ten={ctData.mauSac} idSP={ctData.id} onReload={loadChiTietSanPham}></SuaAnhCTSP>
                </div>
                <div className='row'>
                  <div className='container text-center'>
                    <Button className='bg-warning text-dark rounded-pill border mt-3'
                      onClick={() => {
                        Modal.confirm({
                          centered: 'true',
                          title: 'Thông báo',
                          content: 'Bạn có chắc chắn muốn cập nhật không?',
                          onOk: () => { form2.submit(); },
                          footer: (_, { OkBtn, CancelBtn }) => (
                            <>
                              <CancelBtn />
                              <OkBtn />
                            </>
                          ),
                        });
                      }}><GrUpdate className='me-1' />Cập Nhật</Button>
                  </div>
                </div>
              </Form>

            </Modal>
          </a>
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
              {/* Giới tính */}
              <div className="col-md-4">
                <Form.Item label="Giới tính" name="idGT">
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
                dataSource={dataSource}
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