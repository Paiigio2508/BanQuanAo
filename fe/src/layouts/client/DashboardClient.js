// 🔼 Import phải đặt ở đầu
import React, { useState, useEffect } from "react";
import "./Dashboard.css";
import "bootstrap/dist/css/bootstrap.min.css";
import logoShop from "../../assets/images/logo1.png";
import { Avatar, Dropdown, Input, Button } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
export const DashboardClient = ({ children }) => {
  const { Search } = Input;
  const [idUser, setIdUser] = useState(null);
  const [userName, setUserName] = useState("");
  const [linkAnh, setLinkAnh] = useState("");
  const [valueSearch, setValueSearchs] = useState("");

  const nav = useNavigate();
  const onSearch = (value) => {
    const keyword = value && value.trim() ? value.trim() : "allsanpham";
    nav(`/tim-kiem/${keyword}`);
    setValueSearchs("");
  };
  const isLoggedIn = !!userName?.trim();
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
    if (window.location.pathname === "/home") {
      window.location.reload();
    } else {
      window.location.assign("/home"); // hoặc: window.location.href = "/home";
    }
  };
  const items = [
    {
      key: "1",
      label: <a onClick={() => nav("/doi-mat-khau")}>Đổi mật khẩu</a>,
    },
    {
      key: "2",
      label: <a onClick={() => nav("/lich-su-mua-hang")}>Đơn mua</a>,
    },
    { key: "3", label: <a onClick={dangXuat}>Đăng xuất</a> },
  ];

  return (
    <>
      <div className="top-header">
        <marquee behavior="scroll" className="mt-1" direction="left">
          GIẢM 50% ƯU ĐÃI ĐỘC QUYỀN ONLINE
        </marquee>
      </div>
      <div className="bg-white">
        <nav className="nav-bar">
          <ul className="nav-list">
            <li>
              <img width={200} src={logoShop} alt="logo" />
            </li>
            <li>
              <Link to="/home" className="nav-link my-nav-link">
                Trang chủ
              </Link>
            </li>
            <li>
              <Link to="/san-pham" className="nav-link my-nav-link">
                Sản phẩm
              </Link>
            </li>
            <li>
              <Link to="/lien-he" className="nav-link my-nav-link">
                Liên hệ
              </Link>
            </li>
            <li>
              <Link to="/gio-hang" className="nav-link my-nav-link">
                Giỏ hàng
              </Link>
            </li>
            <li>
              <Search
                placeholder="Tìm kiếm tên phẩm phẩm"
                style={{ width: 240 }}
                onSearch={onSearch}
                value={valueSearch}
                onChange={(e) => setValueSearchs(e.target.value)}
              />
            </li>
          </ul>

          <div className="nav-right">
            <div className="nav-right">
              {isLoggedIn ? (
                <Dropdown menu={{ items }} arrow placement="bottomRight">
                  <span
                    style={{
                      cursor: "pointer",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 8,
                    }}
                  >
                    <Avatar
                      src={linkAnh}
                      icon={!linkAnh && <UserOutlined />}
                      style={{ width: 40, height: 40 }}
                    />
                    <span className="text-dark" style={{ fontWeight: 500 }}>
                      {userName}
                    </span>
                  </span>
                </Dropdown>
              ) : (
                <Link to="/login">
                  <Button className="">Đăng nhập</Button>
                </Link>
              )}
            </div>
          </div>
        </nav>
      </div>

      <div>{children}</div>

      <div className="footer mt-5 pb-5">
        <div className="container ">
          <div className="row">
            {/* Cột 1 */}
            <div className="col-md-4 col-12">
              <div
                data-nh-block="1d9kowy"
                data-nh-block-cache="true"
                className=""
              >
                <div className="title-footer font-weight-bold text-uppercase mb-4">
                  Về chúng tôi
                </div>

                <div className="entire-info-website">
                  <div className="mb-4">Shop quần áo thể thao TSPORT</div>

                  <address>
                    <p>
                      <i className="fa-solid fa-building" /> Đại học penika
                    </p>
                    <p>
                      <i className="fa-solid fa-phone" />
                    </p>
                    <p>
                      <i className="fa-solid fa-envelope" /> TSPORT@gmail.com
                    </p>
                  </address>
                </div>
              </div>
            </div>

            {/* Cột 2 */}
            <div className="col-md-4 col-12">
              <div
                data-nh-block="xydo397"
                data-nh-block-cache="true"
                className=""
              >
                <div className="footer-menu-section">
                  <div className="title-footer font-weight-bold text-uppercase mb-4">
                    Chính sách
                  </div>
                  <ul className="">
                    <li className="mb-4">Chính sách bảo mật</li>
                    <li className="mb-4">Chính sách bán hàng</li>
                    <li className="mb-4">Chính sách vận chuyển</li>
                    <li className="mb-4">Chính sách bảo hành</li>
                    <li className="mb-4">Chính sách đổi hàng</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Cột 3 */}
            <div className="col-md-4 col-12">
              <div
                data-nh-block="fyh8tms"
                data-nh-block-cache="true"
                className=""
              >
                <div className="footer-menu-section">
                  <div className="title-footer font-weight-bold text-uppercase mb-4">
                    Danh mục
                  </div>
                  <ul className="">
                    <li className="mb-4">Áo thun thể thao</li>
                    <li className="mb-4">Áo polo thể thao</li>
                    <li className="mb-4">Quần short</li>
                    <li className="mb-4">Quần jogger</li>
                    <li className="mb-4">Phụ kiện</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Cột 4 */}
          </div>
        </div>
      </div>
    </>
  );
};
