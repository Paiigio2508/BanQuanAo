import { Col, Form, Input, Select, Button, Modal} from "antd";
import { useEffect, useState } from "react";
import LogoGHN from "../../../assets/images/LogoGHN.png";
import { toast } from "react-toastify";
import Moment from "moment";
import { AddressApi } from "../../../pages/api/address/AddressApi";
import { ShipAPI } from "../../../pages/api/ship/ShipAPI";

const DiaChiGiaoHang = ({
  money,
  quantity,
  thongTinVanChuyen,
}) => {
  const [listProvince, setListProvince] = useState([]);
  const [listDistricts, setListDistricts] = useState([]);
  const [listWard, setListWard] = useState([]);
  const [districtID, setDistrictID] = useState("");
  const [proID,setProID] = useState("");
  const [wardCode, setWardCode] = useState("");
  const [timeShip, setTimeShip] = useState("");
  const [moneyShip, setMoneyShip] = useState();
  const [tenThanhPho,setTenThanhPho] = useState("");
  const [tenHuyen,setTenHuyen] = useState("");
  const [duLieu,setDuLieu]  = useState(""); 
  const [form] = Form.useForm();
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [confirmType, setConfirmType] = useState(null);

  let data = "";

  useEffect(() => {
    loadDataProvince();
  }, []);

  const loadDataProvince = () => {
    AddressApi.fetchAllProvince().then((res) => {
      setListProvince(res.data.data);
    });
  };
  const [componentSize, setComponentSize] = useState("default");
  const onFormLayoutChange = ({ size }) => {
    setComponentSize(size);
  };
  
  const loadTimeAndMoney = async (districtID, valueWard, quantity) => {
    setTimeShip(
      await ShipAPI.fetchAllDayShip(districtID, valueWard).then(
        (res) => res.data.data.leadtime * 1000
      )
    );

    money(
      await ShipAPI.fetchAllMoneyShip(districtID, valueWard, quantity).then(
        (res) => res.data.data.total
      )
    );
    setMoneyShip(
      await ShipAPI.fetchAllMoneyShip(districtID, valueWard, quantity).then(
        (res) => res.data.data.total
      )
    );
  };

  const handleDelete = () => {
    data = "";
    thongTinVanChuyen(data);
    setDuLieu("");
    form.resetFields();
    setTimeShip("");
    money(0);
  };

  const handleSubmit = async (value) => {
     data = {
      tenNguoiNhan: value.tenNguoiNhan,
      soDienThoai: value.soDienThoai,
      email: value.email,
      diaChi:
      value.soNha +
      "/" +
      value.tenXa +
      "/" +
      value.tenHuyen +
      "/" +
      value.tenThanhPho,
      tienVanChuyen : await ShipAPI.fetchAllMoneyShip(
        districtID,
        wardCode,
        quantity
      ).then((res) => res.data.data.total) ,
      ngayDuKienNhan: await ShipAPI.fetchAllDayShip(districtID, wardCode).then(
        (res) => res.data.data.leadtime * 1000
      )
    };
    money(moneyShip);
    thongTinVanChuyen(data);
    setDuLieu(data);
  };

  const handleProvinceChange = (value, valueProvince) => {
    form.setFieldsValue({ provinceId: valueProvince.valueProvince });
    setProID(valueProvince.valueProvince);
    setTenThanhPho(valueProvince.value);
    AddressApi.fetchAllProvinceDistricts(valueProvince.valueProvince).then(
      (res) => {
        setListDistricts(res.data.data);
      }
    );
  };

  const handleDistrictChange = (value, valueDistrict) => {
    form.setFieldsValue({ toDistrictId: valueDistrict.valueDistrict });
    setDistrictID(valueDistrict.valueDistrict);
    setTenHuyen(valueDistrict.value);
    AddressApi.fetchAllProvinceWard(valueDistrict.valueDistrict).then((res) => {
      setListWard(res.data.data);
    });
  };

  const handleWardChange = async (value, valueWard) => {
    form.setFieldsValue({ wardCode: valueWard.valueWard });
    setWardCode(valueWard.valueWard);
    if (districtID && valueWard) {
      setTimeShip(
        await ShipAPI.fetchAllDayShip(districtID, valueWard.valueWard).then(
          (res) => res.data.data.leadtime * 1000
        )
      );
      setMoneyShip(
        await ShipAPI.fetchAllMoneyShip(
          districtID,
          valueWard.valueWard,
          quantity
        ).then((res) => res.data.data.total)
      );
    }
  };

  const formItemLayout = {
    labelCol: { span: 6 },    // độ rộng cột label
    wrapperCol: { span: 18 }, // độ rộng cột input
  };

  return (
    <>
      <Form
        className="mt-4"
        {...formItemLayout}
        onFinish={handleSubmit}
        initialValues={{
          size: componentSize,
        }}
        layout="horizontal"
        onValuesChange={onFormLayoutChange}
        size={componentSize}
        form={form}
      >
        <Form.Item
          name="tenNguoiNhan"
          label="Tên người nhận"
          tooltip="Họ tên đầy đủ của bạn là gì?"
          hasFeedback
          rules={[
            {
              required: true,
              message: "Vui lòng hãy nhập họ và tên.",
              whitespace: true,
            },
            {
              pattern: /^[A-Za-zÀ-Ỹà-ỹ\s]+$/,
              message: "Họ và tên chỉ được phép chứa chữ cái.",
            },
          ]}
        >
          <Input placeholder="Nhập họ và tên" style={{ width: 400 }} />
        </Form.Item>

        <Form.Item
          name="soDienThoai"
          tooltip="Số điện thoại của bạn là gì?"
          label="Số điện thoại"
          hasFeedback
          rules={[
            {
              required: true,
              message: "Vui lòng hãy nhập số điện thoại.",
              whitespace: true,
            },
            {
              pattern: /^0\d{9}$/,
              message: "Vui lòng nhập số điện thoại hợp lệ.",
            },
          ]}
        >
          <Input placeholder="Nhập số điện thoại" style={{ width: 400 }} />
        </Form.Item>

        <Form.Item
          name="email"
          tooltip="Email của bạn là gì?"
          label="Email"
          hasFeedback
          rules={[
            {
              required: true,
              message: "Vui lòng hãy nhập email.",
              whitespace: true,
            },
            {
              type: "email",
              message: "Vui lòng nhập đúng định dạng email.",
            },
          ]}
        >
          <Input placeholder="Nhập email" style={{ width: 400 }} />
        </Form.Item>

        <Form.Item
          name="tenThanhPho"
          label="Tên thành phố"
          tooltip="Tỉnh/Thành phố của bạn là gì?"
          hasFeedback
          rules={[
            {
              required: true,
              message: "Vui lòng hãy chọn Tỉnh/Thành phố.",
              whitespace: true,
            },
          ]}
        >
          <Select
            style={{ width: 400 }}
            onChange={handleProvinceChange}
            placeholder="--Chọn Tỉnh/Thành phố--"
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
          label="Tên Quận / Huyện"
          tooltip="Quận/Huyện của bạn là gì?"
          hasFeedback
          rules={[
            {
              required: true,
              message: "Vui lòng hãy chọn Quận/Huyện.",
              whitespace: true,
            },
          ]}
        >
          <Select
            style={{ width: 400 }}
            onChange={handleDistrictChange}
            placeholder="--Chọn Quận/Huyện--"
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
          label="Tên Phường / Xã"
          tooltip="Xã/Phường của bạn là gì?"
          hasFeedback
          rules={[
            {
              required: true,
              message: "Vui lòng hãy chọn Xã/Phường.",
              whitespace: true,
            },
          ]}
        >
          <Select
            onChange={handleWardChange}
            style={{ width: 400 }}
            placeholder="--Chọn Xã/Phường--"
          >
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
          name="soNha"
          label="Số nhà"
          tooltip="Số nhà của bạn là gì?"
          hasFeedback
          rules={[
            {
              required: true,
              message: "Vui lòng hãy nhập số nhà.",
              whitespace: true,
            },
          ]}
        >
          <Input placeholder="Nhập số nhà" style={{ width: 400 }} />
        </Form.Item>

        <div className="row mt-2">
          <div className="col-md-4">
            <img src={LogoGHN} style={{ width: 200, height: 70 }} alt="GHN" />
          </div>
          <div className="col-md-6 align-self-center fw-bold">
            <p>
              Thời gian giao hàng dự kiến :{" "}
              <span className="text-danger">
                {timeShip
                  ? Moment(timeShip).format("DD/MM/yyyy")
                  : "dd/MM/yyyy"}
              </span>
            </p>
          </div>
        </div>

        <Form.Item wrapperCol={{ offset: 8, span: 18 }}>
          {!duLieu ? (
            <Button
              className="mt-2 me-2 bg-black"
              type="primary"
              onClick={() => {
                setConfirmType("create");
                setConfirmOpen(true);
              }}
            >
              Xác nhận đặt hàng
            </Button>
          ) : (
            <>
              <Button
                className="mt-2 me-2 bg-black"
                type="primary"
                onClick={() => {
                  setConfirmType("edit");
                  setConfirmOpen(true);
                }}
              >
                Sửa thông tin đặt hàng
              </Button>
              <Button
                className="mt-2 bg-danger"
                type="primary"
                danger
                onClick={() => {
                  setConfirmType("delete");
                  setConfirmOpen(true);
                }}
              >
                Hủy thông tin đặt hàng
              </Button>
            </>
          )}
        </Form.Item>
      </Form>
      <Modal
        open={confirmOpen}
        onCancel={() => setConfirmOpen(false)}
        onOk={() => {
          if (confirmType === "create" || confirmType === "edit") {
            form.submit();
          } else if (confirmType === "delete") {
            handleDelete();
          }

          toast("✔️ Cập nhật hóa đơn thành công!", {
            position: "top-right",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });

          setConfirmOpen(false);
        }}
        okText="Đồng ý"
        cancelText="Hủy"
        zIndex={3000} // để chắc chắn nổi lên trên
      >
        {confirmType === "create" && (
          <p>Bạn có chắc chắn muốn đặt hàng không?</p>
        )}
        {confirmType === "edit" && (
          <p>Bạn có chắc chắn muốn sửa thông tin đặt hàng không?</p>
        )}
        {confirmType === "delete" && (
          <p>Bạn có chắc chắn muốn xóa thông tin đặt hàng không?</p>
        )}
      </Modal>
    </>
  );
};
export default DiaChiGiaoHang;

