import React, { useEffect, useState } from 'react';
import { Button, Divider, Form, Input, Radio, Select, Space, Table, Tag, Modal } from 'antd';
import { PlusCircleOutlined, RetweetOutlined } from "@ant-design/icons";
import { BookFilled } from "@ant-design/icons";
import { FilterFilled } from "@ant-design/icons";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { GiMaterialsScience } from 'react-icons/gi';
import { BsFillEyeFill } from 'react-icons/bs';
import { ThuocTinhAPI } from '../../../pages/api/sanpham/ThuocTinh.api';
export default function GioiTinh() {
  //Form
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
  const addGioiTinh = (value) => {
    const checkTrung = (code) => {
      return gioiTinh.some(cl => cl.ten.trim().toLowerCase() === code.trim().toLowerCase());
    };
    if (!(checkTrung(value.ten))) {
      ThuocTinhAPI.create("gioi-tinh",value)
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
          loadGioiTinh();
          setOpen(false);
          form.resetFields();
        })
    } else {
      toast.error('Giới tính đã tồn tại!', {
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
    await ThuocTinhAPI.detail("gioi-tinh",idDetail)
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
  const updateGioiTinh = () => {
    if (clUpdate.ten != tenCheck) {
      const checkTrung = (ten) => {
        return gioiTinh.some(x =>
          x.ten.trim().toLowerCase() === ten.trim().toLowerCase()
        );
      };

      if (checkTrung(clUpdate.ten)) {
        toast.error('Giới tính trùng với giới tính khác !', {
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
    ThuocTinhAPI.update("gioi-tinh",clUpdate.id, clUpdate)
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
        loadGioiTinh();
        setOpenUpdate(false);
      })
  }
  //Tìm kiếm
  const onChangeFilter = (changedValues, allValues) => {
    if (allValues.hasOwnProperty('ten')) {
      allValues.ten = allValues.ten.trim();
    }
    timKiemGT(allValues);
  }
  const timKiemGT = (dataSearch) => {
    ThuocTinhAPI.search("gioi-tinh",dataSearch)
      .then((res) => {
        setGioiTinhs(res.data);
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
          <a className='btn btn-danger' onClick={() => showModal(`${title}`)}><BsFillEyeFill className='mb-1' /></a>
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
            <GiMaterialsScience size={35} /> Quản lý giới tính
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
                onClick={loadGioiTinh}
              >
                Làm mới
              </Button>
            </Form.Item>
          </Form>
        </div>

        <div className="text-end ms-5">
          <button onClick={() => setOpen(true)} class="button-them">
            <span class="text">
              <PlusCircleOutlined /> Thêm giới tính
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
            <BookFilled size={30} /> Danh sách giới tính
          </h5>
          <hr />
          <div className="ms-3">
            {/* Add cl */}
            <Modal
              title="Thêm Giới Tính"
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
                onFinish={addGioiTinh}
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
            {/* Update Giới Tính */}
            <Modal
              title="Sửa Giới Tính"
              centered
              open={openUpdate}
              onOk={() => form1.submit()}
              onCancel={() => setOpen(false)}
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
                onFinish={updateGioiTinh}
                form={form1}
              >
                <Form.Item
                  name="ten"
                  label={<b>Tên</b>}
                  hasFeedback
                  rules={[
                    { required: true, validator: validateDateKichThuocUpdate },
                  ]}
                >
                  <Input
                    className="border"
                    maxLength={31}
                    value={clUpdate.ten}
                    onChange={(e) =>
                      setClUpdate({ ...clUpdate, ten: e.target.value })
                    }
                  ></Input>
                </Form.Item>
                <Form.Item name="trangThai" label={<b>Trạng thái </b>}>
                  <Radio.Group
                    onChange={(e) =>
                      setClUpdate({
                        ...clUpdate,
                        trangThai: e.target.value,
                      })
                    }
                    value={clUpdate.trangThai}
                  >
                    <Radio value={0}>Còn bán</Radio>
                    <Radio value={1}>Dừng bán</Radio>
                  </Radio.Group>
                </Form.Item>
              </Form>
            </Modal>
          </div>
          <div className="container-fluid mt-4">
            <div>
              <Table
                className="text-center"
                dataSource={gioiTinh}
                columns={columns}
                pagination={{
                  showQuickJumper: true,
                  defaultPageSize: 5,
                  position: ["bottomCenter"],
                  defaultCurrent: 1,
                  total: gioiTinh.length,
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