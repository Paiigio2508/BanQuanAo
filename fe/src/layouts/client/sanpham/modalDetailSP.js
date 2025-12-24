import { Button, Modal, Image, InputNumber } from "antd";
import React, { useState, useEffect, useMemo } from "react";
import { toast } from "react-toastify";
import { get, set } from "local-storage";
import { GioHangAPI } from "../../../pages/api/client/GioHangAPI";
import { useCart } from "../../client/giohang/CartContext";
import { HomeAPI } from "../../../pages/api/client/HomeAPI";

const ModalDetailSP = ({
  openModalDetailSP,
  setOpenModalDetailSP,
  productData,
  idCt,
  setidCTSP,
  idMS,
  idKT,
}) => {
  // state hooks
  const [productDetail, setProductDetail] = useState(null);
  const [largeImage, setLargeImage] = useState("");
  const [selectedMauSac, setSelectedMauSac] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [soLuong, setSoLuong] = useState(1);
  const [adding, setAdding] = useState(false);
  const [khachHang, setKhachHang] = useState(null);

  // read storedData ONCE (stable reference) — prevents useEffect retrigger
  const [storedData] = useState(() => get("userData"));
  const [storedGioHang] = useState(() => get("GioHang"));

  const { updateTotalQuantity } = useCart();

  /**
   * Fetch product detail when idCt changes OR when incoming preset ids (idMS/idKT)
   * We include idMS/idKT in deps so preset selection is applied when they change.
   */
  useEffect(() => {
    let cancelled = false;

    if (!idCt) {
      // clear previous detail when no id
      setProductDetail(null);
      setLargeImage("");
      setSelectedMauSac(null);
      setSelectedSize(null);
      return;
    }

    (async () => {
      try {
        const res = await HomeAPI.getProductDetailByCtsp(idCt);
        if (cancelled) return;
        const data = res.data;
        setProductDetail(data);

        // Apply preset color/size if provided
        if (idMS) {
          setSelectedMauSac(idMS);
          const color = data.colors?.find((c) => c.id === idMS);
          if (color?.images?.length > 0) {
            setLargeImage(color.images[0]);
          }
        } else {
          // nếu không preset màu, chọn màu đầu tiên có ảnh (tùy bạn)
          const firstColor = data.colors?.[0];
          if (firstColor) {
            setSelectedMauSac(firstColor.id);
            if (firstColor.images?.[0]) setLargeImage(firstColor.images[0]);
          }
        }

        if (idKT) {
          setSelectedSize(idKT);
        } else {
          // chọn size mặc định nếu cần (ví dụ size đầu tiên)
          const firstSize = data.sizes?.[0];
          if (firstSize) setSelectedSize(firstSize.id);
        }
      } catch (e) {
        console.error("loadProductDetail:", e);
      }
    })();

    // load stored user id once
    if (storedData) setKhachHang(storedData.userID);

    return () => {
      cancelled = true;
    };
    // include idCt, idMS, idKT; storedData is stable (useState) so no re-trigger
  }, [idCt, idMS, idKT, storedData]);

  /** Tìm variant theo màu + size (useMemo luôn được gọi) */
  const selectedVariant = useMemo(() => {
    if (!productDetail?.variants || !selectedMauSac || !selectedSize)
      return null;
    return (
      productDetail.variants.find(
        (v) => v.mauSacId === selectedMauSac && v.sizeId === selectedSize
      ) || null
    );
  }, [productDetail, selectedMauSac, selectedSize]);

  // if productData is required for rendering, return null AFTER hooks
  if (!productData) return null;

  const handleImageClick = (url) => setLargeImage(url);
  const handleClose = () => {
    setOpenModalDetailSP(false);
    setidCTSP("");
  };

  const soLuongTon = Number(productData.soLuong) || 0;
  const taoMa = (n = 6, c = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789") =>
    Array.from({ length: n }, () => c[(Math.random() * c.length) | 0]).join("");

  const getOrCreateCart = async (khachHang, stored) => {
    if (stored?.id) return stored;
    if (khachHang) {
      const r = await GioHangAPI.getByIDKH(khachHang);
      if (r?.data) return r.data;
      return (
        await GioHangAPI.addGH({ ma: taoMa(), nguoiDung: { id: khachHang } })
      ).data;
    }
    const t = await GioHangAPI.addGH({ ma: taoMa(), nguoiDung: null });
    set("GioHang", t?.data);
    return t?.data;
  };

const updateCartDetail = async (gioHangId, ctspId, soLuong, thanhTien) => {
  const r = await GioHangAPI.getAllGhctByIdGh(gioHangId);
  const cur = (r?.data || []).find((x) => x.idCTSP === ctspId);

  const soLuongHienCo = Number(cur?.soLuong ?? 0);
  const thanhTienHienCo = Number(cur?.thanhTien ?? 0);

  const soLuongThem = Number(soLuong ?? 0);
  const thanhTienThem = Number(thanhTien ?? 0);

  const soLuongMoi = soLuongHienCo + soLuongThem;
  const tienMoi = thanhTienHienCo + thanhTienThem;

  const body = {
    gioHang: { id: cur ? cur.idGioHang : gioHangId },
    chiTietSanPham: { id: ctspId },          // dùng ctspId
    soLuong: soLuongMoi,
    thanhTien: tienMoi,
    ...(cur && { id: cur.idGhct }),
  };
  return cur ? GioHangAPI.updateGHCT(body) : GioHangAPI.addGHCT(body);
};


const handleAddGioHang = async () => {
  try {
    if (!selectedVariant) {
      toast.error("Vui lòng chọn màu và size!");
      return;
    }

    if (Number(soLuong) > Number(selectedVariant.soLuong || 0)) {
      toast.error("Số lượng sản phẩm không đủ!");
      return;
    }

    const gh = await getOrCreateCart(
      storedData ? storedData.userID : null,
      storedGioHang
    );
    if (!gh?.id) throw new Error("Không xác định giỏ hàng.");

    const thanhTien = (selectedVariant.giaBan ?? productDetail?.giaBan) * soLuong;

    await updateCartDetail(gh.id, selectedVariant.id, soLuong, thanhTien);

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
      const items = (await GioHangAPI.getAllGhctByIdGh(cartId))?.data ?? [];
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
    >
      <div className="row">
        {/* Left */}
        <div className="col-md-6 text-center">
          <Image
            style={{ width: 450, height: 450 }}
            src={largeImage}
            alt="Large Product"
          />
          <div
            className="d-flex mt-2"
            style={{ gap: "8px", overflowX: "auto" }}
          >
            {productDetail?.colors
              ?.find((c) => c.id === selectedMauSac)
              ?.images?.map((url, i) => (
                <img
                  key={i}
                  style={{
                    width: 85,
                    height: 85,
                    cursor: "pointer",
                    border: "2px solid #ccc",
                    borderRadius: "6px",
                    padding: "1px",
                    flexShrink: 0,
                  }}
                  src={url}
                  alt={`thumb-${i}`}
                  onClick={() => handleImageClick(url)}
                />
              ))}
          </div>
        </div>

        {/* Right */}
        <div className="col-md-6">
          <h3>{productDetail?.ten}</h3>
          <h5 style={{ color: "red" }}>
            <span style={{ color: "black" }}>
              {Intl.NumberFormat("en-US").format(
                selectedVariant?.giaBan || productDetail?.giaBan || 0
              )}{" "}
              VND
            </span>
          </h5>

          <hr />
          <h6>Màu</h6>
          <div className="row">
            {productDetail?.colors?.map((c) => {
              const coHang = productDetail?.variants?.some(
                (v) => v.mauSacId === c.id && v.soLuong > 0
              );
              return (
                <div className="col-md-1" key={c.id}>
                  <Button
                    style={{
                      backgroundColor: c.ma,
                      borderRadius: 40,
                      width: 30,
                      height: 30,
                      border:
                        selectedMauSac === c.id
                          ? "2px solid #4096ff"
                          : "1px solid black",
                    }}
                    disabled={!coHang}
                    onClick={() => {
                      setSelectedMauSac(c.id);
                      if (c.images?.length > 0) setLargeImage(c.images[0]);
                    }}
                  />
                </div>
              );
            })}
          </div>

          <hr />
          <h6>Size</h6>
          <div className="row">
            {productDetail?.sizes
              ?.slice()
              .sort((a, b) => a.ten.localeCompare(b.ten, "vi"))
              .map((s) => {
                const variant = productDetail?.variants?.find(
                  (v) => v.mauSacId === selectedMauSac && v.sizeId === s.id
                );
                const hetHang = !variant || variant.soLuong <= 0;
                return (
                  <div className="col-md-1 me-2" key={s.id}>
                    <Button
                      style={{
                        borderRadius: 10,
                        width: 40,
                        height: 40,
                        border:
                          selectedSize === s.id
                            ? "1px solid #4096ff"
                            : "1px solid #d9d9d9",
                      }}
                      disabled={hetHang}
                      onClick={() => setSelectedSize(s.id)}
                    >
                      {s.ten}
                    </Button>
                  </div>
                );
              })}
          </div>

          <h6 className="mt-3">Số lượng</h6>
          <div className="row">
            <div className="col">
              <InputNumber
                min={1}
                max={selectedVariant?.soLuong || 1}
                value={soLuong}
                onChange={(val) => setSoLuong(val)}
              />
            </div>
            <div className="col">
              {selectedVariant?.soLuong ?? 0} sản phẩm có sẵn
            </div>
          </div>

          <Button className="mt-3" type="primary" onClick={handleAddGioHang}>
            Thêm vào giỏ hàng
          </Button>

          <hr />
          <h5>Mô tả sản phẩm:</h5>
          <p>
            ● Tên hãng: {productDetail?.tenHang} <br />● Giới tính:{" "}
            {productDetail?.tenGioiTinh} <br />● Danh mục:{" "}
            {productDetail?.tenDanhMuc} <br />● Chất liệu:{" "}
            {productDetail?.tenChatLieu} <br />● Mô tả: {productDetail?.moTa}
          </p>
        </div>
      </div>
    </Modal>
  );
};

export default ModalDetailSP;

// helper
function roundToThousands(amount) {
  const n = Number(amount) || 0;
  return Math.round(n / 1000) * 1000;
}
