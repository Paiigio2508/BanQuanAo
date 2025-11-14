import React from "react";
import LogoGHN from "../../../assets/images/logoDiShip.jpg";
import { Breadcrumb, Button, Col, Form, Input, Row } from "antd";
import { HoaDonClientAPI } from "../../../pages/api/client/HoaDonClientAPI";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate, Link } from "react-router-dom";

const TraCuuDonHangClient = () => {
  const [form] = Form.useForm();
  const nav = useNavigate();

  const handleSubmit = async (values) => {
    const loadingToastId = toast.loading("Đang tra cứu đơn hàng...");
    try {
      const res = await HoaDonClientAPI.SearchHDClient(values.ma);
      const bill = Array.isArray(res?.data) ? res.data[0] : res?.data;

      // Chuẩn hóa id dùng chung
      const billId = bill?.idHD || bill?.id || bill?.hoaDonId;

      if (billId) {
        toast.update(loadingToastId, {
          render: "Tra cứu đơn hàng thành công 👌",
          type: "success",
          isLoading: false,
          autoClose: 1500,
        });
        form.resetFields();
        nav(`/home-hoa-don/${billId}`, { state: { hoaDon: bill } });
      } else {
        toast.update(loadingToastId, {
          render: "Không tìm thấy hóa đơn",
          type: "error",
          isLoading: false,
          autoClose: 3000,
        });
      }
    } catch (err) {
      toast.update(loadingToastId, {
        render: "Tra cứu đơn hàng thất bại 😥",
        type: "error",
        isLoading: false,
        autoClose: 3000,
      });
      console.error(err);
    }
  };

  return (
    <>
      <div className="banner-san-pham-shop mt-4">
        <img
          src="https://png.pngtree.com/background/20210715/original/pngtree-white-gray-wave-abstract-background-soft-design-graphic-banner-background-picture-image_1298688.jpg"
          alt="Logo Banner"
        />
        <h1 className="banner-title-logo">Tra cứu đơn hàng</h1>
      </div>

      <div className="row d-flex justify-content-center">
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          className="mt-5"
        >
          <Row justify="center" align="middle">
            <Col span={7} style={{ marginRight: "20px" }}>
              <Form.Item
                name="ma"
                label="Mã hóa đơn"
                tooltip="Vui lòng nhập mã hóa đơn"
                rules={[
                  { required: true, message: "Vui lòng nhập mã hóa đơn" },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col className="d-flex align-items-center">
              <Button
                style={{ backgroundColor: "#3366CC", color: "white" }}
                onClick={form.submit}
              >
                Hoàn tất
              </Button>
            </Col>
          </Row>
        </Form>

        <div className="text-center mb-5">
          <img src={LogoGHN} style={{ width: 700, height: 403 }} alt="" />
        </div>
      </div>

      <ToastContainer />
    </>
  );
};

export default TraCuuDonHangClient;