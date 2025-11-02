import { Image } from "antd";
import { useState } from "react";

function GioHangChiTiet({ product, loadghct }) {
    const [quantity, setQuantity] = useState(product?.soLuong ?? 0);
    const refreshCartCount = useCallback(async () => {
        try {
          if (storedData?.userID) {
            const { data: gh } = await GioHangAPI.getByIDKH(storedData.userID);
            const res = await GioHangAPI.getAllGHCTByIDGH(gh.id);
            updateTotalQuantity(res.data.length);
          } else if (storedGioHang?.id) {
            const res = await GioHangAPI.getAllGHCTByIDGH(storedGioHang.id);
            updateTotalQuantity(res.data.length);
          }
        } catch {}
      }, [storedData?.userID, storedGioHang?.id, updateTotalQuantity]);
    
      useEffect(() => {
        refreshCartCount();
      }, [refreshCartCount]);
    const handleUpdateGHCT = async (nextQty) => {
        const maxQty = product.soLuongTon ?? Infinity;
        const newQty = Math.max(0, Math.min(nextQty, maxQty));
        if (newQty === quantity) return;
    
        setQuantity(newQty);
        const payload = {
          id: product.idGhct,
          ...product,
          soLuong: newQty,
          thanhTien: newQty * unitPrice,
        };
    
        try {
          await GioHangAPI.updateGHCT(payload);
          await Promise.all([loadghct?.(), refreshCartCount()]);
        } catch {
          loadghct?.();
          refreshCartCount();
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
          await Promise.all([loadghct?.(), refreshCartCount()]);
        } catch {}
      };
  return (
    <tr className="align-middle mt-5">
      {/* Ảnh + thông tin */}
      <td style={{ width: 380 }}>
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
            <h6 className="mb-1">{product?.name}</h6>
            <h6 className="mt-1 mb-2 text-danger">{product?.size}</h6>
            <div
              style={{
                backgroundColor: product?.color,
                border: "1px solid black",
                borderRadius: 6,
                width: 60,
                height: 25,
              }}
            />
          </div>
        </div>
      </td>

      {/* Giá sau KM */}
      <td className="align-middle" style={{ width: 200 }}>
        <h6 className="fw-bold text-danger mb-0">
          <del className="text-dark me-1">
            {Intl.NumberFormat("en-US").format(product?.price)} VND
          </del>
        </h6>
      </td>

      {/* Tăng/giảm số lượng */}
      <td className="align-middle">
        <div
          className="d-flex align-items-center"
          style={{ marginLeft: 50, marginRight: 50 }}
        >
          <button
            onClick={handleDecrease}
            style={{ width: 35, borderRadius: 10 }}
          >
            -
          </button>
          <input
            value={quantity}
            className="ms-2 me-2 text-center"
            style={{ width: 35 }}
            min={0}
            readOnly
          />
          <button
            onClick={handleIncrease}
            style={{ width: 35, borderRadius: 10 }}
          >
            +
          </button>
        </div>
      </td>

      {/* Thành tiền */}
      <td className="align-middle" style={{ width: 200 }}>
        <h6 className="fw-bold text-danger mb-0">
          {Intl.NumberFormat("en-US").format(tongGia)} VND
        </h6>
      </td>

      {/* Xóa */}
      <td className="align-middle">
        <button
          className="btn btn-light p-2"
          style={{ borderRadius: 5 }}
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
