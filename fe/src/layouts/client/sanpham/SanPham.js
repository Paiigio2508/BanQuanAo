import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Slider,
  Checkbox,
  Collapse,
  Space,
  Dropdown,
  Button
} from "antd";
import { SortDescendingOutlined } from "@ant-design/icons";
import "./sanpham.css";
import { ProductCard } from "./productCard";
import { HomeAPI } from "../../../pages/api/client/HomeAPI";
import { ToastContainer } from "react-toastify";

export const SanPhamClient = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [sortType, setSortType] = useState("");

  //Load Combobox Hãng
  const [hang, setHangs] = useState([]);

  useEffect(() => {
    loadHang();
    loadMauSac();
    loadKichThuoc();
  }, []);

  const loadHang = async () => {
    HomeAPI.getAll("hang").then((res) => {
      setHangs(res.data);
    });
  };

  // Load Combobox Màu Sắc
  const [mauSac, setMauSacs] = useState([]);
  const loadMauSac = () => {
    HomeAPI.getAll("mau-sac").then((res) => {
      setMauSacs(res.data);
    });
  };

  // Load Combobox Kích Thước
  const [kichThuoc, setKichThuocs] = useState([]);;
  const loadKichThuoc = () => {
    HomeAPI.getAll("kich-thuoc").then((res) => {
      setKichThuocs(res.data);
    });
  };

  //Sort
  const sortProducts = (type) => {
    let sortedProducts = [...products];
    switch (type) {
      case "1": // Giá tăng dần
        sortedProducts.sort((a, b) => a.giaBan - b.giaBan);
        break;
      case "2": // Giá giảm dần
        sortedProducts.sort((a, b) => b.giaBan - a.giaBan);
        break;
      case "3": // Từ A-Z
        sortedProducts.sort((a, b) => a.tenSP.localeCompare(b.tenSP));
        break;
      case "4": // Từ Z-A
        sortedProducts.sort((a, b) => b.tenSP.localeCompare(a.tenSP));
        break;
      default:
        break;
    }
    setProducts(sortedProducts);
  };

  const handleSortChange = (type) => {
    setSortType(type);
    sortProducts(type);
  };

  const items = [
    {
      key: "1",
      label: <a onClick={() => handleSortChange("1")}>Giá tăng dần</a>,
    },
    {
      key: "2",
      label: <a onClick={() => handleSortChange("2")}>Giá giảm dần</a>,
    },
    {
      key: "3",
      label: <a onClick={() => handleSortChange("3")}>Từ A-Z</a>,
    },
    {
      key: "4",
      label: <a onClick={() => handleSortChange("4")}>Từ Z-A</a>,
    },
  ];
  //Tìm kiếm đa trường
  const [arrayHang, setArrayHang] = useState([]);
  const [arrayMauSac, setArrayMauSac] = useState([]);
  const [arrayKichThuoc, setArrayKichThuoc] = useState([]);
  const [giaBatDau, setGiaBatDau] = useState(100000);
  const [giaKetThuc, setGiaKetThuc] = useState(5000000);

  const dataTimKiem = {
    arrayHang: arrayHang,
    arrayMauSac: arrayMauSac,
    arrayKichThuoc: arrayKichThuoc,
    giaBatDau: giaBatDau,
    giaKetThuc: giaKetThuc,
  };

  const changeHang = (idHang, checked) => {
    if (checked) {
      setArrayHang((prevArray) => [...prevArray, idHang]);
    } else {
      setArrayHang((prevArray) => prevArray.filter((item) => item !== idHang));
    }
  };

  const changeMauSac = (idMau, checked) => {
    if (checked) {
      setArrayMauSac((prevArray) => [...prevArray, idMau]);
    } else {
      setArrayMauSac((prevArray) => prevArray.filter((item) => item !== idMau));
    }
  };

  const changeKichThuoc = (idKichThuoc, checked) => {
    if (checked) {
      setArrayKichThuoc((prevArray) => [...prevArray, idKichThuoc]);
    } else {
      setArrayKichThuoc((prevArray) =>
        prevArray.filter((item) => item !== idKichThuoc)
      );
    }
  };

  const onChange = (value) => {
    setGiaBatDau(value[0]);
    setGiaKetThuc(value[1]);
  };

  const getTimMang = (data) => {
    HomeAPI.timMang(data).then((res) => {
      setProducts(res.data);
    });
  };

  useEffect(() => {
    getTimMang(dataTimKiem);
  }, [
    dataTimKiem.arrayHang,
    dataTimKiem.arrayMauSac,
    dataTimKiem.arrayKichThuoc,
    dataTimKiem.giaBatDau,
    dataTimKiem.giaKetThuc,
  ]);

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
                        step={100000}
                        defaultValue={[100000, 5000000]}
                        min={100000}
                        max={5000000}
                        onChange={onChange}
                      />
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
                    label: "Hãng",
                    children: (
                      <div>
                        <div className="scrollable-content">
                          <Checkbox.Group>
                            {hang.map((hang, index) => {
                              return (
                                <Checkbox
                                  key={hang.id}
                                  value={hang.id}
                                  onChange={(e) =>
                                    changeHang(hang.id, e.target.checked)
                                  }
                                >
                                  <b>{hang.ten}</b>
                                </Checkbox>
                              );
                            })}
                          </Checkbox.Group>
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
                    label: "Màu sắc",
                    children: (
                      <div>
                        <div className="scrollable-content">
                          <Checkbox.Group>
                            {mauSac.map((mau, index) => {
                              return (
                                <Checkbox
                                  key={mau.id}
                                  value={mau.id}
                                  onChange={(e) =>
                                    changeMauSac(mau.id, e.target.checked)
                                  }
                                >
                                  <b>
                                    {mau.ten.charAt(0).toUpperCase() +
                                      mau.ten.slice(1)}
                                  </b>
                                </Checkbox>
                              );
                            })}
                          </Checkbox.Group>
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
                    label: "Kích Thước",
                    children: (
                      <div>
                        <Checkbox.Group>
                          {kichThuoc.map((kichThuoc, index) => {
                            return (
                              <Checkbox
                                key={kichThuoc.id}
                                value={kichThuoc.id}
                                onChange={(e) =>
                                  changeKichThuoc(kichThuoc.id, e.target.checked)
                                }
                              >
                                <b>{kichThuoc.ten}</b>
                              </Checkbox>
                            );
                          })}
                        </Checkbox.Group>
                      </div>
                    ),
                  },
                ]}
              />
            </Space>
          </div>
          <div className="col-md-9">
            <div className="row">
              <div class="container">
                <div className="d-flex justify-content-end mb-4">
                  <Dropdown
                    menu={{
                      items,
                    }}
                    placement="bottomLeft"
                    arrow
                  >
                    <Button icon={<SortDescendingOutlined />}>Sắp xếp</Button>
                  </Dropdown>
                </div>
                <div className="row">
                  {products.map((product, index) => {
                    return (
                      <div className="col-md-3">
                        <ProductCard key={index} product={product} />
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
};
