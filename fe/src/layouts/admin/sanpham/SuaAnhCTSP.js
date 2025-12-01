import React, { useState, useEffect } from 'react';
import { CloseCircleOutlined, ExclamationCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { Image, Modal, Upload, message } from 'antd';
import { ChiTietSanPhamAPI } from '../../../pages/api/sanpham/ChiTietSanPham.api';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
const SuaAnhCTSP = ({ ten, idSP, onReload }) => {

  const [linkAnhList, setLinkAnhList] = useState([]);
  const loadAnhCTSP = async () => {
    ChiTietSanPhamAPI.getAnhCTSP(ten, idSP)
      .then((res) => {
        setLinkAnhList(res.data);
      })
  };

  const deleteAnhCTSP = async (idAnh) => {
    try {
      await ChiTietSanPhamAPI.deleteAnh(idAnh);
      setLinkAnhList((prevList) => prevList.filter((linkAnh) => linkAnh.id !== idAnh));
      message.success('Ảnh đã được xóa thành công.');
      if (onReload) {
        onReload();
      }
    } catch (error) {
      message.error('Xóa ảnh thất bại. Hãy thử lại.');
    }
  };

  const confirmDelete = (idAnh) => {
    Modal.confirm({
      centered: true,
      title: 'Xác nhận xóa ảnh',
      icon: <ExclamationCircleOutlined />,
      content: 'Bạn có chắc chắn muốn xóa ảnh này không?',
      okText: 'Xóa',
      okType: 'danger',
      cancelText: 'Hủy',
      onOk: () => deleteAnhCTSP(idAnh), // Xóa khi xác nhận
    });
  };

  const handleLinkClick = (e) => {
    e.preventDefault();
    const idAnh = e.currentTarget.dataset.id;
    confirmDelete(idAnh); // Hiển thị Modal xác nhận trước khi xóa
  };

  useEffect(() => {
    loadAnhCTSP();
  }, [ten, idSP]);

  const customRequest = async ({ file, onSuccess, onError }) => {
    try {
      // Gửi file lên Cloudinary
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', 'mishoes');
      const response = await axios.post(
        'https://api.cloudinary.com/v1_1/dtetgawxc/image/upload',
        formData
      );
      const imageUrl = response.data.secure_url;
      const imageObject = {
        ten: ten,
        url: imageUrl
      };
      ChiTietSanPhamAPI.addAnhTheoMau(idSP, imageObject)
        .then((res) => {
          setLinkAnhList((prevData) => [...prevData, res.data])
          toast.success('Thêm ảnh mới thành công!', {
            position: "top-right",
            autoClose: 2500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          if (onReload) {
            onReload();   // 👈 gọi reload CTSP ở cha
          }
        })
      onSuccess();
    } catch (error) {
      onError();
      message.error('Đã xảy ra lỗi trong quá trình upload.');
    }
  };

  const beforeUpload = (file, fileList) => {

    // Kiểm tra tổng số tệp để không vượt quá giới hạn
    if (linkAnhList.length + fileList.length > 5) {
      message.error('Bạn chỉ có thể tải lên tối đa 5 ảnh.');
      return false; // Ngăn chặn việc tải lên thêm
    }

    return true; // Cho phép tải lên nếu điều kiện thỏa mãn
  };
  const hasEmptySlot = linkAnhList.length < 5;
  return (
    <>
      <div
        style={{
          display: "flex",
          gap: "10px",
          alignItems: "flex-start",   // cho tất cả card nằm trên 1 hàng
        }}
      >
        {/* LIST ẢNH */}
        {linkAnhList.map((linkAnh, index) => (
          <div
            key={linkAnh.id || index}
            style={{
              position: "relative",
              width: 120,
              height: 120,
              border: "1px solid black",
              borderRadius: "10px",
              overflow: "hidden",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Image
              src={linkAnh.url}
              alt={`Ảnh ${index}`}
              width={110}
              height={110}
              style={{ objectFit: "cover" }}
            />

            {/* nút xoá ở góc trên bên phải */}
            <CloseCircleOutlined
              onClick={() => confirmDelete(linkAnh.id)}
              style={{
                position: "absolute",
                top: 4,
                right: 4,
                cursor: "pointer",
                fontSize: 16,
              }}
            />
          </div>
        ))}

        {/* Ô UPLOAD */}
        {hasEmptySlot && (
          <Upload
            customRequest={customRequest}
            listType="picture-card"
            showUploadList={false}
            beforeUpload={beforeUpload}
            multiple
            maxCount={4}
            style={{ width: 120, height: 120 }}   // cho cùng size với card ảnh
          >
            <div
              style={{
                width: "100%",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <PlusOutlined style={{ fontSize: 32, color: "#999" }} />
              <div style={{ marginTop: 8 }}>Upload</div>
            </div>
          </Upload>
        )}
      </div>

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
    </>
  );
};
export default SuaAnhCTSP;