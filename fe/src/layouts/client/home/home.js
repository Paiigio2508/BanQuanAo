
// import React, { useState, useEffect } from "react";
// import { useLocation } from "react-router-dom";
// import { toast } from "react-toastify";
// import banner1 from "../../../assets/image/banner1.jpg";
// import banner2 from "../../../assets/image/banner2.jpg";
// import "bootstrap/dist/css/bootstrap.min.css";
// import { Swiper, SwiperSlide } from "swiper/react";
// import "./home.css";
// // Import Swiper styles
// import "swiper/css";
// import "swiper/css/pagination";
// import "swiper/css/navigation";
// import { Pagination, Navigation } from "swiper/modules";
// export const Home = ({ children }) => {
//     const location = useLocation();

//     useEffect(() => {
//       if (location.state?.fromGuardError) {
//         const toastId = "guard-error-toast";

//         // Kiểm tra toast đang hiện chưa, nếu chưa thì show
//         if (!toast.isActive(toastId)) {
//           toast.error(location.state.fromGuardError, {
//             toastId,
//             position: "top-right",
//             autoClose: 3000,
//             pauseOnHover: true,
//             draggable: true,
//             theme: "colored",
//           });
//         }

//         // Xóa state để tránh show lại toast khi back
//         window.history.replaceState({}, document.title);
//       }
//     }, [location.state]);
//   return (
//     <div>
//       <div className="container">
//         <div className="carousel-wrapper">
//           <Swiper
//             slidesPerView={1}
//             spaceBetween={30}
//             loop={true}
//             pagination={{
//               clickable: true,
//             }}
//             navigation={true}
//             modules={[Pagination, Navigation]}
//             className="mySwiper"
//           >
//             <SwiperSlide>
//               <img src={banner1} className="carousel-img" />
//             </SwiperSlide>
//             <SwiperSlide>
//               <img src={banner2} className="carousel-img" />
//             </SwiperSlide>
//           </Swiper>
//         </div>
//         {/* menu danh mục */}

//         <div className="row g-3 mt-2">
//           <div className="menu-title-wrapper">
//             <div className="line"></div>
//             <h2 className="menu-title">Danh mục</h2>
//             <div className="line"></div>
//           </div>
//           <div className="col-12 col-sm-6 col-lg-3">
//             <div className="box p-2">
//               <a href="#">
//                 <img
//                   src="https://dayphache.edu.vn/wp-content/uploads/2020/02/mon-tra-sua-tran-chau.jpg"
//                   className="img-danhmuc"
//                 />
//                 <div className="prd-cate-title mt-3 text-center">
//                   <span>Trà sữa</span>
//                 </div>
//               </a>
//             </div>
//           </div>
//           <div className="col-12 col-sm-6 col-lg-3">
//             <div className="box p-2">
//               <a href="#">
//                 <img
//                   src="https://www.unileverfoodsolutions.com.vn/dam/global-ufs/mcos/phvn/vietnam/calcmenu/recipes/VN-recipes/other/energizing-lemon-tea/main-header.jpg"
//                   className="img-danhmuc"
//                 />
//                 <div className="prd-cate-title mt-3 text-center">
//                   <span>Trà chanh</span>
//                 </div>
//               </a>
//             </div>
//           </div>
//           <div className="col-12 col-sm-6 col-lg-3">
//             <div className="box p-2">
//               <a href="#">
//                 <img
//                   src="https://cdnphoto.dantri.com.vn/i7Ew_JAtefE35zxJrPzBE0EuvLk=/thumb_w/1020/2022/08/06/caphe-1659747941762.jpeg"
//                   className="img-danhmuc"
//                 />
//                 <div className="prd-cate-title mt-3 text-center">
//                   <span>Cà phê</span>
//                 </div>
//               </a>
//             </div>
//           </div>
//           <div className="col-12 col-sm-6 col-lg-3">
//             <div className="box p-2">
//               <a href="#">
//                 <img
//                   src="https://cdn2.tuoitre.vn/zoom/700_390/2018/6/4/photo1528102564896-1528102564896209081221.jpg"
//                   className="img-danhmuc"
//                 />
//                 <div className="prd-cate-title mt-3 text-center">
//                   <span>Nước ép</span>
//                 </div>
//               </a>
//             </div>
//           </div>
//         </div>
//       </div>
//       <div className="menu-day mt-5 pb-5">
//         <div className="container">
//           <div className="menu-title-wrapper">
//             <div className="line"></div>
//             <h2 className="menu-title">Uống gì hôm nay?</h2>
//             <div className="line"></div>
//           </div>

//           <div className="row-flex">
//             <div className="col-lg-6 col-md-6 col-12 col-day">
//               <div className="product-title ">
//                 <h4>
//                   <span>Trà sữa matcha</span>
//                 </h4>
//               </div>
//               <a href="#">
//                 <div className="box-day">
//                   <img
//                     src="https://dayphache.edu.vn/wp-content/uploads/2018/02/tra-sua-matcha.jpg"
//                     className="img-day"
//                   />
//                 </div>
//               </a>
//             </div>
//             <div className="col-lg-6 col-md-6 col-12 col-day">
//               <div className="product-title ">
//                 <h4>
//                   <span>Trà sữa trân châu</span>
//                 </h4>
//               </div>
//               <a href="#">
//                 <div className="box-day">
//                   <img
//                     src="https://dayphache.edu.vn/wp-content/uploads/2020/02/mon-tra-sua-tran-chau.jpg"
//                     className="img-day"
//                   />
//                 </div>
//               </a>
//             </div>
//             <div className="col-lg-6 col-md-6 col-12 col-day">
//               <div className="product-title ">
//                 <h4>
//                   <span>Trà sữa trân châu</span>
//                 </h4>
//               </div>
//               <a href="#">
//                 <div className="box-day">
//                   <img
//                     src="https://dayphache.edu.vn/wp-content/uploads/2020/02/mon-tra-sua-tran-chau.jpg"
//                     className="img-day"
//                   />
//                 </div>
//               </a>
//             </div>
//             <div className="col-lg-6 col-md-6 col-12 col-day">
//               <div className="product-title ">
//                 <h4>
//                   <span>Trà sữa trân châu</span>
//                 </h4>
//               </div>
//               <a href="#">
//                 <div className="box-day">
//                   <img
//                     src="https://dayphache.edu.vn/wp-content/uploads/2018/02/tra-sua-matcha.jpg"
//                     className="img-day"
//                   />
//                 </div>
//               </a>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };
