import React, {  useState } from "react";
import { Button } from "antd";
import "./productCard.css";
import ModalDetailSP from "./modalDetailSP";
export const ProductCard = ({ product }) => {

  const [openModalDetailSP, setOpenModalDetailSP] = useState(false);

  const [idCt, setidCTSP] = useState("");
  const detailCTSP = (row) => {
    setidCTSP(row);
    setOpenModalDetailSP(true);
  };
  return (
    <div className="cardProduct">
      <div className="imgBox">
        <img src={product.linkAnh} alt="mouse corsair" className="mouse" />
      </div>

      <div className="contentBox">
        <h3>
          {product.tenSP} {product.tenKichThuoc}
          <Button
            className="ms-2"
            styles={{ border: "1px solid black" }}
            shape="circle"
            style={{ backgroundColor: product.maMauSac }}
          />
        </h3>
        <h2 className="price">
          {Intl.NumberFormat("en-US").format(roundToThousands(product.giaBan))}
          <small> VND</small>
        </h2>
        <a
          href="#!"
          className="buy"
          onClick={(e) => {
            e.preventDefault(); // <-- tránh đổi hash/scroll
            detailCTSP(product.idCTSP);
          }}
        >
          Mua
        </a>
        <ModalDetailSP
          openModalDetailSP={openModalDetailSP}
          setOpenModalDetailSP={setOpenModalDetailSP}
          idCt={idCt}
          setidCTSP={setidCTSP}
          productData={product}
        />
      </div>
    </div>
  );
};
function roundToThousands(amount) {
  return Math.round(amount / 100) * 100;
}