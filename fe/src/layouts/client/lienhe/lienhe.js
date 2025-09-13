import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

export const LienHe = ({ children }) => {
     const [form, setForm] = useState({
       full_name: "",
       phone: "",
       title: "",
       content: "",
     });
     const [submitting, setSubmitting] = useState(false);

     const handleChange = (e) => {
       const { name, value } = e.target;
       setForm((p) => ({ ...p, [name]: value }));
     };

     const handleSubmit = async (e) => {
       e.preventDefault();
       // TODO: có thể thêm validate VN phone ở đây nếu cần
       try {
         setSubmitting(true);
         const res = await fetch("/contact/send-info", {
           method: "POST",
           headers: { "Content-Type": "application/json" },
           body: JSON.stringify(form),
         });
         if (!res.ok) throw new Error("Gửi thất bại");
         alert("Đã gửi thông tin. Cảm ơn bạn!");
         setForm({ full_name: "", phone: "", title: "", content: "" });
       } catch (err) {
         alert(err.message || "Có lỗi xảy ra");
       } finally {
         setSubmitting(false);
       }
     };
  return (
    <div className="container-fuild">
      <div className="banner-san-pham-shop mt-4">
        <img
          src="https://png.pngtree.com/background/20210715/original/pngtree-white-gray-wave-abstract-background-soft-design-graphic-banner-background-picture-image_1298688.jpg"
          alt="Logo Banner"
        />
        <h1 className="banner-title-logo">Liên hệ</h1>
      </div>
      <div className="mt-5" data-block="ofuceim">
        <div className="contact-info mb-5 container">
          <div className="row">
            <div className="col-lg-4 col-sm-4 col-12 mb-5">
              <div className="d-flex align-items-center border rounded h-100 p-3 p-lg-4">
                <i className="fa-light fa-phone display-3" />
                <div className="ml-3">
                  <strong>Hotline:</strong>
                  <br />
                  1900 6680 - 09011916
                </div>
              </div>
            </div>

            <div className="col-lg-4 col-sm-4 col-12 mb-5">
              <div className="d-flex align-items-center border rounded h-100 p-3 p-lg-4">
                <i className="fa-light fa-envelope display-3" />
                <div className="ml-3">
                  <strong>Email:</strong>
                  <br />
                  contact@sm4s.vn
                </div>
              </div>
            </div>

            <div className="col-lg-4 col-sm-4 col-12 mb-5">
              <div className="d-flex align-items-center border rounded h-100 p-3 p-lg-4">
                <i className="fa-light fa-location-dot display-3" />
                <div className="ml-3">
                  <strong>Địa chỉ:</strong>
                  <br />
                  Tầng 4, Nam Từ Liêm, Hà Nội
                </div>
              </div>
            </div>
          </div>
        </div>

        <h6 className="mb-5 font-weight-normal text-center color-highlight display-4">
          Để lại thông tin của bạn
        </h6>

        <div className="row justify-content-center">
          <div className="col-md-6 col-lg-6">
            <form onSubmit={handleSubmit} autoComplete="off" noValidate>
              <div className="form-group">
                <input
                  name="full_name"
                  type="text"
                  className="form-control border rounded"
                  required
                  placeholder="Họ và tên"
                  value={form.full_name}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group mt-2">
                <input
                  name="phone"
                  type="text"
                  className="form-control border rounded"
                  required
                  placeholder="Số điện thoại"
                  value={form.phone}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group mt-2">
                <input
                  name="title"
                  type="text"
                  className="form-control border rounded"
                  required
                  placeholder="Tiêu đề"
                  value={form.title}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group mt-2">
                <textarea
                  name="content"
                  maxLength={500}
                  className="form-control border rounded"
                  required
                  placeholder="Nội dung"
                  rows={5}
                  value={form.content}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group mt-2 text-center">
                <button className="btn btn-primary" type="submit">
                  {submitting ? "Đang gửi..." : "Gửi tin nhắn"}
                </button>
              </div>
            </form>
          </div>

          <div className="col-12 col-lg-6">
            <div className="entire-map mt-md-0 mt-5" style={{ minHeight: 300 }}>
              <iframe
                title="Bản đồ"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3725.7484136612757!2d105.74611147447911!3d20.962616190048657!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x313452efff394ce3%3A0x391a39d4325be464!2zVHLGsOG7nW5nIMSQ4bqhaSBI4buNYyBQaGVuaWthYQ!5e0!3m2!1svi!2s!4v1757766584521!5m2!1svi!2s"
                width="100%"
                height="100%"
                frameBorder="0"
                style={{ border: 0, minHeight: 300 }}
                allowFullScreen
                ariaHidden="false"
                tabIndex={0}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
