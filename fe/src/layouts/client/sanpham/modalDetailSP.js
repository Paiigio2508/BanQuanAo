import { Button, Modal, Image, InputNumber } from "antd";
import React, { useState } from "react";
const ModalDetailSP = ({
  openModalDetailSP,
  setOpenModalDetailSP,
  productData,
}) => {
  const [soLuong, setSoLuong] = useState(1);

  const handleClose = () => {
    setOpenModalDetailSP(false);
  };

  if (!productData) return null; // tránh lỗi khi chưa có dữ liệu

  return (
    <Modal
      centered
      open={openModalDetailSP} // AntD v5
      visible={openModalDetailSP} // fallback AntD v4
      onOk={handleClose}
      onCancel={handleClose}
      width={1000}
    >
      <div className="row">
        <div className="col-md-6 d-flex justify-content-center align-items-center">
          <Image
            style={{ width: 450, height: 450, objectFit: "contain" }}
            src={productData.linkAnh}
            alt={productData.tenSP}
          />
        </div>

        <div className="col-md-6">
          <h3>
            {productData.tenSP} - {productData.tenGT}
          </h3>
          <h5 className="mb-3" style={{ color: "red" }}>
            <span style={{ color: "black" }}>
              {Intl.NumberFormat("en-US").format(
                roundToThousands(productData.giaBan)
              )}{" "}
              VND
            </span>
          </h5>
          <hr />
          <h6>Màu</h6>
          <Button
            style={{
              backgroundColor: productData.maMS,
              borderRadius: 40,
              width: 30,
              height: 30,
              border: "1px solid #000",
            }}
          />
          <hr />
          <h6>Size</h6>
          <div>{productData.tenKT || "-"}</div>

          <h6 className="mt-3">Số lượng</h6>
          <div className="row">
            <div className="col">
              <InputNumber
                min={1}
                max={productData.soLuong}
                value={soLuong}
                onChange={(value) => setSoLuong(value)}
              />
            </div>
            <div className="col">{productData.soLuong} sản phẩm có sẵn</div>
          </div>

          <Button className="mt-3" type="primary" onClick={handleClose}>
            Thêm vào giỏ hàng
          </Button>

          <hr />
          <h5>Mô tả sản phẩm:</h5>
          <p>
            <p>
              ● <label className="me-2">Tên hãng:</label> {productData.tenHang}
            </p>
            <p>● Chất liệu: {productData.tenCL}</p>
            <p>● Danh mục: {productData.tenDM}</p>
            {productData.moTa}
          </p>
        </div>
      </div>
    </Modal>
  );
};

export default ModalDetailSP;

function roundToThousands(amount) {
  return Math.round((amount || 0) / 100) * 100;
}
