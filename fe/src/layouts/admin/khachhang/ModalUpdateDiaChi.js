import { Form, Input, Modal, Select } from "antd";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { AddressApi } from "../../../pages/api/address/AddressApi";
import { KhachHangAPI } from "../../../pages/api/khachhang/KhachHangAPI";

const ModalUpdateDiaChi = (props) => {
  const [form] = Form.useForm();
  const [listProvince, setListProvince] = useState([]);
  const [listDistricts, setListDistricts] = useState([]);
  const [listWard, setListWard] = useState([]);

  const {
    openModalUpdateDiaChi,
    setOpenModalUpdateDiaChi,
    diaChiUpdate,
    loadDiaChi,
  } = props;

  const handleClose = () => setOpenModalUpdateDiaChi(false);

  const handleUpdateDC = (value) => {
    KhachHangAPI.updateDiaChiByID(value.id, value)
      .then(() => {
        toast.success("✔️ Cập nhật địa chỉ thành công!");
        form.resetFields();
        loadDiaChi();
        handleClose();
      })
      .catch(() => {
        toast.error("Cập nhật địa chỉ thất bại!");
      });
  };

  const loadDataProvince = () => {
    AddressApi.fetchAllProvince()
      .then((res) => {
        setListProvince(res.data.data);
      })
      .catch(() => {
        toast.error("Lỗi tải tỉnh/thành phố!");
      });
  };

  const handleProvinceChange = (_, option) => {
    form.setFieldsValue({ tenThanhPho: option.valueProvince });
    AddressApi.fetchAllProvinceDistricts(option.valueProvince)
      .then((res) => {
        setListDistricts(res.data.data);
      })
      .catch(() => {
        toast.error("Lỗi tải quận/huyện!");
      });
  };

  const handleDistrictChange = (_, option) => {
    form.setFieldsValue({ tenHuyen: option.valueDistrict });
    AddressApi.fetchAllProvinceWard(option.valueDistrict)
      .then((res) => {
        setListWard(res.data.data);
      })
      .catch(() => {
        toast.error("Lỗi tải xã/phường!");
      });
  };

  const handleWardChange = (_, option) => {
    form.setFieldsValue({ tenXa: option.valueWard });
  };

  useEffect(() => {
    if (diaChiUpdate) {
      form.setFieldsValue({
        id: diaChiUpdate.id,
        idNguoiDung: diaChiUpdate.nguoiDung,
        diaChi: diaChiUpdate.diaChi,
        tenNguoiNhan: diaChiUpdate.tenNguoiNhan,
        soDienThoai: diaChiUpdate.soDienThoai,
        tenThanhPho: diaChiUpdate.tenThanhPho,
        tenHuyen: diaChiUpdate.tenHuyen,
        tenXa: diaChiUpdate.tenXa,
        trangThai: diaChiUpdate.trangThai,
        idXa: diaChiUpdate.idXa,
        idHuyen: diaChiUpdate.idHuyen,
        idThanhPho: diaChiUpdate.idThanhPho,
      });
      loadDataProvince();
    }
  }, [diaChiUpdate]);

  return (
    <Modal
      title="Cập nhật địa chỉ"
      centered
      open={openModalUpdateDiaChi}
      onOk={() => form.submit()}
      onCancel={handleClose}
      width={600}
    >
      <Form form={form} onFinish={handleUpdateDC} layout="vertical">
        <Form.Item name="idNguoiDung" hidden>
          <Input />
        </Form.Item>
        <Form.Item name="trangThai" hidden>
          <Input />
        </Form.Item>
        <Form.Item name="idXa" hidden>
          <Input />
        </Form.Item>
        <Form.Item name="idHuyen" hidden>
          <Input />
        </Form.Item>
        <Form.Item name="idThanhPho" hidden>
          <Input />
        </Form.Item>
        <Form.Item name="id" hidden />

        <Form.Item
          name="tenNguoiNhan"
          label="Họ và tên"
          tooltip="Họ tên đầy đủ của bạn là gì?"
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
              if (e.key === " " && e.target.selectionStart === 0)
                e.preventDefault();
            }}
          />
        </Form.Item>

        <Form.Item
          name="soDienThoai"
          label="Số điện thoại"
          tooltip="Số điện thoại của bạn là gì?"
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
            onChange={handleProvinceChange}
            placeholder="--Chọn Tỉnh/Thành phố--"
          >
            {listProvince.map((item) => (
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
            onChange={handleDistrictChange}
            placeholder="--Chọn Quận/Huyện--"
          >
            {listDistricts.map((item) => (
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
          <Select onChange={handleWardChange} placeholder="--Chọn Xã/Phường--">
            {listWard.map((item) => (
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
      </Form>
    </Modal>
  );
};

export default ModalUpdateDiaChi;
