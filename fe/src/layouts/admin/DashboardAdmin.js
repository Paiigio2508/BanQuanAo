// DashboardAdmin.jsx
import React, { useState, useEffect } from "react";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { useNavigate, useLocation } from "react-router-dom";
import { FaGithub, FaMoneyBills } from "react-icons/fa6";
import { FaUserPen } from "react-icons/fa6";
import { BsBoxSeamFill } from "react-icons/bs";
import { RxDashboard } from "react-icons/rx";
import { Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import {
  Avatar,
  Badge,
  Button,
  Layout,
  theme,
  FloatButton,
  Dropdown,
  Space,
} from "antd";
import logoShop from "../../assets/images/logo.jpg";
import bgsider from "../../assets/images/sidebar.png";
import UserContext from "../admin/UserContext";
import "./DashboardAdmin.css";
const { Header, Sider, Content } = Layout;

const DashboardAdmin = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const nav = useNavigate();
  const location = useLocation();

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  // Khai báo state quản lý user trong context
  const [idUser, setIdUser] = useState(null);
  const [userName, setUserName] = useState("Admin");
  const [linkAnh, setLinkAnh] = useState("");

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("userData"));
    if (userData) {
      setIdUser(userData.userID || null);
      setUserName(userData.ten || "Admin");
      setLinkAnh(userData.anh || "");
    }
  }, []);

  const dangXuat = () => {
    localStorage.clear();
    nav("/login");
  };

  const DoiMatKhau = () => nav("/admin-doi-mat-khau");

  const items = [
    { key: "1", label: <span onClick={DoiMatKhau}>Đổi mật khẩu</span> },
    { key: "2", label: <span onClick={dangXuat}>Đăng xuất</span> },
  ];

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        width={235}
        style={{ minHeight: "100%" }}
      >
        <div
          style={{
            position: "relative",
            minHeight: "100%",
            backgroundColor: "#1f1f1f",
          }}
        >
          {/* nền mờ */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundImage: `url(${bgsider})`,
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
              opacity: 0.25,
              zIndex: 0,
            }}
          />
          {/* content */}
          <div
            style={{
              position: "relative",
              zIndex: 1,
              minHeight: "100%",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div
              style={{
                padding: 20,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                fontWeight: "bold",
                textTransform: "uppercase",
              }}
            >
              {!collapsed ? (
                <>
                  <img src={logoShop} width={100} alt="logo" />
                  <span
                    style={{ color: "white", marginTop: 5, fontSize: "24px" }}
                  >
                    {/* Tên shop nếu muốn */}
                  </span>
                </>
              ) : (
                <img src={logoShop} width={40} alt="logo" />
              )}
            </div>

            <Menu>
              <MenuItem
                icon={<RxDashboard size={24} />}
                style={{ fontSize: "18px" }}
                active={location.pathname === "/admin-thong-ke"}
                onClick={() => nav("/admin-thong-ke")}
              >
                Thống kê
              </MenuItem>

              <SubMenu
                icon={<BsBoxSeamFill size={24} />}
                label="Sản phẩm"
                style={{ fontSize: "18px" }}
                defaultOpen={
                  location.pathname.startsWith("/admin-san-pham") ||
                  location.pathname.startsWith("/admin-danh-muc")
                }
              >
                <MenuItem
                  active={location.pathname === "/admin-san-pham"}
                  onClick={() => nav("/admin-san-pham")}
                >
                  Sản phẩm
                </MenuItem>

                <MenuItem
                  active={location.pathname === "/admin-hang"}
                  onClick={() => nav("/admin-hang")}
                >
                  Hãng
                </MenuItem>

                <MenuItem
                  active={location.pathname === "/admin-kich-thuoc"}
                  onClick={() => nav("/admin-kich-thuoc")}
                >
                  Kích Thước
                </MenuItem>

                <MenuItem
                  active={location.pathname === "/admin-chat-lieu"}
                  onClick={() => nav("/admin-chat-lieu")}
                >
                  Chất liệu
                </MenuItem>

                <MenuItem
                  active={location.pathname === "/admin-mau-sac"}
                  onClick={() => nav("/admin-mau-sac")}
                >
                  Màu Sắc
                </MenuItem>

                <MenuItem
                  active={location.pathname === "/admin-danh-muc"}
                  onClick={() => nav("/admin-danh-muc")}
                >
                  Danh mục
                </MenuItem>

                <MenuItem
                  active={location.pathname === "/admin-gioi-tinh"}
                  onClick={() => nav("/admin-gioi-tinh")}
                >
                  Giới tính
                </MenuItem>
              </SubMenu>

              <MenuItem
                active={location.pathname === "/admin-khach-hang"}
                onClick={() => nav("/admin-khach-hang")}
                icon={<FaUserPen size={24} />}
                style={{ fontSize: "18px" }}
              >
                Khách hàng
              </MenuItem>

              <MenuItem
                active={location.pathname === "/admin-hoa-don"}
                onClick={() => nav("/admin-hoa-don")}
                icon={<FaMoneyBills size={24} />}
                style={{ fontSize: "18px" }}
                suffix={
                  !collapsed && (
                    <Badge count="New" style={{ background: "red" }} />
                  )
                }
              >
                Hóa đơn
              </MenuItem>
            </Menu>

            <div
              style={{
                textAlign: "center",
                marginTop: "auto",
                padding: 20,
              }}
            >
              {collapsed ? (
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noreferrer"
                  style={{ color: "white" }}
                >
                  <FaGithub size={20} />
                </a>
              ) : (
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noreferrer"
                  style={{ color: "white" }}
                >
                  <FaGithub size={20} /> TSPORT
                </a>
              )}
            </div>
          </div>
        </div>
      </Sider>

      <Layout>
        <Header
          style={{
            background: "#4E4336",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0 16px",
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{ cursor: "pointer" }}
          />

          <Dropdown menu={{ items }} arrow>
            <Space size={8} align="center" style={{ cursor: "pointer" }}>
              <Avatar
                src={linkAnh}
                className="avatar-hover"
                style={{ filter: "brightness(1.2)", width: 40, height: 40 }}
              />
              <span
                className="text-light"
                style={{ marginLeft: 4, fontWeight: "500", color: "#fff" }}
              >
                {userName}
              </span>
            </Space>
          </Dropdown>
        </Header>

        <Content
          style={{
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            // Quan trọng: để trang tự cao theo content, không cuộn cục bộ tại đây
            overflow: "visible",
          }}
        >
          <UserContext.Provider
            value={{
              idUser,
              setIdUser,
              userName,
              setUserName,
              linkAnh,
              setLinkAnh,
            }}
          >
            {children}
          </UserContext.Provider>
        </Content>
      </Layout>

      <FloatButton.BackTop />
    </Layout>
  );
};

export default DashboardAdmin;
