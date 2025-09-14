import React, { useEffect, useState } from 'react';
import { Button, Divider, Radio, Form, Input, Select, Space, Table, Tag, Modal } from 'antd';
import { PlusCircleOutlined, RetweetOutlined } from "@ant-design/icons";
import { BookFilled } from "@ant-design/icons";
import { FilterFilled } from "@ant-design/icons";
import { BiSolidCategory } from 'react-icons/bi';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BsFillEyeFill } from 'react-icons/bs';
import { ThuocTinhAPI } from '../../../pages/api/sanpham/ThuocTinh.api';

export default function KichThuoc() {
  //Form
  const [selectedValue, setSelectedValue] = useState('1');
  const handleChange = (value) => {
    setSelectedValue(value);
  };
  const [formTim] = Form.useForm();
  const [componentSize, setComponentSize] = useState('default');
  const onFormLayoutChange = ({ size }) => {
    setComponentSize(size);
  };
  const formItemLayout = {
    labelCol: {
      span: 4
    },
    wrapperCol: {
      span: 20
    },
  };
  //Ấn add 
  const [open, setOpen] = useState(false);
  const [bordered] = useState(false);
  const addKichThuoc = (value) => {
    const checkTrung = (code) => {
      return kichThuoc.some(kt => kt.ten.trim().toLowerCase() === code.trim().toLowerCase());
    };
    if (!(checkTrung(value.ten))) {
      ThuocTinhAPI.create("kich-thuoc",value)
        .then((res) => {
          toast('✔️ Thêm thành công!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          loadKichThuoc();
          setOpen(false);
          form.resetFields();
        })
    } else {
      toast.error('Kích thước đã tồn tại!', {
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
  const [ktUpdate, setDmUpdate] = useState("");
  const [tenCheck, setTenCheck] = useState("");

  const showModal = async (idDetail) => {
    await ThuocTinhAPI.detail("kich-thuoc",idDetail)
      .then((res) => {
        form1.setFieldsValue({
          id: res.data.id,
          ma: res.data.ma,
          ten: res.data.ten,
          trangThai: res.data.trangThai,
          ngayTao: res.data.ngayTao,
          ngaySua: res.data.ngaySua,
          nguoiTao: res.data.nguoiTao,
          nguoiSua: res.data.nguoiSua,
        });
        setTenCheck(res.data.ten)
        setDmUpdate(res.data)
      })
      setOpenUpdate(true)
  };
  const updateKichThuoc = () => {

    if (ktUpdate.ten != tenCheck) {
      const checkTrung = (ten) => {
        return kichThuoc.some(kt =>
          kt.ten.trim().toLowerCase() === ten.trim().toLowerCase()
        );
      };

      if (checkTrung(ktUpdate.ten)) {
        toast.error('Kích thước trùng với kích thước khác !', {
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
    ThuocTinhAPI.update("kich-thuoc",ktUpdate.id, ktUpdate)
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
        setDmUpdate("");
        loadKichThuoc();
        setOpenUpdate(false);

      })
  }
  //Tìm kiếm
  const onChangeFilter = (changedValues, allValues) => {
    if (allValues.hasOwnProperty('ten')) {
      allValues.ten = allValues.ten.trim();
    }
    timKiemCT(allValues);
  }
  const timKiemCT = (dataSearch) => {
    ThuocTinhAPI.search("kich-thuoc",dataSearch)
      .then((res) => {
        setKichThuocs(res.data);
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

    const specialCharacterRegex = /[!@#$%^&*()_+\=\[\]{};':"\\|,.<>\/?]/;
    if (specialCharacterRegex.test(tenTim)) {
      return Promise.reject("Tên không được chứa ký tự đặc biệt");
    }

    if (tenTim.trim().length > 30) {
      return Promise.reject("Tên không được vượt quá 30 ký tự");
    }
    return Promise.resolve();
  };

  const validateDateUpdate = (_, value) => {
    const { getFieldValue } = form1;
    const tenTim = getFieldValue("ten");
    if (tenTim != undefined) {
      if (!tenTim.trim()) {
        return Promise.reject("Tên không được để trống");
      }
    } else {
      return Promise.reject("Tên không được để trống");
    }

    const specialCharacterRegex = /[!@#$%^&*()_+\=\[\]{};':"\\|,.<>\/?]/;
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

  const columns = [
    {
      title: "STT",
      dataIndex: "id",
      key: "id",
      render: (id, record, index) => {
        ++index;
        return index;
      },
      showSorterTooltip: false,
    },
    {
      title: "Mã",
      dataIndex: "ma",
      center: "true",
      sorter: (a, b) => a.ma - b.ma,
    }, ,
    {
      title: "Tên",
      dataIndex: "ten",
    },
    {
      title: "Trạng thái",
      dataIndex: "trangThai",
      key: "trangThai",
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
      dataIndex: "id",
      render: (title) => (
        <Space size="middle">
          <a className='btn btn-danger' onClick={() => showModal(`${title}`) }><BsFillEyeFill className='mb-1' /></a>
        </Space>
      ),
    },
  ]
  const [form] = Form.useForm();
  const [form1] = Form.useForm();
  return (
    <div className="container-fluid" style={{ borderRadius: 20 }}>
      <div className="container-fluid">
        <Divider orientation="center" color="#d0aa73">
          <h4 className="text-first pt-1 fw-bold">
            {" "}
            <BiSolidCategory size={35} /> Quản lý kích thước
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
                onClick={loadKichThuoc}
              >
                Làm mới
              </Button>
            </Form.Item>
          </Form>
        </div>
        <div className="text-end">
          <button onClick={() => setOpen(true)} class="button-them">
            <span class="text">
              <PlusCircleOutlined /> Thêm kích thước
            </span>
          </button>
        </div>
        <div
          className=" bg-light mt-3 m-2 p-3 pt-2"
          style={{
            border: "1px solid #ddd", // Border color
            boxShadow: "0 3px 8px rgba(0, 0, 0, 0.1)", // Box shadow
            borderRadius: "8px",
          }}
        >
          <h5>
            <BookFilled size={30} /> Danh sách kích thước
          </h5>
          <hr />
          <div className="ms-3">
            {/* Add kích thước */}

            <Modal
              title="Thêm Kích Thước"
              centered
              open={open}
              onOk={() => form.submit()}
              onCancel={() => setOpen(false)}
              width={500}
            >
              <Form
                initialValues={{
                  size: componentSize,
                }}
                onValuesChange={onFormLayoutChange}
                size={componentSize}
                style={{
                  maxWidth: 1000,
                }}
                onFinish={addKichThuoc}
                form={form}
              >
                <Form.Item
                  label="Tên"
                  name="ten"
                  hasFeedback
                  rules={[{ required: true,validator: validateDateAdd }]}
                >
                  <Input maxLength={31} className="border" />
                </Form.Item>
              </Form>
            </Modal>

            {/* Update kích thước */}
            <Modal
              title="Sửa Kích Thước"
              centered
              open={openUpdate}
              onOk={() => form1.submit()}
              onCancel={() => {
                setOpenUpdate(false);
              }}
                          width={500}
            >
              <Form
                {...formItemLayout}
                initialValues={{
                  size: componentSize,
                }}
                onValuesChange={onFormLayoutChange}
                size={componentSize}
                style={{
                  maxWidth: 1000,
                }}
                onFinish={updateKichThuoc}
                form={form1}
                >
                  <Form.Item
                    name="ten"
                    label={<b>Tên</b>}
                    hasFeedback
                    rules={[
                      { required: true, validator: validateDateUpdate },
                    ]}
                  >
                    <Input
                      className="border"
                      maxLength={31}
                      value={ktUpdate.ten}
                      onChange={(e) =>
                        setDmUpdate({ ...ktUpdate, ten: e.target.value })
                      }
                    ></Input>
                  </Form.Item>
                <Form.Item label={<b>Trạng thái </b>}>
                  <Radio.Group
                    onChange={(e) =>
                      setDmUpdate({ ...ktUpdate, trangThai: e.target.value })
                    }
                    value={ktUpdate.trangThai}
                  >
                    <Radio value={0}>Còn bán</Radio>
                    <Radio value={1}>Dừng bán</Radio>
                  </Radio.Group>
                </Form.Item>
              </Form>
            </Modal>
          </div>
          <div className="container-fluid mt-4">
            <Table
              align="center"
              dataSource={kichThuoc}
              columns={columns}
              pagination={{
                showQuickJumper: true,
                defaultPageSize: 5,
                position: ["bottomCenter"],
                defaultCurrent: 1,
                total: kichThuoc.length,
              }}
            />
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