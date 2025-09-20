import React, { useState, useEffect } from "react";
import { Button, Col, Form, Input, Row, Select, Divider } from "antd";
import { TbLockPassword } from "react-icons/tb";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";

export default function DoiMatKhau() {
  const [form] = Form.useForm();

  return (
    <div className="container-fluid">
      <Divider orientation="center">
        <h2 className="text-start pt-1 fw-bold">
          <TbLockPassword /> Đổi mật khẩu
        </h2>
      </Divider>
      <Form form={form} layout="vertical">
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
