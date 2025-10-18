import { Form, Input, Modal, Select, Button } from "antd";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { HomeAPI } from "../../../pages/api/client/HomeAPI";
import { AddressApi } from "../../../pages/api/address/AddressApi";
import { get } from "local-storage";
const ModalUpdateDiaChi = (props) => {
  const [form] = Form.useForm();
    const [userID, setUserID] = useState("");
  const [listProvince, setListProvince] = useState([]);
  const [listDistricts, setListDistricts] = useState([]);
  const [listWard, setListWard] = useState([]);
  const storedData = get("userData");
  const {
    openModalUpdateDiaChi,
    setOpenModalUpdateDiaChi,
    diaChiUpdate,
    loadDiaChi,
  } = props;

  const handleClose = () => setOpenModalUpdateDiaChi(false);

  const handleUpdateDC = (value) => {
    HomeAPI.updateDiaChiByIDKHClient(value.id, value)
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

  // ================== LOADERS ==================
  const loadDataProvince = () => {
    AddressApi.fetchAllProvince()
      .then((res) => setListProvince(res.data.data))
      .catch(() => toast.error("Lỗi tải tỉnh/thành phố!"));
  };

  const loadDistrictsByProvinceId = (provinceId) => {
    if (!provinceId) return setListDistricts([]);
    AddressApi.fetchAllProvinceDistricts(provinceId)
      .then((res) => setListDistricts(res.data.data))
      .catch(() => toast.error("Lỗi tải quận/huyện!"));
  };

  const loadWardsByDistrictId = (districtId) => {
    if (!districtId) return setListWard([]);
    AddressApi.fetchAllProvinceWard(districtId)
      .then((res) => setListWard(res.data.data))
      .catch(() => toast.error("Lỗi tải xã/phường!"));
  };

  // ================== ONCHANGE ==================
  // value: tên hiển thị, option.id: ID thật
  const handleProvinceChange = (value, option) => {
    form.setFieldsValue({
      tenThanhPho: value, // tên
      idThanhPho: option.id, // ID
      // reset cấp dưới
      tenHuyen: undefined,
      idHuyen: undefined,
      tenXa: undefined,
      idXa: undefined,
    });
    setListDistricts([]);
    setListWard([]);
    loadDistrictsByProvinceId(option.id);
  };

  const handleDistrictChange = (value, option) => {
    form.setFieldsValue({
      tenHuyen: value,
      idHuyen: option.id,
      // reset cấp dưới
      tenXa: undefined,
      idXa: undefined,
    });
    setListWard([]);
    loadWardsByDistrictId(option.id);
  };

  const handleWardChange = (value, option) => {
    form.setFieldsValue({
      tenXa: value,
      idXa: option.id,
    });
  };

  // ================== INIT (EDIT) ==================
  useEffect(() => {
        if (storedData) {
          setUserID(storedData.userID);
  
        }
    if (!openModalUpdateDiaChi) return;
    loadDataProvince();
  }, [openModalUpdateDiaChi]);

  useEffect(() => {
    if (diaChiUpdate) {
      // set các field có sẵn
      form.setFieldsValue({
        id: diaChiUpdate.id,
        idNguoiDung: userID,
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

      // nạp danh sách theo ID đã có để hiển thị đúng combobox
      if (diaChiUpdate.idThanhPho) {
        loadDistrictsByProvinceId(diaChiUpdate.idThanhPho);
      }
      if (diaChiUpdate.idHuyen) {
        loadWardsByDistrictId(diaChiUpdate.idHuyen);
      }
    }
  }, [diaChiUpdate]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Modal
      title="Cập nhật địa chỉ"
      centered
      open={openModalUpdateDiaChi}
   
      onCancel={handleClose}
      width={600}
      destroyOnClose
      footer={[
        <Button key="cancel" onClick={handleClose}>
          Hủy
        </Button>,
        <Button key="save" type="primary" onClick={() => form.submit()}>
          Lưu
        </Button>,
      ]}
    >
      <Form form={form} onFinish={handleUpdateDC} layout="vertical">
        {/* hidden IDs / status */}
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

        {/* TỈNH/THÀNH PHỐ: value = tên, option.id = ProvinceID */}
        <Form.Item
          name="tenThanhPho"
          label="Tỉnh/Thành phố"
          rules={[{ required: true, message: "Vui lòng chọn Tỉnh/Thành phố." }]}
        >
          <Select
            onChange={handleProvinceChange}
            placeholder="--Chọn Tỉnh/Thành phố--"
            showSearch
            optionFilterProp="children"
          >
            {listProvince.map((item) => (
              <Select.Option
                key={item.ProvinceID}
                value={item.ProvinceName} // tên để hiển thị & lưu vào tenThanhPho
                id={item.ProvinceID} // ID thật để lưu vào idThanhPho
              >
                {item.ProvinceName}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        {/* QUẬN/HUYỆN: value = tên, option.id = DistrictID */}
        <Form.Item
          name="tenHuyen"
          label="Quận/Huyện"
          rules={[{ required: true, message: "Vui lòng chọn Quận/Huyện." }]}
        >
          <Select
            onChange={handleDistrictChange}
            placeholder="--Chọn Quận/Huyện--"
            disabled={!form.getFieldValue("idThanhPho")}
            showSearch
            optionFilterProp="children"
          >
            {listDistricts.map((item) => (
              <Select.Option
                key={item.DistrictID}
                value={item.DistrictName}
                id={item.DistrictID}
              >
                {item.DistrictName}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        {/* XÃ/PHƯỜNG: value = tên, option.id = WardCode */}
        <Form.Item
          name="tenXa"
          label="Xã/Phường"
          rules={[{ required: true, message: "Vui lòng chọn Xã/Phường." }]}
        >
          <Select
            onChange={handleWardChange}
            placeholder="--Chọn Xã/Phường--"
            disabled={!form.getFieldValue("idHuyen")}
            showSearch
            optionFilterProp="children"
          >
            {listWard.map((item) => (
              <Select.Option
                key={item.WardCode}
                value={item.WardName}
                id={item.WardCode}
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
