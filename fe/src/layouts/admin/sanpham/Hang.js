import React, { useEffect, useState } from 'react';
import { Button, Divider, Form, Radio, Input, Select, Space, Table, Tag, Modal } from 'antd';
import { PlusCircleOutlined, RetweetOutlined } from "@ant-design/icons";
import { BookFilled } from "@ant-design/icons";
import { FilterFilled } from "@ant-design/icons";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BsFillEyeFill } from 'react-icons/bs';
import { PiTrademarkFill } from 'react-icons/pi';
import { ThuocTinhAPI } from '../../../pages/api/sanpham/ThuocTinh.api';

export default function Hang() {
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
  const formItemLayout = {
    labelCol: {
      span: 4
    },
    wrapperCol: {
      span: 20
    },
  };
  //Ấn Add
  const [open, setOpen] = useState(false);
  const [bordered] = useState(false);
  const addHang = (value) => {
    const checkTrung = (code) => {
      return hang.some(h => h.ten.trim().toLowerCase() === code.trim().toLowerCase());
    };
    if (!(checkTrung(value.ten))) {
      ThuocTinhAPI.create("hang",value)
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
          loadHang();
          setOpen(false);
          form.resetFields();
        })
    } else {
      toast.error('Hãng đã tồn tại!', {
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
  const [hangUpdate, setHangUpdate] = useState("");
  const [tenCheck, setTenCheck] = useState("");

  const showModal = async (idDetail) => {
    await ThuocTinhAPI.detail("hang",idDetail)
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
        setHangUpdate(res.data)
      })
    setOpenUpdate(true)
  };
  const updateHang = () => {

    if (hangUpdate.ten != tenCheck) {
      const checkTrung = (ten) => {
        return hang.some(x =>
          x.ten.trim().toLowerCase() === ten.trim().toLowerCase()
        );
      };

      if (checkTrung(hangUpdate.ten)) {
        toast.error('Hãng trùng với hãng khác !', {
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
    ThuocTinhAPI.update("hang",hangUpdate.id, hangUpdate)
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
        setHangUpdate("");
        loadHang();
        setOpenUpdate(false);
      })
  }
  //Tìm kiếm
  const onChangeFilter = (changedValues, allValues) => {
    if (allValues.hasOwnProperty('ten')) {
      allValues.ten = allValues.ten.trim();
    }
    timKiemHang(allValues);
  }
  const timKiemHang = (dataSearch) => {
    ThuocTinhAPI.search("hang",dataSearch)
      .then((res) => {
        setHangs(res.data);
      })
  }

  //Validate
  const validateDateHang = (_, value) => {
    const { getFieldValue } = form;
    const tenHang = getFieldValue("ten");
    if(tenHang!=undefined){
      if (!tenHang.trim()) {
        return Promise.reject("Tên không được để trống");
      }
    }else{
      return Promise.reject("Tên không được để trống");
    }
    const specialCharacterRegex = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;
    if (specialCharacterRegex.test(tenHang)) {
      return Promise.reject("Tên không được chứa ký tự đặc biệt");
    }
    if (tenHang.trim().length > 30) {
      return Promise.reject("Tên không được vượt quá 30 ký tự");
    }
    return Promise.resolve();
  };

  const validateDateHangUpdate = (_, value) => {
    const { getFieldValue } = form1;
    const tenHang = getFieldValue("ten");
    if(tenHang!=undefined){
      if (!tenHang.trim()) {
        return Promise.reject("Tên không được để trống");
      }
    }else{
      return Promise.reject("Tên không được để trống");
    }
    const specialCharacterRegex = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;
    if (specialCharacterRegex.test(tenHang)) {
      return Promise.reject("Tên không được chứa ký tự đặc biệt");
    }
    if (tenHang.trim().length > 30) {
      return Promise.reject("Tên không được vượt quá 30 ký tự");
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

  //Table
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
            <PiTrademarkFill size={35} /> Quản lý hãng
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
                onClick={loadHang}
              >
                Làm mới
              </Button>
            </Form.Item>
          </Form>
        </div>

        <div className="text-end">
          <button onClick={() => setOpen(true)} class="button-them">
            <span class="text">
              <PlusCircleOutlined /> Thêm hãng
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
            <BookFilled size={30} /> Danh sách hãng
          </h5>
          <hr />
          <div className="ms-3">
            {/* Add cl */}
            <Modal
              title="Thêm Hãng"
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
                onFinish={addHang}
                form={form}
              >
                <Form.Item
                  label="Tên"
                  name="ten"
                  hasFeedback
                  required={true}
                  rules={[{ validator: validateDateHang }]}
                >
                  <Input maxLength={31} className="border" />
                </Form.Item>
              </Form>
            </Modal>
            {/* Update hãng */}
            <Modal
              title="Sửa hãng"
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
                onFinish={updateHang}
                form={form1}
              >
                <Form.Item
                  name="ten"
                  label={<b>Tên</b>}
                  hasFeedback
                  rules={[
                    { required: true, validator: validateDateHangUpdate },
                  ]}
                >
                  <Input
                    className="border"
                    maxLength={31}
                    value={hangUpdate.ten}
                    onChange={(e) =>
                      setHangUpdate({ ...hangUpdate, ten: e.target.value })
                    }
                  ></Input>
                </Form.Item>
                <Form.Item name="trangThai" label={<b>Trạng thái </b>}>
                  <Radio.Group
                    onChange={(e) =>
                      setHangUpdate({
                        ...hangUpdate,
                        trangThai: e.target.value,
                      })
                    }
                    value={hangUpdate.trangThai}
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
                dataSource={hang}
                columns={columns}
                pagination={{
                  showQuickJumper: true,
                  defaultPageSize: 5,
                  position: ["bottomCenter"],
                  defaultCurrent: 1,
                  total: hang.length,
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