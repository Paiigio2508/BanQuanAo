import React, { useEffect, useState } from 'react';
import { Button, Divider, Form, Input, Select, Space, Table, Tag, Modal, Radio } from 'antd';
import { PlusCircleOutlined, RetweetOutlined } from "@ant-design/icons";
import { BookFilled } from "@ant-design/icons";
import { FilterFilled } from "@ant-design/icons";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BsFillEyeFill } from 'react-icons/bs';
import { IoColorPalette } from 'react-icons/io5';
import convert from 'color-convert';
import './SanPham.css'
import { ThuocTinhAPI } from '../../../pages/api/sanpham/ThuocTinh.api';
export default function MauSac() {
  //Form
  const [formTim] = Form.useForm();
  const [selectedValue, setSelectedValue] = useState('1');
  const handleChange = (value) => {
    setSelectedValue(value);
  };
  const formItemLayout = {
    labelCol: {
      span: 4
    },
    wrapperCol: {
      span: 20
    },
  };

  const doiMau = (e) => {
    const ma = e.target.value;
    const hexCode = ma.replace("#", "").toUpperCase();
    const rgb = convert.hex.rgb(hexCode);
    const colorName = convert.rgb.keyword(rgb);
    if (colorName !== null) {
      form.setFieldsValue({ ten: colorName });
    }
  };
  const doiMauUpdate = (e) => {
    const ma = e.target.value;
    const hexCode = ma.replace("#", "").toUpperCase();
    const rgb = convert.hex.rgb(hexCode);
    const colorName = convert.rgb.keyword(rgb);
    if (colorName !== null) {
      setmsUpdates({
        ...msUpdate,
        ma: e.target.value,
        ten: colorName
      });
    }
  };
  const [componentSize, setComponentSize] = useState('default');
  const onFormLayoutChange = ({ size }) => {
    setComponentSize(size);
  };
  const formChange = (changedValues, allValues) => {
  };
  const [form] = Form.useForm();
  const [form1] = Form.useForm();
  //Tìm kiếm
  const onChangeFilter = (changedValues, allValues) => {
    if (allValues.hasOwnProperty('ten')) {
      allValues.ten = allValues.ten.trim();
    }
    timKiemCT(allValues);
  }
  const timKiemCT = (dataSearch) => {
    ThuocTinhAPI.search("mau-sac", dataSearch)
      .then((res) => {
        setMauSacs(res.data);
      })
  }
  //Validate
  const validateDateMauSac = (_, value) => {
    const { getFieldValue } = form;
    const tenMauSac = getFieldValue("ten");
    if (tenMauSac != undefined) {
      if (!tenMauSac.trim()) {
        return Promise.reject("Tên không được để trống");
      }
    } else {
      return Promise.reject("Tên không được để trống");
    }
    const specialCharacterRegex = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;
    if (specialCharacterRegex.test(tenMauSac)) {
      return Promise.reject("Tên không được chứa ký tự đặc biệt");
    }
    if (tenMauSac.trim().length > 50) {
      return Promise.reject("Tên không được vượt quá 50 ký tự");
    }
    return Promise.resolve();
  };

  const validateDateMauSacUpdate = (_, value) => {
    const { getFieldValue } = form1;
    const tenMauSac = getFieldValue("ten");
    if (tenMauSac != undefined) {
      if (!tenMauSac.trim()) {
        return Promise.reject("Tên không được để trống");
      }
    } else {
      return Promise.reject("Tên không được để trống");
    }
    const specialCharacterRegex = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;
    if (specialCharacterRegex.test(tenMauSac)) {
      return Promise.reject("Tên không được chứa ký tự đặc biệt");
    }
    if (tenMauSac.trim().length > 50) {
      return Promise.reject("Tên không được vượt quá 50 ký tự");
    }
    return Promise.resolve();
  };

  const validateDateTim = (_, value) => {
    const { getFieldValue } = formTim;
    const tenHang = getFieldValue("ten");
    if (tenHang.trim().length > 30) {
      return Promise.reject("Tên không được vượt quá 30 ký tự");
    }
    return Promise.resolve();
  };
  //Ấn Add
  const [open, setOpen] = useState(false);
  const [bordered] = useState(false);
  const addMauSac = (value) => {

    const checkTrungTen = (ten) => {
      return mauSac.some(x =>
        x.ten.toLowerCase().trim() === ten.toLowerCase().trim()
      );
    };

    if (checkTrungTen(value.ten)) {
      toast.error('Tên màu trùng với màu sắc khác!', {
        position: "top-right",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return;
    }

    const checkTrungMa = (ma) => {
      return mauSac.some(x =>
        x.ma === ma
      );
    };

    if (checkTrungMa(value.ma)) {
      toast.error('Mã màu trùng với màu sắc khác!', {
        position: "top-right",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return;
    }

    ThuocTinhAPI.create("mau-sac", value)
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
        loadMauSac();
        setOpen(false);
        form.resetFields();
      })
  }
  //Update
  const [msUpdate, setmsUpdates] = useState("");
  const [openUpdate, setOpenUpdate] = useState(false);
  const [tenCheck, setTenCheck] = useState("");
  const [maCheck, setMaCheck] = useState("");
  const showModal = async (id) => {
    ThuocTinhAPI.detail("mau-sac", id).then((res) => {
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
      setmsUpdates(res.data)
      setTenCheck(res.data.ten)
      setMaCheck(res.data.ma)
    });
    setOpenUpdate(true);
  };
  const updateMauSac = () => {

    const checkTrungTen = (ten) => {
      return mauSac.some(x =>
        x.ten.toLowerCase().trim() === ten.toLowerCase().trim()
      );
    };

    if (msUpdate.ten != tenCheck) {
      if (checkTrungTen(msUpdate.ten)) {
        toast.error('Tên màu trùng với màu sắc khác!', {
          position: "top-right",
          autoClose: 2500,
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

    const checkTrungMa = (ma) => {
      return mauSac.some(x =>
        x.ma === ma
      );
    };

    if (msUpdate.ma != maCheck) {
      if (checkTrungMa(msUpdate.ma)) {
        toast.error('Mã màu trùng với màu sắc khác!', {
          position: "top-right",
          autoClose: 2500,
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

    ThuocTinhAPI.update("mau-sac", msUpdate.id, msUpdate)
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
        setmsUpdates("");
        loadMauSac();
        setOpenUpdate(false);
      })
  }
  //Table
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
      title: "Màu",
      dataIndex: "ma",
      key: "Ma",
      render: (text, record) => {
        return <>
          <div style={{
            backgroundColor: `${record.ma}`,
            borderRadius: 6,
            width: 60,
            height: 25,
          }} className='custom-div'></div >
        </>;
      }
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
            <IoColorPalette size={35} /> Quản lý màu sắc
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
              <Form.Item label="Trạng Thái" name="trangThai">
                <Select
                  placeholder="Chọn trạng thái"
                  value={selectedValue}
                  onChange={handleChange}
                >
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
                onClick={loadMauSac}
              >
                Làm mới
              </Button>
            </Form.Item>
          </Form>
        </div>

        <div className="text-end">
          <button onClick={() => setOpen(true)} class="button-them">
            <span class="text">
              <PlusCircleOutlined /> Thêm màu sắc{" "}
            </span>
          </button>
        </div>
        <div
          className=" bg-light m-2 mt-3 p-3 pt-2"
          style={{
            border: "1px solid #ddd", // Border color
            boxShadow: "0 3px 8px rgba(0, 0, 0, 0.1)", // Box shadow
            borderRadius: "8px",
          }}
        >
          <h5>
            <BookFilled size={30} /> Danh sách màu sắc
          </h5>
          <hr />
          <div className="ms-3">
            {/* Add ms */}
            <Modal
              title="Thêm Màu Sắc"
              centered
              open={open}
              onOk={() => form.submit()}
              onCancel={() => setOpen(false)}
              width={400}
            >
              <Form
                {...formItemLayout}
                initialValues={{
                  size: componentSize,
                }}
                onValuesChange={formChange}
                size={componentSize}
                onFinish={addMauSac}
                layout="vertical"
                form={form}
              >
                <div className="row">
                  <label>
                    <b>Màu sắc :</b>
                  </label>
                  <Form.Item
                    name="ma"
                    hasFeedback
                    rules={[{ required: true, message: "Vui lòng chọn màu" }]}
                  >
                    <Input
                      className="card-mau"
                      type="color"
                      onChange={doiMau}
                      style={{ width: "350px" }}
                    />
                  </Form.Item>
                  <label>
                    <b>Mã màu :</b>
                  </label>
                  <Form.Item
                    name="ma"
                    hasFeedback
                    rules={[{ required: true, message: "" }]}
                  >
                    <Input readOnly="true" className="border" type="text" style={{ width: "350px" }} />
                  </Form.Item>
                  <label>
                    <b>Tên màu :</b>
                  </label>
                  <Form.Item
                    name="ten"
                    hasFeedback
                    rules={[
                      {
                        validator: validateDateMauSac
                      },
                    ]}
                  >
                    <Input style={{ width: "350px" }} maxLength={51} onChange={(e) => form.setFieldsValue({ ten: e.target.value })} type="text" />
                  </Form.Item>

                </div>
              </Form>
            </Modal>
            {/* Update ms */}
            <Modal
              title="Sửa Màu Sắc"
              centered
              open={openUpdate}
              onOk={() => form1.submit()}
              onCancel={() => setOpenUpdate(false)}
              width={400}
            >
              <Form
                {...formItemLayout}
                initialValues={{
                  size: componentSize,
                }}
                size={componentSize}
                onFinish={updateMauSac}
                form={form1}
              >
                <div className="row">
                  <label>
                    <b>Màu sắc :</b>
                  </label>
                  <Form.Item
                    name="ma"
                    hasFeedback
                    rules={[{ required: true, message: "Vui lòng chọn màu" }]}
                  >
                    <Input
                      className="card-mau"
                      type="color"
                      onChange={doiMauUpdate}
                      style={{ width: "350px" }}
                    />
                  </Form.Item>
                  <label>
                    <b>Mã màu :</b>
                  </label>
                  <Form.Item
                    name="ma"
                    hasFeedback
                    rules={[{ required: true, message: "" }]}
                  >
                    <Input
                      readOnly={true}
                      className="border"
                      value={msUpdate.ma}
                      style={{ width: "350px" }}
                      type="text" />
                  </Form.Item>

                  <label>
                    <b>Tên màu :</b>
                  </label>
                  <Form.Item
                    name="ten"
                    hasFeedback
                    rules={[
                      {
                        validator: validateDateMauSacUpdate
                      },
                    ]}
                  >
                    <Input
                      maxLength={51}
                      type="text"
                      style={{ width: "350px" }}
                      onChange={(e) =>
                        setmsUpdates({
                          ...msUpdate,
                          ten: e.target.value,
                        })
                      }
                    />
                  </Form.Item>

                  <label>
                    <b>Trạng thái :</b>
                  </label>
                  <Form.Item>
                    <Radio.Group
                      onChange={(e) =>
                        setmsUpdates({
                          ...msUpdate,
                          trangThai: e.target.value,
                        })
                      }
                      value={msUpdate.trangThai}
                    >
                      <Radio value={0}>Còn bán</Radio>
                      <Radio value={1}>Dừng bán</Radio>
                    </Radio.Group>
                  </Form.Item>

                </div>

              </Form>
            </Modal>
          </div>
          <div className="container-fluid mt-4">
            <div>
              <Table
                className="text-center"
                dataSource={mauSac}
                columns={columns}
                pagination={{
                  showQuickJumper: true,
                  defaultPageSize: 5,
                  position: ["bottomCenter"],
                  defaultCurrent: 1,
                  total: mauSac.length,
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