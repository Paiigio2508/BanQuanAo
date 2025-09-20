import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./sanpham.css";
import { ProductCard } from "./productCard";
import { useParams } from 'react-router-dom';
import { HomeAPI } from "../../../pages/api/client/HomeAPI";
import { FileSearchOutlined} from "@ant-design/icons";
export const TimKiemDashBoard = ({ children }) => {
  const { ten } = useParams();
  const [products, setProducts] = useState([]);
  const [countProducts, setCountProducts] = useState([]);
  const getTimKiem = () => {
    HomeAPI.timKiemDashboard(ten)
      .then((res) => {
        setProducts(res.data);
        setCountProducts(res.data.length);
      })
  }
  const getAllSanPham = () => {
    HomeAPI.getAllSanPham()
      .then((res) => {
        setProducts(res.data);
        setCountProducts(res.data.length);
      })
  }
  useEffect(() => {
    if (ten === "allsanpham") {
      getAllSanPham()
    } else {
      getTimKiem();
    }
  }, [ten])
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
        <div className="mt-4 mb-4"
          style={{ display: "flex", alignItems: "center", height: 50, backgroundColor: "#DFF0D8", color: "#5B5B5B" }}>
          <h5 className="ms-2"><FileSearchOutlined /> Có {countProducts} kết quả tìm kiếm phù hợp </h5>
        </div>
        <div className="row">
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
