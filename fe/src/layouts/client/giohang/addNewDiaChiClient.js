import { Form, Input, Modal, Select, Button } from "antd";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { HomeAPI } from "../../../pages/api/client/HomeAPI";
import { AddressApi } from "../../../pages/api/address/AddressApi";

const AddModalDiaChiClient = (props) => {
  const [form] = Form.useForm();
  const [listProvince, setListProvince] = useState([]);
  const [listDistricts, setListDistricts] = useState([]);
  const [listWard, setListWard] = useState([]);
  const { openModalAddDiaChi, setOpenModalAddDiaChi, idKH, loadDiaChi } = props;

  const handleClose = () => {
    setOpenModalAddDiaChi(false);
  };

  // state lưu chọn
  const [province, setProvince] = useState(null);
  const [district, setDistrict] = useState(null);
  const [ward, setWard] = useState(null);

  // submit form
  const handleSubmit = (value) => {
    const data = {
      ...value,
      idThanhPho: province?.key ?? province?.ProvinceID,
      idHuyen: district?.key ?? district?.DistrictID,
      idXa: ward?.key ?? ward?.WardCode,
      idNguoiDung: idKH,
    };
    HomeAPI.addDCKHClient(data)
      .then(() => {
        toast("✔️ Thêm địa chỉ thành công!", { theme: "light" });
        form.resetFields();
        form.setFieldsValue({ idNguoiDung: idKH });
        loadDiaChi();
        handleClose();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // load danh sách tỉnh
  const loadDataProvince = () => {
    AddressApi.fetchAllProvince().then((res) => {
      setListProvince(res.data.data);
    });
  };

  const handleProvinceChange = (value, option) => {
    AddressApi.fetchAllProvinceDistricts(option.valueProvince).then((res) => {
      setListDistricts(res.data.data);
    });
    setProvince(option);
  };

  const handleDistrictChange = (value, option) => {
    AddressApi.fetchAllProvinceWard(option.valueDistrict).then((res) => {
      setListWard(res.data.data);
    });
    setDistrict(option);
  };

  const handleWardChange = (value, option) => {
    setWard(option);
  };

  useEffect(() => {
    form.setFieldsValue({ idNguoiDung: idKH });
    loadDataProvince();
  }, []);

  return (
    <Modal
      title="Thêm địa chỉ"
      centered
      open={openModalAddDiaChi}
      onCancel={handleClose}
      footer={null} // ❌ bỏ nút OK/Cancel mặc định
      width={600}
    >
      <Form form={form} onFinish={handleSubmit} layout="vertical">
        <Form.Item name="idNguoiDung" hidden></Form.Item>

        <Form.Item
          name="tenNguoiNhan"
          label="Họ và tên"
          rules={[
            { required: true, message: "Vui lòng nhập họ và tên." },
            {
              pattern: /^[A-Za-zÀ-Ỹà-ỹ\s]+$/,
              message: "Họ và tên chỉ được phép chứa chữ cái.",
            },
          ]}
        >
          <Input
            onKeyPress={(e) => {
              if (e.key === " " && e.target.selectionStart === 0) {
                e.preventDefault();
              }
            }}
          />
        </Form.Item>

        <Form.Item
          name="soDienThoai"
          label="Số điện thoại"
          rules={[
            { required: true, message: "Vui lòng nhập số điện thoại." },
            {
              pattern: /^0\d{9}$/,
              message: "Vui lòng nhập số điện thoại hợp lệ.",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="tenThanhPho"
          label="Tỉnh/Thành phố"
          rules={[{ required: true, message: "Vui lòng chọn Tỉnh/Thành phố." }]}
        >
          <Select
            placeholder="--Chọn Tỉnh/Thành phố--"
            onChange={handleProvinceChange}
          >
            {listProvince?.map((item) => (
              <Select.Option
                key={item.ProvinceID}
                value={item.ProvinceName}
                valueProvince={item.ProvinceID}
              >
                {item.ProvinceName}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          name="tenHuyen"
          label="Quận/Huyện"
          rules={[{ required: true, message: "Vui lòng chọn Quận/Huyện." }]}
        >
          <Select
            placeholder="--Chọn Quận/Huyện--"
            onChange={handleDistrictChange}
          >
            {listDistricts?.map((item) => (
              <Select.Option
                key={item.DistrictID}
                value={item.DistrictName}
                valueDistrict={item.DistrictID}
              >
                {item.DistrictName}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          name="tenXa"
          label="Xã/Phường"
          rules={[{ required: true, message: "Vui lòng chọn Xã/Phường." }]}
        >
          <Select placeholder="--Chọn Xã/Phường--" onChange={handleWardChange}>
            {listWard?.map((item) => (
              <Select.Option
                key={item.WardCode}
                value={item.WardName}
                valueWard={item.WardCode}
              >
                {item.WardName}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          name="diaChi"
          label="Số nhà"
          rules={[{ required: true, message: "Vui lòng nhập số nhà." }]}
        >
          <Input />
        </Form.Item>

        {/* Footer custom */}
        <div style={{ textAlign: "right" }}>
          <Button onClick={handleClose} style={{ marginRight: 8 }}>
            Hủy
          </Button>
          <Button type="primary" htmlType="submit">
            Lưu địa chỉ
          </Button>
        </div>
      </Form>

      <ToastContainer position="top-right" autoClose={5000} theme="light" />
    </Modal>
  );
};

export default AddModalDiaChiClient;
