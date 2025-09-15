// 🔼 Import phải đặt ở đầu
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Dashboard.css";
import "bootstrap/dist/css/bootstrap.min.css";
import logoShop from "../../assets/images/logo1.png";
import { Avatar, Dropdown,Input, Button } from "antd";
import { UserOutlined } from "@ant-design/icons";
export const DashboardClient = ({ children }) => {
  const { Search } = Input;
    const [idUser, setIdUser] = useState(null);
   const [userName, setUserName] = useState("");
   const [linkAnh, setLinkAnh] = useState("");
   
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
       window.location.reload();
     };
      const items = [
        { key: "1", label: <a >Đổi mật khẩu</a> },
        { key: "2", label: "Thông tin" },
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
                placeholder="Tìm kiếm mã, tên phẩm phẩm"
                style={{ width: 240 }}
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
                  <div className="mb-4">
                    CÔNG TY CỔ PHẦN GIẢI PHÁP CÔNG NGHỆ 4S
                  </div>

                  <address>
                    <p>
                      <i className="fa-solid fa-building" /> Tầng 4, Tòa nhà số
                      97 - 99 Láng Hạ, Đống Đa, Hà Nội (Tòa nhà Petrowaco)
                    </p>
                    <p>
                      <i className="fa-solid fa-phone" /> 0901191616
                    </p>
                    <p>
                      <i className="fa-solid fa-envelope" /> contact@sm4s.vn
                    </p>
                  </address>
                </div>
              </div>
            </div>

            {/* Cột 2 */}
            <div className="col-md-3 col-12">
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
                    <li className="mb-4">
                      <a className="text-white" href="/#">
                        Chính sách bảo mật
                      </a>
                    </li>
                    <li className="mb-4">
                      <a className="text-white" href="/#">
                        Chính sách bán hàng
                      </a>
                    </li>
                    <li className="mb-4">
                      <a className="text-white" href="/#">
                        Chính sách vận chuyển
                      </a>
                    </li>
                    <li className="mb-4">
                      <a className="text-white" href="/#">
                        Chính sách bảo hành
                      </a>
                    </li>
                    <li className="mb-4">
                      <a className="text-white" href="/#">
                        Chính sách đổi hàng
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Cột 3 */}
            <div className="col-md-2 col-12">
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
                    <li className="mb-4">
                      <a className="text-white" href="/veston-cong-so">
                        Vest công sở
                      </a>
                    </li>
                    <li className="mb-4">
                      <a className="text-white" href="/ao-poolo">
                        Áo polo
                      </a>
                    </li>
                    <li className="mb-4">
                      <a className="text-white" href="/ao-so-mi-dai">
                        Áo sơ mi
                      </a>
                    </li>
                    <li className="mb-4">
                      <a className="text-white" href="/phu-kien">
                        Phụ kiện
                      </a>
                    </li>
                    <li className="mb-4">
                      <a className="text-white" href="/tin-tuc">
                        Tin tức
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Cột 4 */}
            <div className="col-md-3 col-12">
              <div
                data-nh-block="6ksb32l"
                data-nh-block-cache="true"
                className=""
              >
                <div className="title-footer font-weight-bold text-uppercase mb-4">
                  Fanpage
                </div>

                <div className="embed-responsive embed-responsive-1by1">
                  <iframe
                    title="facebook-page"
                    data-nh-lazy="iframe"
                    className="embed-responsive-item"
                    style={{ border: "none", overflow: "hidden" }}
                    scrolling="no"
                    frameBorder="0"
                    allowFullScreen={true}
                    allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                    src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2Fweb4s&tabs=timeline&small_header=true&adapt_container_width=true&hide_cover=false&show_facepile=true&appId=912588869433315"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
