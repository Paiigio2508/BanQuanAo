import React, { useState, useEffect } from "react";
import { Button, Col, Form, Input, Row, Select, Divider } from "antd";
import { TbLockPassword } from "react-icons/tb";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { LoginAPI } from "../../../pages/api/login/LoginAPI";
export default function DoiMatKhau() {
  const [form] = Form.useForm();
  const doiMatKhau = async (values) => {
    const payload = {
      // Đặt key đúng với BE đang nhận nhé
      matKhauHienTai: values.matKhauHienTai,
      matKhau: values.matKhau,
    };

    try {
      await LoginAPI.doiMatKhau(payload);
      toast.success("Đổi mật khẩu thành công!", {
        position: "top-right",
        autoClose: 3000,
      });

      form.resetFields();
    } catch (error) {
      const msg =
        error?.response?.data?.message ||
        error?.response?.data ||
        "Đổi mật khẩu thất bại, vui lòng thử lại!";

      toast.error(msg, {
        position: "top-right",
        autoClose: 4000,
      });
    }
  };

  return (
    <div className="container-fluid">
      <Divider orientation="center">
        <h2 className="text-start pt-1 fw-bold">
          <TbLockPassword /> Đổi mật khẩu
        </h2>
      </Divider>
      <ToastContainer />
      <Form form={form} layout="vertical" onFinish={doiMatKhau}>
        <Row gutter={16} className="d-flex justify-content-center">
          <Col span={12}>
            <Form.Item
              name="matKhauHienTai"
              label="Mật khẩu hiện tại"
              rules={[
                {
                  required: true,
                  message: "Vui lòng không để trống mật khẩu!",
                },
              ]}
            >
              <Input.Password
                placeholder="Mời nhập mật khẩu hiện tại"
                iconRender={(visible) =>
                  visible ? <IoEyeOffOutline /> : <IoEyeOutline />
                }
              />
            </Form.Item>

            <Form.Item
              name="matKhau"
              label="Mật khẩu mới"
              rules={[
                {
                  required: true,
                  message: "Vui lòng không để trống mật khẩu!",
                },
              ]}
            >
              <Input.Password
                placeholder="Mời nhập Password"
                iconRender={(visible) =>
                  visible ? <IoEyeOffOutline /> : <IoEyeOutline />
                }
              />
            </Form.Item>

            <Form.Item
              name="pass"
              label="Nhập lại mật khẩu"
              dependencies={["matKhau"]}
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập lại mật khẩu!",
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("matKhau") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error("Mật khẩu nhập lại không khớp!")
                    );
                  },
                }),
              ]}
            >
              <Input.Password
                placeholder="Mời nhập lại Password"
                iconRender={(visible) =>
                  visible ? <IoEyeOffOutline /> : <IoEyeOutline />
                }
              />
            </Form.Item>
          </Col>
        </Row>

        <div className="d-flex justify-content-center mt-2">
          <Button type="primary" htmlType="submit" className="px-5">
            Hoàn tất
          </Button>
        </div>
      </Form>
    </div>
  );
}
