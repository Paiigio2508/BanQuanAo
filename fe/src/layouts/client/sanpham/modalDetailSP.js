import { Button, Modal, Image, InputNumber } from "antd";
import React, { useState } from "react";
import { toast } from "react-toastify";
const ModalDetailSP = ({
  openModalDetailSP,
  setOpenModalDetailSP,
  productData,
}) => {
  const [soLuong, setSoLuong] = useState(1);

  const handleClose = () => setOpenModalDetailSP(false);

  if (!productData) return null; // tránh lỗi khi chưa có dữ liệu

  const soLuongTon = Number(productData.soLuong) || 0;
  /** Tìm variant theo màu + size */

  const handleAddGioHang = async () => {
    try {
      if (!selectedVariant)
        return toast.error("Vui lòng chọn màu & size hợp lệ!");

      if (Number(soLuong) > Number(selectedVariant?.soLuong || 0))
        return toast.error("Số lượng sản phẩm không đủ!");

      const thanhTien = tinhTien(selectedVariant, soLuong);
      await upsertGhct(gh.id, selectedVariant, soLuong, thanhTien);

      toast.success("✔️ Thêm thành công!", { position: "top-right" });
   
    } catch (e) {
      console.error(e);
      toast.error("Thêm giỏ hàng thất bại. Vui lòng thử lại!");
    }
  };
  return (
    <Modal
      centered
      open={openModalDetailSP} // ✅ AntD v5
      onOk={handleClose}
      onCancel={handleClose}
      width={1000}
      maskClosable
    >
      <div className="row">
        <div className="col-md-6 d-flex justify-content-center align-items-center">
          <Image
            style={{ width: 450, height: 450, objectFit: "contain" }}
            src={productData.linkAnh}
            alt={productData.tenSP}
            fallback="https://via.placeholder.com/450x450?text=No+Image"
          />
        </div>

        <div className="col-md-6">
          <h3>
            {productData.tenSP} - {productData.tenGT}
          </h3>

          <h5 className="mb-3" style={{ color: "red" }}>
            <span style={{ color: "black" }}>
              {Intl.NumberFormat("vi-VN").format(
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
            aria-label={`Màu ${productData.tenMS || ""}`}
          />

          <hr />

          <h6>Size</h6>
          <div>{productData.tenKT || "-"}</div>

          <h6 className="mt-3">Số lượng</h6>
          <div className="row">
            <div className="col">
              <InputNumber
                min={1}
                max={soLuongTon}
                value={soLuong}
                onChange={(value) => setSoLuong(value || 1)} // ✅ tránh null
              />
            </div>
            <div className="col">{soLuongTon} sản phẩm có sẵn</div>
          </div>

          <Button
            className="mt-3"
            type="primary"
            onClick={handleAddGioHang}
            disabled={soLuongTon < 1}
          >
            Thêm vào giỏ hàng
          </Button>

          <hr />

          <h5>Mô tả sản phẩm:</h5>
          {/* ✅ Đổi <p> bọc ngoài thành <div> để không lồng p trong p */}
          <div>
            <p>
              ● <label className="me-2">Tên hãng:</label> {productData.tenHang}
            </p>
            <p>● Chất liệu: {productData.tenCL}</p>
            <p>● Danh mục: {productData.tenDM}</p>
            <div>{productData.moTa}</div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ModalDetailSP;

// ✅ Tên function là "roundToThousands" thì làm tròn theo 1.000 cho đúng ý nghĩa
function roundToThousands(amount) {
  const n = Number(amount) || 0;
  return Math.round(n / 1000) * 1000;
}
