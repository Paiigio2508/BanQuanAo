package com.example.be.dto.repon;

import org.springframework.beans.factory.annotation.Value;

public interface HoaDonRespon {
    String getIdHD();

    String getMa();

    String getMaNV();

    String getTenKH();

    String getSDT();
    String getHinhThucThanhToan();
    String getNgayMua();

    String getThanhTien();
    String getGhiChu();
    String getLoaiHD();
    String getTienVanChuyen();

    String getTrangThai();
    String getDiaChi();
    String getEmail();
    String getTenNguoiNhan();
    String getNgayDuKienNhan();
    String getPhuongThuc();
}
