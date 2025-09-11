
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
// import { Home } from "../layouts/client/home/home";
// import { Login } from "../layouts/login/Login";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function App() {
  return (
    <>
      <BrowserRouter basename={AppConfig.routerBase}>
        <Suspense>
          <Routes>
            <Route path="*" element={<NotFoud />} />
            <Route path="/not-access" element={<NotAccess />} />

            {/* login */}
            {/* <Route
              path="/login"
              element={
                <GuestGuard>
                  <Login />
                </GuestGuard>
              }
            /> */}
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
                    {/* <Home /> */}
                  </DashboardClient>
                </GuestGuard>
              }
            />
            <Route
              path="/menu"
              element={
                <GuestGuard>
                  <DashboardClient>
                    {/* <MENU /> */}
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
            {/* <Route
              path="/admin-nhan-vien"
              element={
                <AdminGuard>
                  <DashboardAdmin>
                    <NhanVien />
                  </DashboardAdmin>
                </AdminGuard>
              }
            />
            <Route
              path="/admin-them-nhan-vien"
              element={
                <AdminGuard>
                  <DashboardAdmin>
                    <AddNhanVien />
                  </DashboardAdmin>
                </AdminGuard>
              }
            />
            <Route
              path="/admin-update-nhan-vien/:id"
              element={
                <AdminGuard>
                  <DashboardAdmin>
                    <UpdateNhanVien />
                  </DashboardAdmin>
                </AdminGuard>
              }
            />
            <Route
              path="/admin-detail-nhan-vien/:id"
              element={
                <AdminGuard>
                  <DashboardAdmin>
                    <DetailNhanVien />
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
              path="/admin-danh-muc"
              element={
                <AdminGuard>
                  <DashboardAdmin>
                    <DanhMuc />
                  </DashboardAdmin>
                </AdminGuard>
              }
            /> */}


            {/* <Route
              path="/admin-san-pham"
              element={
                <AdminGuard>
                  <DashboardAdmin>
                    <SanPham />
                  </DashboardAdmin>
                </AdminGuard>
              }
            /> */}
     
          </Routes>
        </Suspense>
      </BrowserRouter>
      <ToastContainer />
    </>
  );
}

export default App;
