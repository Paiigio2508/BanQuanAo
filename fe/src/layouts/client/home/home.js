
import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./home.css";
// Import Swiper styles
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation } from "swiper/modules";
import { ProductCard } from "../sanpham/productCard";
import { HomeAPI } from "../../../pages/api/client/HomeAPI";
export const Home = ({ children }) => {
  const [products, setProducts] = useState([]);
    useEffect(() => {
      getNew();
    }, []);
  const getNew = () => {
    HomeAPI.getAllSanPham().then((res) => {
      setProducts(res.data);
    });
  };
  return (
    <div>
      <div className="carousel-wrapper">
        <Swiper
          slidesPerView={1}
          spaceBetween={30}
          loop={true}
          pagination={{
            clickable: true,
          }}
          navigation={true}
          modules={[Pagination, Navigation]}
          className="mySwiper"
        >
          <SwiperSlide>
            <img
              src="https://cdn3522.cdn-template-4s.com/media/icon/c94b80778cc44b28a45fe4aea8415e52-1.jpg"
              className="carousel-img"
            />
          </SwiperSlide>
          <SwiperSlide>
            <img
              src="https://cdn3522.cdn-template-4s.com/media/icon/710dd2f63feed8b04c443e5fcecf08d0.jpg"
              className="carousel-img"
            />
          </SwiperSlide>
        </Swiper>
      </div>
      <section style={{ backgroundColor: "#eee" }}>
        <div className="text-center container py-5">
          <h4 className="mt-4 mb-5">
            <strong>Sản phẩm</strong>
          </h4>

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
      </section>
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
