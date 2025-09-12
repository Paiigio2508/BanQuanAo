import { Card, Col, Form, Input, Row, Select, Spin, DatePicker } from "antd";
import { useEffect, useState } from "react";
import { AddressApi } from "../../../pages/api/address/AddressApi";
import { useParams } from "react-router-dom";
import UpLoadImageUpdate from "../../uploadAnh/UpLoadImage";
import { KhachHangAPI } from "../../../pages/api/khachhang/KhachHangAPI";
import moment from "moment";
import { FaMoneyBills } from "react-icons/fa6";
export default function DetailKhachHang() {
  const [form] = Form.useForm();
  const { id } = useParams();
  const [oldImage, setOldImage] = useState(""); // link ảnh cũ
  const [listProvince, setListProvince] = useState([]);
  const [listDistricts, setListDistricts] = useState([]);
  const [listWard, setListWard] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const provinceRes = await AddressApi.fetchAllProvince();
        setListProvince(provinceRes.data.data);
        const empRes = await KhachHangAPI.getOneByIdUser(id);
        const data = empRes.data;
        if (data.idthanhPho) {
          const districtRes = await AddressApi.fetchAllProvinceDistricts(
            data.idthanhPho
          );
          setListDistricts(districtRes.data.data);
        }

        if (data.idhuyen) {
          const wardRes = await AddressApi.fetchAllProvinceWard(data.idhuyen);
          setListWard(wardRes.data.data);
        }

        // lưu link ảnh cũ
        setOldImage(data.anh || "");

        form.setFieldsValue({
          ten: data.ten || "",
          cccd: data.cccd || "",
          gioiTinh: data.gioiTinh || "",
          email: data.email || "",
          soDienThoai: data.soDienThoai || "",
          provinceId: Number(data.idthanhPho) || "",
          districtId: Number(data.idhuyen) || "",
          wardCode: data.idxa || "",
          diaChi: data.diaChi || "",
          ngaySinh:
            data.ngaySinh && !isNaN(Number(data.ngaySinh))
              ? moment(Number(data.ngaySinh))
              : null,
        });
      } catch (err) {
        console.error(err);
      }
      setLoading(false);
    })();
  }, [id, form]);

  const handleProvinceChange = (value) => {
    form.setFieldsValue({ provinceId: value, districtId: "", wardCode: "" });
    setListDistricts([]);
    setListWard([]);
    if (value) {
      AddressApi.fetchAllProvinceDistricts(value).then((res) => {
        setListDistricts(res.data.data);
      });
    }
  };

  const handleDistrictChange = (value) => {
    form.setFieldsValue({ districtId: value, wardCode: "" });
    setListWard([]);
    if (value) {
      AddressApi.fetchAllProvinceWard(value).then((res) => {
        setListWard(res.data.data);
      });
    }
  };

  const handleWardChange = (value) => {
    form.setFieldsValue({ wardCode: value });
  };
  return (
    <div>
      <h3 className="text-first text-center fw-bold">
        <FaMoneyBills /> Thông tin khách hàng
      </h3>
      {loading ? (
        <Spin spinning />
      ) : (
        <Form form={form} layout="vertical">
          <Row gutter={14} style={{ marginTop: 30 }}>
            <Col span={7}>
              <Card style={{ height: "100%", minHeight: "550px" }}>
                <h5 className="text-center fw-bold">Ảnh đại diện</h5>
                <Row justify="center" className="mt-5">
                  <UpLoadImageUpdate
                    defaultImage={oldImage} // set preview ảnh cũ
                  />
                </Row>
              </Card>
            </Col>
            <Col span={17}>
              <Card style={{ height: "100%", minHeight: "550px" }}>
                <h5 className="text-center fw-bold">Thông tin khách hàng</h5>
                <Row className="mt-5">
                  <Col span={11} style={{ marginRight: 20 }}>
                    <Form.Item name="ten" label="Họ và tên">
                      <Input className="text-center" />
                    </Form.Item>
                    <Form.Item name="cccd" label="Căn cước">
                      <Input className="text-center" />
                    </Form.Item>
                    <Form.Item name="gioiTinh" label="Giới tính">
                      <Select>
                        <Select.Option value="">Chọn giới tính</Select.Option>
                        <Select.Option value="true">Nam</Select.Option>
                        <Select.Option value="false">Nữ</Select.Option>
                      </Select>
                    </Form.Item>
                    <Form.Item name="provinceId" label="Tỉnh/Thành phố">
                      <Select onChange={handleProvinceChange}>
                        <Select.Option value="">
                          --Chọn tỉnh/thành phố--
                        </Select.Option>
                        {listProvince.map((p) => (
                          <Select.Option
                            key={p.ProvinceID}
                            value={Number(p.ProvinceID)}
                          >
                            {p.ProvinceName}
                          </Select.Option>
                        ))}
                      </Select>
                    </Form.Item>
                    <Form.Item name="wardCode" label="Xã/Phường">
                      <Select onChange={handleWardChange}>
                        <Select.Option value="">
                          --Chọn xã/phường--
                        </Select.Option>
                        {listWard.map((w) => (
                          <Select.Option key={w.WardCode} value={w.WardCode}>
                            {w.WardName}
                          </Select.Option>
                        ))}
                      </Select>
                    </Form.Item>
                  </Col>
                  <Col span={11}>
                    <Form.Item name="ngaySinh" label="Ngày sinh">
                      <DatePicker
                        format="DD/MM/YYYY"
                        className="w-100 datepicker-center"
                      />
                    </Form.Item>
                    <Form.Item name="email" label="Email">
                      <Input className="text-center" />
                    </Form.Item>
                    <Form.Item name="soDienThoai" label="Số điện thoại">
                      <Input className="text-center" />
                    </Form.Item>
                    <Form.Item name="districtId" label="Quận/Huyện">
                      <Select onChange={handleDistrictChange}>
                        <Select.Option value="">
                          --Chọn quận/huyện--
                        </Select.Option>
                        {listDistricts.map((d) => (
                          <Select.Option
                            key={d.DistrictID}
                            value={Number(d.DistrictID)}
                          >
                            {d.DistrictName}
                          </Select.Option>
                        ))}
                      </Select>
                    </Form.Item>
                    <Form.Item name="diaChi" label="Số nhà">
                      <Input className="text-center" />
                    </Form.Item>
                  </Col>
                </Row>
              </Card>
            </Col>
          </Row>
        </Form>
      )}
    </div>
  );
}
