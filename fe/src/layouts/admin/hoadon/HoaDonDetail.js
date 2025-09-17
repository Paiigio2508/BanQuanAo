import { useLocation, useParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { FaRegCalendarCheck, FaBug } from "react-icons/fa";
import moment from "moment";
import { FaCheckCircle } from "react-icons/fa";
import { RiTruckFill } from "react-icons/ri";
import { SlNotebook } from "react-icons/sl";
import { GiNotebook, GiPiggyBank } from "react-icons/gi";
import { FaMoneyBillTrendUp, FaTruckFast } from "react-icons/fa6";
import { ImCancelCircle } from "react-icons/im";
export default function HoaDonDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { state } = useLocation();

  const hoaDon = state?.hoaDon;
  useEffect(() => {
    if (!hoaDon) navigate("/admin-hoa-don", { replace: true });
  }, [hoaDon, navigate]);
  if (!hoaDon) return null;
const showIcon = (trangThai) => {
  if (hoaDon.trangThai === "0") {
    return <GiNotebook />;
  } else if (hoaDon.trangThai === "1") {
    return <SlNotebook />;
  } else if (hoaDon.trangThai === "2") {
    return <RiTruckFill />;
  } else if (hoaDon.trangThai === "3") {
    return <FaTruckFast />;
  } else if (hoaDon.trangThai === "4") {
    return <FaMoneyBillTrendUp />;
  } else if (hoaDon.trangThai === "-1") {
    return <ImCancelCircle />;
  } 
};
  return (
    <div>
      <h3>Chi tiết hoá đơn {hoaDon.ma}</h3>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <div style={{ fontSize: "100px", color: "green" }}>{showIcon("5")}</div>
        <h2>{hoaDon.trangThai}</h2>
      </div>
    </div>
  );
}
