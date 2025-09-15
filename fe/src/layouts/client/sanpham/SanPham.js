import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Slider,
  Checkbox,
  Collapse,
  Space,
} from "antd";
import "./sanpham.css";
import { ProductCard } from "./productCard";
import { HomeAPI } from "../../../pages/api/client/HomeAPI";
import { ThuocTinhAPI } from "../../../pages/api/sanpham/ThuocTinh.api";
export const SanPhamClient = ({ children }) => {
  const [products, setProducts] = useState([]);

  //Load Combobox Hãng
  const [hang, setHangs] = useState([]);

  useEffect(() => {
    loadHang();
  }, []);

  const loadHang = async () => {
    ThuocTinhAPI.getAll("hang")
      .then((res) => {
        setHangs(res.data);
      })
  };

  // Load Combobox Sản Phẩm
  const [sanPham, setSanPhams] = useState([]);
  useEffect(() => {
    loadSanPham();
  }, []);
  const loadSanPham = () => {
    ThuocTinhAPI.getAll("san-pham")
      .then((res) => {
        setSanPhams(res.data);
        res.data.forEach((sp) => {
        });
      })
  };

  // Load Combobox Màu Sắc
  const [mauSac, setMauSacs] = useState([]);

  useEffect(() => {
    loadMauSac();
  }, []);

  const loadMauSac = () => {
    ThuocTinhAPI.getAll("mau-sac")
      .then((res) => {
        setMauSacs(res.data);
      })
  };

  // Load Combobox Kích Thước
  const [kichThuoc, setKichThuocs] = useState([]);

  useEffect(() => {
    loadKichThuoc();
  }, []);

  const loadKichThuoc = () => {
    ThuocTinhAPI.getAll("kich-thuoc",)
      .then((res) => {
        setKichThuocs(res.data);
      })
  };

   //Tìm kiếm đa trường
  // const [arraySanPham, setArraySanPham] = useState([]);
  // const [arrayMauSac, setArrayMauSac] = useState([]);
  // const [arrayKichThuoc, setArrayKichThuoc] = useState([]);
  // const [giaBatDau, setGiaBatDau] = useState(1000000);
  // const [giaKetThuc, setGiaKetThuc] = useState(40000000);

  // const dataTimKiem = {
  //   arraySanPham: arraySanPham,
  //   arrayMauSac: arrayMauSac,
  //   arrayKichThuoc: arrayKichThuoc,
  //   giaBatDau: giaBatDau,
  //   giaKetThuc: giaKetThuc
  // }

  // const changeSanPham = (idHang, checked) => {
  //   if (checked) {
  //     setArraySanPham(prevArray => [...prevArray, idHang]);
  //   } else {
  //     setArraySanPham(prevArray => prevArray.filter(item => item !== idHang));
  //   }
  // };

  // const changeMauSac = (idMau, checked) => {
  //   if (checked) {
  //     setArrayMauSac(prevArray => [...prevArray, idMau]);
  //   } else {
  //     setArrayMauSac(prevArray => prevArray.filter(item => item !== idMau));
  //   }
  // };

  // const changeKichThuoc = (idKichThuoc, checked) => {
  //   if (checked) {
  //     setArrayKichThuoc(prevArray => [...prevArray, idKichThuoc]);
  //   } else {
  //     setArrayKichThuoc(prevArray => prevArray.filter(item => item !== idKichThuoc));
  //   }
  // };

  // const onChange = (value) => {
  //   setGiaBatDau(value[0]);
  //   setGiaKetThuc(value[1]);
  // };

  // const getTimMang = (data) => {
  //   console.log(data)
  //   HomeAPI.timMang(data)
  //     .then((res) => {
  //       setProducts(res.data)
  //       console.log(products)
  //     })
  // }

  // useEffect(() => {
  //   getTimMang(dataTimKiem);
  // }, [dataTimKiem.arraySanPham, dataTimKiem.arrayMauSac, dataTimKiem.arrayKichThuoc, dataTimKiem.giaBatDau, dataTimKiem.giaKetThuc])


  useEffect(() => {
    getNew();
  }, []);

  const getNew = () => {
    HomeAPI.getAllSanPham().then((res) => {
      setProducts(res.data);
    });
  };
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
                        defaultValue={[100000, 40000000]}
                        min={100000}
                        max={40000000}
                      // onChange={onChange}
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
                                    console.log("")
                                    // changeSanPham(sanPham.id, e.target.checked)
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
                                    console.log("")
                                    // changeMauSac(mau.id, e.target.checked)
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
                                    console.log("")
                                    // changeSanPham(hang.id, e.target.checked)
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
    </div>
  );
};
