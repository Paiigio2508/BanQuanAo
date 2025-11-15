import React, { useEffect } from "react";
import { Button, Result } from "antd";
import { useNavigate } from "react-router-dom";
export default function ThanhToanThanhCong() {
  const nav = useNavigate();
  useEffect(() => {
  }, []);

  const backHome = (res) => {
    nav("/home");
  };
  return (
    <div className="resultContainer">
      <Result
        status="success"
        title="Đặt hàng thành công!"
        subTitle="Thông tin đơn hàng đã gửi về mail của bạn!!!, vui lòng kiểm tra mail để biết thêm thông tin chi tiết"
        extra={[
          <Button type="primary" onClick={backHome}>
            Tiếp tục mua hàng
          </Button>,
        ]}
      />
    </div>
  );
}
