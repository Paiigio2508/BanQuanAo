
import { useNavigate } from "react-router";
import { BsShop } from "react-icons/bs";
import { FaUser } from "react-icons/fa";

import {
  Avatar,
} from "antd";
import { get } from "local-storage";
import { RiLockPasswordLine } from "react-icons/ri";
const ProfileMenu = (props) => {
  const storedData = get("userData") || {}; // tránh null
  const userName = storedData.ten || ""; // lấy thẳng ra
  const AnhUser = storedData.anh || "";
  const nav = useNavigate();
  const donMua = () => {
    nav("/lich-su-mua-hang");
  };
  const taiKhoanCuaToi = () => {
    nav("/thong-tin-tai-khoan");
  };
  const doiMatKhau = () => {
    nav("/doi-mat-khau");
  };

  return (
    <>
      {/* CSS viết thẳng trong component */}
      <style>
        {`
          .button-back {
            cursor: pointer;
          }
          .button-back:hover span {
            text-decoration: underline;
          }
        `}
      </style>

      <div
        className="col-md-3"
        style={{
          border: "1px solid #ccc",
          borderRadius: "5px",
          padding: "10px",
        }}
      >
        <div className="row align-items-center">
          <div className="col-md-2">
            <Avatar
              style={{ width: 50, height: 50 }}
              shape="circle"
              className="align-content-start"
              src={AnhUser}
            />
          </div>
          <div
            className="col-md-10 text-center"
            style={{ display: "flex", alignItems: "center", height: "50px" }}
          >
            <h6 style={{ margin: 0, width: "100%" }}>
              <b>{userName}</b>
            </h6>
          </div>
        </div>

        <hr />

        <div className="button-back" onClick={taiKhoanCuaToi}>
          <FaUser className="ms-2" size={20} />
          <span className="ms-3">
            <b>Tài khoản của tôi</b>
          </span>
        </div>

        <div className="mt-3 button-back" onClick={doiMatKhau}>
          <RiLockPasswordLine className="ms-2" size={20} />
          <span className="ms-3">
            <b>Đổi mật khẩu</b>
          </span>
        </div>

        <div className="mt-3 button-back" onClick={donMua}>
          <BsShop className="ms-2" size={20} />
          <span className="ms-3">
            <b>Đơn mua</b>
          </span>
        </div>
      </div>
    </>
  );
};

export default ProfileMenu;