import { Button, Modal, Image, InputNumber } from "antd";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { get, set } from "local-storage";
import { GioHangAPI } from "../../../pages/api/client/GioHangAPI";
import { useCart } from "../../client/giohang/CartContext";
const ModalDetailSP = ({
  openModalDetailSP,
  setOpenModalDetailSP,
  productData,
}) => {
  const [soLuong, setSoLuong] = useState(1);
  const [adding, setAdding] = useState(false);
  const storedData = get("userData");
  const storedGioHang = get("GioHang");
  const handleClose = () => setOpenModalDetailSP(false);
  const { updateTotalQuantity } = useCart();
  if (!productData) return null; // tránh lỗi khi chưa có dữ liệu

  const soLuongTon = Number(productData.soLuong) || 0;
  /** Render mã giỏ hàng */
  const taoMa = (n = 6, c = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789") =>
  Array.from({ length: n }, () => c[(Math.random() * c.length) | 0]).join("");

  //kiểm tra tồn tại giỏ hàng chưa, khách hàng đăng nhập hay không đăng nhập
  const getOrCreateCart = async (khachHang, stored) => {
    if (stored?.id) return stored;// nếu tồn tại giỏ hàng thì return về giỏ hàng
    if (khachHang) {//kiểm tra nếu đăng nhập -> ktra khách có giỏ hàng chưa
      const r = await GioHangAPI.getByIDKH(khachHang);
    if (r?.data) return r.data;
      return (await GioHangAPI.addGH({ ma: taoMa(), nguoiDung:{id:khachHang}})).data;
    }
    const t = await GioHangAPI.addGH({ ma: taoMa(), nguoiDung: null });
    set("GioHang", t?.data);
    return t?.data;
    };
  //update số lượng giỏ hàng
  const updateCartDetail = async (gioHangId, ctsp, soLuong, thanhTien) => {
    const r = await GioHangAPI.getAllGhctByIdGh(gioHangId);
    const cur = (r?.data||[]).find(x => x.idCTSP === ctsp.idCTSP);
    const soLuongHienCo = Number(cur?.soLuong ?? 0);
    const thanhTienHienCo = Number(cur?.thanhTien ?? 0);

    const soLuongThem = Number(soLuong ?? 0);
    const thanhTienThem = Number(thanhTien ?? 0);

    const soLuongMoi = soLuongHienCo + soLuongThem;
    const tienMoi = thanhTienHienCo + thanhTienThem;
    const body = {
      gioHang: {"id":cur ? cur.idGioHang : gioHangId},
      chiTietSanPham: {"id":ctsp.idCTSP},
      soLuong:soLuongMoi,
      thanhTien:tienMoi,
      ...(cur && { id: cur.idGhct })
    };
    return cur ? GioHangAPI.updateGHCT(body) : GioHangAPI.addGHCT(body);
    };
    //add sp vào giỏ hàng
    const handleAddGioHang = async () => {
      try {
    
        if (Number(soLuong) > Number(productData?.soLuong || 0))
          return toast.error("Số lượng sản phẩm không đủ!");
        const gh = await getOrCreateCart(storedData? storedData.userID:null, storedGioHang);
        if (!gh?.id) throw new Error("Không xác định giỏ hàng.");
    
        const thanhTien = productData.giaBan*soLuong;
        await updateCartDetail(gh.id, productData, soLuong, thanhTien);
      loadCountGioHang();
        toast.success("✔️ Thêm thành công!", { position: "top-right" });
      } catch (e) {
        console.error(e);
        toast.error("Thêm giỏ hàng thất bại. Vui lòng thử lại!");
      }
    };
  const loadCountGioHang = async () => {
    try {
      const cartId = storedData?.userID
        ? (await GioHangAPI.getByIDKH(storedData.userID))?.data?.id
        : storedGioHang?.id;
      if (!cartId) return updateTotalQuantity(0);
      const items = (await GioHangAPI.getAllGHCTByIDGH(cartId))?.data ?? [];
      updateTotalQuantity(
        items.reduce((sum, it) => sum + (Number(it.soLuong) || 0), 0)
      );
    } catch (e) {
      console.error("loadCountGioHang:", e);
      updateTotalQuantity(0);
    }
  };
  return (
    <Modal
      centered
      open={openModalDetailSP} 
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
