import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Slider,
  Checkbox,
  Card,
  Col,
  Collapse,
  Row,
  Space,
} from "antd";
import "./sanpham.css";
export const SanPhamClient = ({ children }) => {
  return (
    <div className="container-fuild">
      <div className="banner-san-pham-shop mt-4">
        <img
          src="https://png.pngtree.com/background/20210715/original/pngtree-white-gray-wave-abstract-background-soft-design-graphic-banner-background-picture-image_1298688.jpg"
          alt="Logo Banner"
        />
        <h1 className="banner-title-logo">Sản phẩm</h1>
      </div>

      <div className="container-fuild mt-5">
        <div className="row">
          <div className="col-md-3">
            <Space direction="vertical" className="w-100">
              <Collapse
                className="mb-2"
                collapsible="header"
                defaultActiveKey={["1"]}
                items={[
                  {
                    key: "1",
                    label: "Giá",
                    children: (
                      <Slider
                        range
                        step={1000000}
                        defaultValue={[1000000, 40000000]}
                        min={1000000}
                        max={40000000}
                        // onChange={onChange}
                        // onChangeComplete={onChangeComplete}
                      />
                    ),
                  },
                ]}
              />
              <Collapse
                className="mb-2"
                collapsible="header"
                defaultActiveKey={["1"]}
                items={[
                  {
                    key: "1",
                    label: "Danh mục",
                    children: (
                      <div className="scrollable-content">
                        <Checkbox.Group>
                          {/* {hang.map((hang, index) => {
                            return (
                              <Checkbox
                                key={hang.id}
                                value={hang.id}
                                onChange={(e) =>
                                  changeSanPham(hang.id, e.target.checked)
                                }
                              >
                                <b>{hang.ten}</b>
                              </Checkbox>
                            );
                          })} */}
                        </Checkbox.Group>
                      </div>
                    ),
                  },
                ]}
              />
              <Collapse
                className="mb-2"
                collapsible="icon"
                defaultActiveKey={["1"]}
                items={[
                  {
                    key: "1",
                    label: "Màu sắc",
                    children: (
                      <div>
                        <div className="scrollable-content">
                          <Checkbox.Group></Checkbox.Group>
                        </div>
                      </div>
                    ),
                  },
                ]}
              />
              <Collapse
                className="mb-2"
                collapsible="icon"
                defaultActiveKey={["1"]}
                items={[
                  {
                    key: "1",
                    label: "Giới tính",
                    children: (
                      <div>
                        <Checkbox.Group></Checkbox.Group>
                      </div>
                    ),
                  },
                ]}
              />
            </Space>
          </div>
          <div className="col-md-9">
            <div className="row">
              <Row gutter={16}>
                <Col span={8}>
                  <Card title="Card title" variant="borderless">
                    Card content
                  </Card>
                </Col>
                <Col span={8}>
                  <Card title="Card title" variant="borderless">
                    Card content
                  </Card>
                </Col>
                <Col span={8}>
                  <Card title="Card title" variant="borderless">
                    Card content
                  </Card>
                </Col>
              </Row>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
