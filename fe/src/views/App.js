
import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AppConfig } from "./AppConfig";
import NotFoud from "../pages/404/NotFoud";
import NotAccess from "../pages/403/NotAccess";
import GuestGuard from "../guard/GuestGuard";
import AdminGuard from "../guard/AdminGuard";
import { Suspense } from "react";
import { DashboardClient } from "../layouts/client/DashboardClient";
import DashboardAdmin from "../layouts/admin/DashboardAdmin";
import { Home } from "../layouts/client/home/home";
import { Login } from "../layouts/login/Login";


//SanPham
import ChatLieu from '../layouts/admin/sanpham/ChatLieu';
import Hang from '../layouts/admin/sanpham/Hang';
import DanhMuc from '../layouts/admin/sanpham/DanhMuc';
import GioiTinh from '../layouts/admin/sanpham/GioiTinh';
import MauSac from '../layouts/admin/sanpham/MauSac';
import SanPham from '../layouts/admin/sanpham/SanPham';
import KichThuoc from '../layouts/admin/sanpham/KichThuoc';
import ChiTietSanPham from '../layouts/admin/sanpham/ChiTietSanPham';
import AddChiTietSanPham from '../layouts/admin/sanpham/AddChiTietSanPham';
// khách hàng
import KhachHang from "../layouts/admin/khachhang/KhachHang";
import AddKhachHang from "../layouts/admin/khachhang/AddKhachHang";
import UpdateKhachHang from "../layouts/admin/khachhang/UpdateKhachHang";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { SanPhamClient } from '../layouts/client/sanpham/SanPham';
import { GioHang } from '../layouts/client/giohang/GioHang';
import { LienHe } from '../layouts/client/lienhe/lienhe';
function App() {
  return (
    <>
      <BrowserRouter basename={AppConfig.routerBase}>
        <Suspense>
          <Routes>
            <Route path="*" element={<NotFoud />} />
            <Route path="/not-access" element={<NotAccess />} />

            {/* login */}
            <Route
              path="/login"
              element={
                <GuestGuard>
                  <Login />
                </GuestGuard>
              }
            />
            <Route
              path="/sign-up"
              element={<GuestGuard>{/* Component sign-up */}</GuestGuard>}
            />
            <Route
              path="/forgot-password"
              element={
                <GuestGuard>{/* Component forgot-password */}</GuestGuard>
              }
            />

            {/* client */}
            <Route
              path="/home"
              element={
                <GuestGuard>
                  <DashboardClient>
                    <Home />
                  </DashboardClient>
                </GuestGuard>
              }
            />
            <Route
              path="/san-pham"
              element={
                <GuestGuard>
                  <DashboardClient>
                    <SanPham />
                  </DashboardClient>
                </GuestGuard>
              }
            />
            <Route
              path="/gio-hang"
              element={
                <GuestGuard>
                  <DashboardClient>
                    <GioHang />
                  </DashboardClient>
                </GuestGuard>
              }
            />
            <Route
              path="/lien-he"
              element={
                <GuestGuard>
                  <DashboardClient>
                    <LienHe />
                  </DashboardClient>
                </GuestGuard>
              }
            />
            {/* admin */}
            <Route
              path="/admin"
              element={
                <AdminGuard>
                  <DashboardAdmin />
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
              path="/admin-them-chi-tiet-san-pham/:id"
              element={
                <AdminGuard>
                  <DashboardAdmin>
                    <AddChiTietSanPham />
                  </DashboardAdmin>
                </AdminGuard>
              }
            />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </>
  );
}

export default App;
