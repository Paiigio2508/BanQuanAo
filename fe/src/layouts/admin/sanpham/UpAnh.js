import React, { useState, useEffect } from 'react';
import { Upload, message } from 'antd';
import { PlusOutlined, CloseCircleOutlined } from '@ant-design/icons';
import axios from 'axios';
import './SanPham.css';
import { toast } from 'react-toastify';

const CloudinaryUpload = ({ linkAnhList = [], onLinkAnhChange }) => {
  const [localList, setLocalList] = useState(linkAnhList);

  useEffect(() => {
    setLocalList(linkAnhList); // đồng bộ khi tableData thay đổi
  }, [linkAnhList]);

  const beforeUpload = (file, fileList) => {
    const fileExtension = file.name.split('.').pop().toLowerCase();
    if (localList.length + fileList.length > 5) {
      toast.error('Tối đa 5 ảnh');
      return Upload.LIST_IGNORE;
    }
    return true;
  };

  const customRequest = async ({ file, onSuccess, onError }) => {
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', 'mishoes');

      const res = await axios.post(
        'https://api.cloudinary.com/v1_1/dtetgawxc/image/upload',
        formData
      );

      const url = res.data.secure_url;

      // dùng functional setState để tránh bị “đè” ảnh khi upload nhiều file
      setLocalList(prev => {
        const newList = [...prev, url];
        onLinkAnhChange(newList); // update tableData
        return newList;
      });

      onSuccess();
    } catch (err) {
      onError(err);
      message.error('Upload thất bại');
    }
  };

  const handleRemoveImage = index => {
    setLocalList(prev => {
      const newList = prev.filter((_, i) => i !== index);
      onLinkAnhChange(newList); // báo lại cho cha
      return newList;
    });
  };

  return (
  <div style={{ display: "flex", gap: "10px", alignItems: "center", flexWrap: "wrap" }}>
    <Upload
      customRequest={customRequest}
      listType="picture-card"
      showUploadList={false}
      beforeUpload={beforeUpload}
      multiple
      className="text-center"
    >
      {localList.length < 5 && (
        <div>
          <PlusOutlined style={{ fontSize: "32px", color: "#999" }} />
          <div style={{ marginTop: 8 }}>Upload</div>
        </div>
      )}
    </Upload>

    {localList.map((link, index) => (
      <div
        key={index}
        style={{
          position: "relative",
          width: 90,
          height: 90,
        }}
      >
        <img
          src={link}
          alt={`Ảnh ${index}`}
          width={90}
          height={90}
          style={{
            border: "1px solid black",
            borderRadius: "10px",
            objectFit: "cover",
          }}
        />
        <CloseCircleOutlined
          onClick={() => handleRemoveImage(index)}
          style={{
            position: "absolute",
            top: -6,
            right: -6,
            fontSize: 18,
            cursor: "pointer",
            backgroundColor: "white",
            borderRadius: "50%",
          }}
        />
      </div>
    ))}
  </div>
);

};

export default CloudinaryUpload;
