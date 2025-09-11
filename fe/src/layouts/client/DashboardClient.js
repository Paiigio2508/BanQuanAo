// // 🔼 Import phải đặt ở đầu
// import React, { useState, useEffect } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { TbShoppingCartHeart } from "react-icons/tb";
// import { get, set } from "local-storage";
// import {
//   FaPhoneAlt,
//   FaClock,
//   FaMapMarkerAlt,
// } from "react-icons/fa";
// import { toast, ToastContainer } from "react-toastify";
// import "./Dashboard.css";
// import logoShop from "../../assets/image/logoNobackground.png";
// import "bootstrap/dist/css/bootstrap.min.css";

// export const DashboardClient = ({ children }) => {
//   const nav = useNavigate();
//   const [userName, setUserName] = useState("");
//   const [active, setActive] = useState("TRANG CHỦ");

// const menuItems = [
//   { label: "TRANG CHỦ", to: "/home" },
//   { label: "THỰC ĐƠN", to: "/menu" },
//   { label: "CỬA HÀNG", to: "/store" },
//   { label: "TIN TỨC", to: "/news" },
//   { label: "LIÊN HỆ", to: "/contact" },
// ];
//   return (
//     <>
//       <div className="top-header"></div>
//       <div className="navbar-wrapper">
//         <div className="container">
//           <div className="row align-items-center">
//             {/* LOGO */}
//             <div className="col-md-2 col-12 logo-container">
//               <img src={logoShop} alt="logo" className="logo" />
//             </div>

//             {/* SLOGAN + MENU */}
//             <div className="col-md-6 col-12 slogan-menu">
//               <h1 className="slogan">TEA AND MORE</h1>
//               <nav className="menu">
//                 {menuItems.map((item) => (
//                   <Link
//                     key={item.label}
//                     to={item.to}
//                     className={active === item.label ? "active" : ""}
//                     onClick={() => setActive(item.label)}
//                   >
//                     {item.label}
//                   </Link>
//                 ))}
//               </nav>
//             </div>

//             {/* ADDRESS + HOTLINE */}
//             <div className="col-md-4 col-12 contact-box d-flex flex-column align-items-end">
//               <div className="address mb-1">
//                 <FaMapMarkerAlt />
//                 Ngõ 227, đường 422b, Vân Canh, Hoài Đức, Hà Nội
//               </div>
//               <div className="address-divider"></div>
//               <div className="hotline-box mt-2">
//                 <div className="hotline-top">
//                   <FaPhoneAlt /> <span className="label">HOTLINE:</span>{" "}
//                   <span className="phone">0988353709</span>
//                 </div>
//                 <div className="open-time">
//                   <img src="https://cdn3622.cdn-template-4s.com/media/template/icon-giomocua.webp" />
//                   <div className="time-text">8:00 - 17:30</div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//       <div>{children}</div>

//       <div className="footer mt-5 pb-5">
//         <div className="container ">
//           <div className="row">
//             <div className="col-12 col-md-6 ">
//               <div class="title-contact-bottom">
//                 <span>Thirsty?</span>
//                 Hãy liên hệ hoặc gọi đặt hàng ngay
//               </div>
//               <address>
//                 <p>
//                   goi_ngay: <span>1900 6680 - 0988353709</span>
//                 </p>
//                 <p>Địa chỉ: Ngõ 227, đường 422b, Vân Canh, Hoài Đức, Hà Nội</p>
//               </address>
//               <div class="d-inline-flex align-items-center">
//                 <img
//                   class="img-fluid"
//                   alt="image"
//                   src="https://cdn3622.cdn-template-4s.com/media/template/asset-5.webp"
//                 />
//                 <img
//                   class="img-fluid"
//                   alt="image"
//                   src="https://cdn3622.cdn-template-4s.com/media/template/asset-6.webp"
//                 />
//               </div>
//             </div>
//             <div className="col-12 col-md-6">
//               <div class="ratio-4-3">
//                 <div style={{ width: "100%", height: "450px" }}>
//                   <iframe
//                     src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d232.7421591031839!2d105.72884947600686!3d21.037705170210078!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31345466c55033df%3A0xcb143c178219fc71!2zxJDDrG5oIEjhuq11IMOBaQ!5e0!3m2!1svi!2s!4v1751201302007!5m2!1svi!2s"
//                     width="600"
//                     height="450"
//                     style={{ border: 0 }}
//                     allowFullScreen
//                     loading="lazy"
//                     referrerPolicy="no-referrer-when-downgrade"
//                   ></iframe>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };
