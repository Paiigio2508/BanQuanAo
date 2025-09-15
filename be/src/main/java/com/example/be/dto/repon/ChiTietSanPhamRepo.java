package com.example.be.dto.repon;

import org.springframework.beans.factory.annotation.Value;

public interface ChiTietSanPhamRepo {
    @Value("#{target.idCTSP}")
    String getIdCTSP();
    @Value("#{target.linkAnh}")
    String getLinkAnh();
    @Value("#{target.tenSP}")
    String getTenSP();
    @Value("#{target.tenKT}")
    String getTenKichThuoc();
    @Value("#{target.tenMS}")
    String getTenMauSac();
    @Value("#{target.maMS}")
    String getMaMauSac();
    @Value("#{target.moTa}")
    String getMoTa();
    @Value("#{target.soLuong}")
    int getSoLuong();
    @Value("#{target.giaBan}")
    int getGiaBan();
    @Value("#{target.trangThai}")
    int getTrangThai();
    String getTenDM();
    String getTenCL();
    String getTenGT();
    String getTenHang();
}
