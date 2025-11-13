import { Image } from "antd";
import { useState } from "react";
import { GioHangAPI } from "../../../pages/api/client/GioHangAPI";
import { FaRegTrashAlt } from "react-icons/fa";

function GioHangChiTiet({ product, loadghct }) {
    const [quantity, setQuantity] = useState(product?.soLuong ?? 0);

    const handleUpdateGHCT = async (nextQty) => {
      const maxQty = product.soLuongTon ?? Infinity;
      const newQty = Math.max(0, Math.min(nextQty, maxQty));
      if (newQty === quantity) return;
  
      setQuantity(newQty);
      const payload = {
        id: product.idGhct,
        ...product,
        soLuong: newQty,
        thanhTien: newQty * product.price,
      };
  
      try {
        await GioHangAPI.updateGHCT(payload);
        await Promise.all([loadghct?.()]);
      } catch {
        loadghct?.();
      }
    };
  
    const handleDecrease = () => {
      if (quantity > 1) {
        handleUpdateGHCT(quantity - 1);
      } else {
        handleDeleteGHCT();
      }
    };
  
    const handleIncrease = () => {
      if (quantity < (product.soLuongTon ?? Infinity)) {
        handleUpdateGHCT(quantity + 1);
      }
    };
  
    const handleDeleteGHCT = async () => {
      try {
        await GioHangAPI.deleteGHCT(product.idGhct);
        await Promise.all([loadghct?.()]);
      } catch {}
    };
  return (
    <tr className="align-middle mt-5">
      {/* Ảnh + thông tin */}
      <td style={{ width: 380, paddingBottom: "25px" }}>
        <div className="d-flex align-items-center">
            <div
              style={{
                border: "1px solid #000",
                borderRadius: 8,
                padding: 2,
                display: "inline-block",
              }}
            >
              <Image
                style={{ width: 100, height: 100 }}
                src={product?.image}
                alt="Product"
                preview={false}
              />
            </div>

          <div className="fw-bold ms-4">
            <h5 className="mb-1">{product?.name}</h5>
            <h5 className="mt-1 mb-2 text-danger">{product?.size}</h5>
            <div
              style={{
                backgroundColor: product?.colorCode,
                border: "1px solid black",
                borderRadius: 6,
                width: 60,
                height: 25,
              }}
            />
          </div>
        </div>
      </td>

      {/* Giá bán*/}
      <td className="align-middle" style={{ width: 200 }}>
        <h5 className="fw-bold text-danger mb-0">
            {Intl.NumberFormat("en-US").format(product?.price)} VND
        </h5>
      </td>

      {/* Tăng/giảm số lượng */}
      <td className="align-middle">
        <div
          className="d-flex align-items-center"
          style={{ marginLeft: 50, marginRight: 50 }}
        >
          <button
            onClick={handleDecrease}
            style={{ width: 35, borderRadius: 10, fontSize:"30px" }}
          >
            -
          </button>
          <input
            value={quantity}
            className="ms-2 me-2 text-center fs-4"
            style={{ width: 35 }}
            min={0}
            readOnly
          />
          <button
            onClick={handleIncrease}
            style={{ width: 35, borderRadius: 10, fontSize:"30px" }}
          >
            +
          </button>
        </div>
      </td>

      {/* Thành tiền */}
      <td className="align-middle" style={{ width: 200 }}>
        <h5 className="fw-bold text-danger mb-0">
          {Intl.NumberFormat("en-US").format(product?.thanhTien)} VND
        </h5>
      </td>

      {/* Xóa */}
      <td className="align-middle">
        <button
          className="btn btn-light p-2"
          style={{ borderRadius: 5, backgroundColor:"#dedcdc" }}
          onClick={handleDeleteGHCT}
          aria-label="Delete item"
        >
          <FaRegTrashAlt />
        </button>
      </td>
    </tr>
  );
}
export default GioHangChiTiet;
