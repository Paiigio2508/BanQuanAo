import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AppConfig } from "./AppConfig";

import NotFoud from "../pages/404/NotFoud";
import NotAccess from "../pages/403/NotAccess";

import GuestGuard from "../guard/GuestGuard";
import AdminGuard from "../guard/AdminGuard";

import { Suspense } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Client layouts/pages
import { DashboardClient } from "../layouts/client/DashboardClient";
import { Home } from "../layouts/client/home/home";
import { SanPhamClient } from "../layouts/client/sanpham/SanPham";
import { GioHang } from "../layouts/client/giohang/GioHang";
import { LienHe } from "../layouts/client/lienhe/lienhe";
import { TimKiemDashBoard } from "../layouts/client/sanpham/TimKiemSanPham";
import TraCuuDonHangClient from "../layouts/client/tracuudonhang/TraCuuDonHangClient";

// Admin layouts/pages
import DashboardAdmin from "../layouts/admin/DashboardAdmin";
import ChatLieu from "../layouts/admin/sanpham/ChatLieu";
import Hang from "../layouts/admin/sanpham/Hang";
import DanhMuc from "../layouts/admin/sanpham/DanhMuc";
import GioiTinh from "../layouts/admin/sanpham/GioiTinh";
import MauSac from "../layouts/admin/sanpham/MauSac";
import SanPham from "../layouts/admin/sanpham/SanPham";
import KichThuoc from "../layouts/admin/sanpham/KichThuoc";
import ChiTietSanPham from "../layouts/admin/sanpham/ChiTietSanPham";
import HoaDon from "../layouts/admin/hoadon/HoaDon";
import KhachHang from "../layouts/admin/khachhang/KhachHang";
import AddKhachHang from "../layouts/admin/khachhang/AddKhachHang";
import UpdateKhachHang from "../layouts/admin/khachhang/UpdateKhachHang";
import AddSanPham from "../layouts/admin/sanpham/AddSanPham";
// Auth
import { Login } from "../layouts/login/Login";
import { QuenMatKhau } from "../layouts/login/QuenMatKhau";
import { DangKy } from "../layouts/login/DangKy";
import ThongKe from "../layouts/admin/thongke/ThongKe";
import HoaDonDetail from "../layouts/admin/hoadon/HoaDonDetail";
import DoiMatKhau from "../layouts/admin/doimatkhau/DoiMatKhau";
import ALLTabLichSuMuaHang from "../layouts/client/thongtin/ALLTabLichSuMuaHang";
import DetailTraCuuDonHang from "../layouts/client/thongtin/DetailHoaDon";
import ThongTinTaiKhoan from "../layouts/client/thongtin/thongtintaikhoan/ThongTinTaiKhoan";
import DoiMatKhauCLient from "../layouts/client/thongtin/thongtintaikhoan/DoiMatKhauCLient";
import { TrangChuAdmin } from "../layouts/admin/trangchu/TrangChuAdmin";
import { CartProvider } from "../layouts/client/giohang/CartContext";
import ThanhToanThanhCong from "../layouts/client/thongbaothanhtoan/ThanhToanThanhCong";
import ThanhToanThatBai from "../layouts/client/thongbaothanhtoan/ThanhToanThatBai";


function App() {
  return (
    <BrowserRouter basename={AppConfig.routerBase}>
      <Suspense fallback={null}>
        <Routes>
          {/* commons */}
          <Route path="*" element={<NotFoud />} />
          <Route path="/not-access" element={<NotAccess />} />

          {/* auth */}
          <Route
            path="/login"
            element={
              <GuestGuard>
                <Login />
              </GuestGuard>
            }
          />
          <Route
            path="/dang-ky"
            element={
              <GuestGuard>
                <DangKy />
              </GuestGuard>
            }
          />
          <Route
            path="/quen-mat-khau"
            element={
              <GuestGuard>
                <QuenMatKhau />
              </GuestGuard>
            }
          />

          {/* client */}
          <Route
            path="/home"
            element={
              <GuestGuard>
                <CartProvider>
                  <DashboardClient>
                    <Home />
                  </DashboardClient>
                </CartProvider>
              </GuestGuard>
            }
          />
          <Route
            path="/lich-su-mua-hang"
            element={
              <GuestGuard>
                <CartProvider>
                  <DashboardClient>
                    <ALLTabLichSuMuaHang />
                  </DashboardClient>
                </CartProvider>
              </GuestGuard>
            }
          />
          <Route
            path="/thong-tin-tai-khoan"
            element={
              <GuestGuard>
                <CartProvider>
                  <DashboardClient>
                    <ThongTinTaiKhoan />
                  </DashboardClient>
                </CartProvider>
              </GuestGuard>
            }
          />
          <Route
            path="/doi-mat-khau"
            element={
              <GuestGuard>
                <CartProvider>
                  <DashboardClient>
                    <DoiMatKhauCLient />
                  </DashboardClient>
                </CartProvider>
              </GuestGuard>
            }
          />
          <Route
            path="/home-hoa-don/:idHD"
            element={
              <GuestGuard>
                <CartProvider>
                  <DashboardClient>
                    <DetailTraCuuDonHang />
                  </DashboardClient>
                </CartProvider>
              </GuestGuard>
            }
          />
          <Route
            path="/san-pham"
            element={
              <GuestGuard>
                <CartProvider>
                  <DashboardClient>
                    <SanPhamClient />
                  </DashboardClient>
                </CartProvider>
              </GuestGuard>
            }
          />
          <Route
            path="/tra-cuu-don-hang"
            element={
              <GuestGuard>
                <CartProvider>
                  <DashboardClient>
                    <TraCuuDonHangClient />
                  </DashboardClient>
                </CartProvider>
              </GuestGuard>
            }
          />
          <Route
            path="/home-hoa-don/:idHD"
            element={
              <GuestGuard>
                <CartProvider>
                  <DashboardClient>
                    <DetailTraCuuDonHang />
                  </DashboardClient>
                </CartProvider>
              </GuestGuard>
            }
          />
          <Route
            path="/gio-hang"
            element={
              <GuestGuard>
                <CartProvider>
                  <DashboardClient>
                    <GioHang />
                  </DashboardClient>
                </CartProvider>
              </GuestGuard>
            }
          />
          <Route
            path="/lien-he"
            element={
              <GuestGuard>
                <CartProvider>
                  <DashboardClient>
                    <LienHe />
                  </DashboardClient>
                </CartProvider>
              </GuestGuard>
            }
          />
          <Route
            path="/thanh-toan-thanh-cong"
            element={
              <GuestGuard>
                <CartProvider>
                  <DashboardClient>
                    <ThanhToanThanhCong />
                  </DashboardClient>
                </CartProvider>
              </GuestGuard>
            }
          />
          <Route
            path="/thanh-toan-that-bai"
            element={
              <GuestGuard>
                <CartProvider>
                  <DashboardClient>
                    <ThanhToanThatBai />
                  </DashboardClient>
                </CartProvider>
              </GuestGuard>
            }
          />
          <Route
            path="/tim-kiem/:ten"
            element={
              <GuestGuard>
                <CartProvider>
                  <DashboardClient>
                    <TimKiemDashBoard />
                  </DashboardClient>
                </CartProvider>
              </GuestGuard>
            }
          />

          {/* admin */}
          <Route
            path="/admin"
            element={
              <AdminGuard>
                <DashboardAdmin>
                  <TrangChuAdmin />
                </DashboardAdmin>
              </AdminGuard>
            }
          />
          <Route
            path="/admin-doi-mat-khau"
            element={
              <AdminGuard>
                <DashboardAdmin>
                  <DoiMatKhau />
                </DashboardAdmin>
              </AdminGuard>
            }
          />
          <Route
            path="/admin-khach-hang"
            element={
              <AdminGuard>
                <DashboardAdmin>
                  <KhachHang />
                </DashboardAdmin>
              </AdminGuard>
            }
          />
          <Route
            path="/admin-update-khach-hang/:id"
            element={
              <AdminGuard>
                <DashboardAdmin>
                  <UpdateKhachHang />
                </DashboardAdmin>
              </AdminGuard>
            }
          />
          <Route
            path="/admin-them-khach-hang"
            element={
              <AdminGuard>
                <DashboardAdmin>
                  <AddKhachHang />
                </DashboardAdmin>
              </AdminGuard>
            }
          />

          <Route
            path="/admin-chat-lieu"
            element={
              <AdminGuard>
                <DashboardAdmin>
                  <ChatLieu />
                </DashboardAdmin>
              </AdminGuard>
            }
          />
          <Route
            path="/admin-hang"
            element={
              <AdminGuard>
                <DashboardAdmin>
                  <Hang />
                </DashboardAdmin>
              </AdminGuard>
            }
          />
          <Route
            path="/admin-danh-muc"
            element={
              <AdminGuard>
                <DashboardAdmin>
                  <DanhMuc />
                </DashboardAdmin>
              </AdminGuard>
            }
          />
          <Route
            path="/admin-gioi-tinh"
            element={
              <AdminGuard>
                <DashboardAdmin>
                  <GioiTinh />
                </DashboardAdmin>
              </AdminGuard>
            }
          />
          <Route
            path="/admin-mau-sac"
            element={
              <AdminGuard>
                <DashboardAdmin>
                  <MauSac />
                </DashboardAdmin>
              </AdminGuard>
            }
          />
          <Route
            path="/admin-kich-thuoc"
            element={
              <AdminGuard>
                <DashboardAdmin>
                  <KichThuoc />
                </DashboardAdmin>
              </AdminGuard>
            }
          />
          <Route
            path="/admin-san-pham"
            element={
              <AdminGuard>
                <DashboardAdmin>
                  <SanPham />
                </DashboardAdmin>
              </AdminGuard>
            }
          />
          <Route
            path="/admin-chi-tiet-san-pham/:id"
            element={
              <AdminGuard>
                <DashboardAdmin>
                  <ChiTietSanPham />
                </DashboardAdmin>
              </AdminGuard>
            }
          />
          <Route
            path="/admin-them-san-pham"
            element={
              <AdminGuard>
                <DashboardAdmin>
                  <AddSanPham />
                </DashboardAdmin>
              </AdminGuard>
            }
          />

          <Route
            path="/admin-hoa-don"
            element={
              <AdminGuard>
                <DashboardAdmin>
                  <HoaDon />
                </DashboardAdmin>
              </AdminGuard>
            }
          />
          <Route
            path="/admin-detail-hoa-don/:id"
            element={
              <AdminGuard>
                <DashboardAdmin>
                  <HoaDonDetail />
                </DashboardAdmin>
              </AdminGuard>
            }
          />
          <Route
            path="/admin-thong-ke"
            element={
              <AdminGuard>
                <DashboardAdmin>
                  <ThongKe />
                </DashboardAdmin>
              </AdminGuard>
            }
          />
        </Routes>

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
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
