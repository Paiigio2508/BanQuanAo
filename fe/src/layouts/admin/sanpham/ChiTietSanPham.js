import React, { useEffect, useState } from 'react';
import { Button, Divider, Form, Input, Radio, Select, Space, Table, Tag, Modal, Image } from 'antd';
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
  //Ấn Add
  const [open, setOpen] = useState(false);
  const [bordered] = useState(false);
  const formItemLayout = {
    labelCol: {
      span: 4
    },
    wrapperCol: {
      span: 20
    },
  };

const themCTSP = () => {
  nav(`/admin-them-chi-tiet-san-pham/${id}`);
};

  const addChiTietSanPham = (value) => {
    const checkTrung = (code) => {
      return chiTietSanPham.some(sp => sp.ten.trim().toLowerCase() === code.trim().toLowerCase());
    };
    if (!(checkTrung(value.ten))) {
      ThuocTinhAPI.create("san-pham", value)
        .then((res) => {
          toast('✔️ Thêm thành công !', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          loadChiTietSanPham();
          setOpen(false);
          form.resetFields();
        })
    } else {
      toast.error('Sản phẩm đã tồn tại!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  }
  //Update
  const [openUpdate, setOpenUpdate] = useState(false);
  const [clUpdate, setClUpdate] = useState("");
  const [tenCheck, setTenCheck] = useState("");

  const showModal = async (idDetail) => {
    await ThuocTinhAPI.detail("san-pham", idDetail)
      .then((res) => {
        form1.setFieldsValue({
          id: res.data.id,
          ma: res.data.ma,
          ten: res.data.ten,
          trangThai: res.data.trangThai,
          ngayTao: res.data.ngayTao,
          ngaySua: res.data.ngaySua,
        });
        setTenCheck(res.data.ten)
        setClUpdate(res.data)
      })
    setOpenUpdate(true)
  };
  const updateChiTietSanPham = () => {
    if (clUpdate.ten != tenCheck) {
      const checkTrung = (ten) => {
        return chiTietSanPham.some(x =>
          x.ten.trim().toLowerCase() === ten.trim().toLowerCase()
        );
      };

      if (checkTrung(clUpdate.ten)) {
        toast.error('Sản phẩm trùng với sản phẩm khác !', {
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
    ThuocTinhAPI.update("san-pham", clUpdate.id, clUpdate)
      .then((res) => {
        toast('✔️ Sửa thành công!', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        setClUpdate("");
        loadChiTietSanPham();
        setOpenUpdate(false);
      })
  }
  //Tìm kiếm
  const onChangeFilter = (changedValues, allValues) => {
    if (allValues.hasOwnProperty('ten')) {
      allValues.ten = allValues.ten.trim();
    }
    timKiemSP(allValues);
  }
  const timKiemSP = (dataSearch) => {
    ThuocTinhAPI.search("san-pham", dataSearch)
      .then((res) => {
        setChiTietSanPhams(res.data);
      })
  }

  //Validate
  const validateDateAdd = (_, value) => {
    const { getFieldValue } = form;
    const tenTim = getFieldValue("ten");
    if (tenTim != undefined) {
      if (!tenTim.trim()) {
        return Promise.reject("Tên không được để trống");
      }
    } else {
      return Promise.reject("Tên không được để trống");
    }

    const specialCharacterRegex = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;
    if (specialCharacterRegex.test(tenTim)) {
      return Promise.reject("Tên không được chứa ký tự đặc biệt");
    }

    if (tenTim.trim().length > 30) {
      return Promise.reject("Tên không được vượt quá 30 ký tự");
    }
    return Promise.resolve();
  };

  const validateDateKichThuocUpdate = (_, value) => {
    const { getFieldValue } = form1;
    const tenTim = getFieldValue("ten");
    if (tenTim != undefined) {
      if (!tenTim.trim()) {
        return Promise.reject("Tên không được để trống");
      }
    } else {
      return Promise.reject("Tên không được để trống");
    }

    const specialCharacterRegex = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;
    if (specialCharacterRegex.test(tenTim)) {
      return Promise.reject("Tên không được chứa ký tự đặc biệt");
    }

    if (tenTim.trim().length > 30) {
      return Promise.reject("Tên không được vượt quá 30 ký tự");
    }
    return Promise.resolve();
  };

  const validateDateTim = (_, value) => {
    const { getFieldValue } = formTim;
    const ten = getFieldValue("ten");
    if (ten.trim().length > 30) {
      return Promise.reject("Tên không được vượt quá 30 ký tự");
    }
    return Promise.resolve();
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

  console.log(chiTietSanPham)

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
      title: "Tên Sản Phẩm",
      dataIndex: "tenSP",
      align: "center",
    },
    {
      title: "Kích Thước",
      dataIndex: "tenKichThuoc",
      align: "center",
    },
    {
      title: "Tên Màu Sắc",
      dataIndex: "tenMauSac",
      align: "center",
    },
    {
      title: "Màu Sắc",
      dataIndex: "maMauSac",
      key: "maMauSac",
      align: "center",
      render: (text, record) => {
        return <>
          <div style={{
            backgroundColor: `${record.maMauSac}`,
            borderRadius: 6,
            width: 60,
            height: 25,
          }} className='custom-div'></div >
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
            to={`/admin-chi-tiet-san-pham/${title}`}
            className="btn btn-danger"
          >
            <BsFillEyeFill />
          </Link>
          {/* <a className='btn btn-danger' onClick={() => showModal(`${title}`)}><BsFillEyeFill className='mb-1' /></a> */}
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
            className="row"
            labelCol={{
              span: 10,
            }}
            wrapperCol={{
              span: 20,
            }}
            layout="horizontal"
            initialValues={{
              size: componentSize,
            }}
            onValuesChange={onChangeFilter}
            size={componentSize}
            style={{
              maxWidth: 1400,
            }}
            form={formTim}
          >
            <div className="col-md-5">
              <Form.Item label="Tên & Mã" name="ten" rules={[{ validator: validateDateTim }]}>
                <Input
                  maxLength={31}
                  placeholder="Nhập tên hoặc mã"
                />
              </Form.Item>
            </div>
            <div className="col-md-5">
              <Form.Item
                label="Trạng Thái"
                name="trangThai"
              >
                <Select placeholder="Chọn trạng thái" value={selectedValue} onChange={handleChange}>
                  <Select.Option value="0">Còn Bán</Select.Option>
                  <Select.Option value="1">Dừng Bán</Select.Option>
                </Select>
              </Form.Item>
            </div>
            <Form.Item className="text-center" style={{ paddingLeft: 200 }}>
              <Button
                type="primary"
                htmlType="reset"
                icon={<RetweetOutlined />}
                onClick={loadChiTietSanPham}
              >
                Làm mới
              </Button>
            </Form.Item>
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