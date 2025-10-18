import { Button, Form, Modal, Space, Tag } from "antd";
import TextArea from "antd/es/input/TextArea";
import React, { useState } from "react";
import { useNavigate } from "react-router";
import { ToastContainer, toast } from "react-toastify";
import { HoaDonClientAPI } from "../../../pages/api/client/HoaDonClientAPI";
import { get } from "local-storage";
import { FormattedNumber, IntlProvider } from "react-intl";

const TabHistoryClient = ({ listBill = [] }) => {
  const nav = useNavigate();
  const [id, setId] = useState("");
  const storedData = get("userData") || {};
  const ten = storedData?.ten || "";
  const tenKH = "Khách hàng " + ten;

  const [formHuyHoaDon] = Form.useForm();
  const [isModalOpenHuyHoaDon, setIsModalHuyHoaDon] = useState(false);

  const handleOk = () => setIsModalHuyHoaDon(false);
  const handleCancel = () => setIsModalHuyHoaDon(false);

  const showModalHuyHoaDon = (id) => {
    setIsModalHuyHoaDon(true);
    setId(id);
  };
  const showHDCT = async (id, maHD) => {
    try {
      const res = await HoaDonClientAPI.SearchHDClient(maHD);
      const bill = Array.isArray(res?.data) ? res.data[0] : res?.data;
      const billId = bill?.idHD || bill?.id || bill?.hoaDonId || id; // fallback

      nav(`/home-hoa-don/${billId}`, { state: { hoaDon: bill } });
    } catch (err) {
      console.error("SearchHDClient error:", err);
      nav(`/home-hoa-don/${id}`);
    }
  };

  const handleHuyHoaDon = async (values) => {
    try {
      const res = await HoaDonClientAPI.detailSanPham(id);
      const items = Array.isArray(res?.data) ? res.data : [];
      await Promise.all(
        items.map((sp) =>
          HoaDonClientAPI.deleteInvoiceAndRollBackProduct(sp.idctsp, id)
        )
      );

      await HoaDonClientAPI.huyHoaDonQLHoaDon(id, tenKH, values);
      formHuyHoaDon.resetFields();
      setIsModalHuyHoaDon(false);

      toast("🦄 Hủy hóa đơn thành công!", {
        position: "top-right",
        autoClose: 3000,
        theme: "light",
      });

      nav(`/chi-tiet-don-hang/${id}`);
    } catch (e) {
      console.error("Hủy hóa đơn lỗi:", e);
      toast.error("Hủy hóa đơn thất bại!");
    }
  };

  const labelTrangThai = (st) => {
    const t = String(st);
    if (t === "0") return "Chờ xác nhận";
    if (t === "1") return "Xác nhận";
    if (t === "2") return "Chờ vận chuyển";
    if (t === "3") return "Đang vận chuyển";
    if (t === "4") return "Đã thanh toán";
    if (t === "5") return "Thành công";
    if (t === "-1") return "Đã hủy";
    if (t === "-2") return "Hoàn tiền";
    if (t === "10") return "Trả hàng";
    return "Chưa rõ";
  };

  return (
    <div className="container ">
      <div className="row pt-3 ">
        {listBill.map((item, index) => {
          const t = String(item.trangThai);
          const tagColor = t === "-1" || t === "10" ? "#cd201f" : "#108ee9";

          return (
            <div
              key={index}
              className="mb-5"
              style={{ backgroundColor: "#F3F2F2" }}
            >
              <div className="mb-5 pt-2">
                <span className="fs-6 fw-bolder">
                  Mã hóa đơn : <b>{item.ma}</b>
                </span>

                <Space className="float-end" size={[0, 8]} wrap>
                  <Tag color={tagColor}>
                    <span className={`trangThai ${" status_" + t} `}>
                      {labelTrangThai(t)}
                    </span>
                  </Tag>
                </Space>

                <br />

                <div>
                  {(item.hoaDonDetail ?? []).map((d, i) => (
                    <div
                      key={i}
                      className="row mt-3 "
                      style={{ borderTop: "1px solid #000" }}
                    >
                      <div className="col-md-2 mt-3 ps-4">
                        <img
                          style={{ width: 130, height: 140 }}
                          src={d.urlHA}
                          alt="Product"
                        />
                      </div>

                      <div className="col-md-6 ms-5 mt-3">
                        <h5>{d.tenSP} </h5>

                        <h6 className="text-danger">
                          {Number(d.giaGiam) > 0 ? (
                            <del>
                              {Intl.NumberFormat("vi-VN").format(
                                Number(d.giaBanSP) || 0
                              )}
                              {" VND"}
                            </del>
                          ) : null}
                        </h6>

                        <h6 className="text-danger">
                          {Intl.NumberFormat("vi-VN").format(
                            Number(d.thanhTienSP) || 0
                          )}
                          {" VND"}
                        </h6>

                        <h6>
                          {d.tenKichThuoc}-[{d.tenMauSac}]
                        </h6>
                        <h6>x{d.soLuongSP}</h6>
                      </div>

                      <div className="col-md-3" style={{ marginTop: 65 }}>
                        <h6 className="text-danger">
                          <IntlProvider locale="vi-VN">
                            <div>
                              <FormattedNumber
                                value={
                                  (Number(d.thanhTienSP) || 0) *
                                  (Number(d.soLuongSP) || 0)
                                }
                                currency="VND"
                                minimumFractionDigits={0}
                              />
                              {" VND"}
                            </div>
                          </IntlProvider>
                        </h6>
                      </div>
                    </div>
                  ))}

                  {/* thành tiền */}
                  <div
                    className=" mt-4 d-flex justify-content-end"
                    style={{ borderTop: "1px solid #000" }}
                  >
                    <h5 className="mt-4">Thành tiền :</h5>
                    <h5 className="mt-4 ms-3 text-danger">
                      <IntlProvider locale="vi-VN">
                        <div>
                          <FormattedNumber
                            value={Number(item.thanhTien) || 0}
                            currency="VND"
                            minimumFractionDigits={0}
                          />
                          {" VND"}
                        </div>
                      </IntlProvider>
                    </h5>
                  </div>

                  {/* nút */}
                  <div className=" mt-4 d-flex justify-content-end  ">
                    {(t === "0" || t === "1") && (
                      <Button
                        style={{
                          backgroundColor: "orangered",
                          color: "white",
                          width: 150,
                          height: 40,
                        }}
                        onClick={() => showModalHuyHoaDon(item.id)}
                      >
                        Hủy đơn
                      </Button>
                    )}

                    <Button
                      style={{
                        backgroundColor: "white",
                        width: 150,
                        height: 40,
                        marginLeft: 20,
                      }}
                      onClick={() => showHDCT(item.id, item.ma)}
                    >
                      Xem đơn hàng
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <Modal
        title="Nhập lý do hủy hóa đơn"
        footer={[]}
        open={isModalOpenHuyHoaDon}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form form={formHuyHoaDon} onFinish={handleHuyHoaDon}>
          <Form.Item
            name="moTaHoatDong"
            hasFeedback
            rules={[
              {
                required: true,
                message: "Vui lòng không để trống ghi chú!",
              },
            ]}
          >
            <TextArea rows={4} />
          </Form.Item>
          <Button
            style={{ marginLeft: 200 }}
            className="bg-success text-light"
            onClick={() => {
              Modal.confirm({
                title: "Thông báo",
                content: "Bạn có chắc chắn muốn tiếp tục?",
                onOk: () => {
                  formHuyHoaDon.submit();
                },
                footer: (_, { OkBtn, CancelBtn }) => (
                  <>
                    <CancelBtn />
                    <OkBtn />
                  </>
                ),
              });
            }}
          >
            Xác nhận
          </Button>
        </Form>
      </Modal>

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
};

export default TabHistoryClient;