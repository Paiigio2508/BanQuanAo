import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./sanpham.css";
import { ProductCard } from "./productCard";
import { useParams } from 'react-router-dom';
import { HomeAPI } from "../../../pages/api/client/HomeAPI";
import { FileSearchOutlined } from "@ant-design/icons";
import { ToastContainer } from "react-toastify";

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
      <div className="mt-4 mb-4"
        style={{ display: "flex", alignItems: "center", height: 50, backgroundColor: "#DFF0D8", color: "#5B5B5B" }}>
        <h5 className="ms-2"><FileSearchOutlined /> Có {countProducts} kết quả tìm kiếm phù hợp </h5>
      </div>
      <div className="container-fuild mt-5 ms-5">
        <div className="row row-cols-2 row-cols-md-5">
          {products.map((product, index) => (
            <div className="col" key={index}>
              <ProductCard product={product} />
            </div>
          ))}
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
