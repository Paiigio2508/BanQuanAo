package com.example.be.dto.repon;

import org.springframework.beans.factory.annotation.Value;

public interface ChiTietSanPhamRepo {
    String getIdCTSP();
    String getLinkAnh();
    String getTenSP();
    String getTenKT();
    String getTenMS();
    String getMaMS();
    String getMoTa();
    int getGiaBan();
    int getTrangThai();
    String getTenDM();
    String getTenCL();
    String getTenGT();
    String getTenHang();
    String getSoLuong();
}
