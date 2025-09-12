package com.example.be.model;

import org.springframework.beans.factory.annotation.Value;

public interface NguoiDungAdminRepository {
    @Value("#{target.id}")
    String getId();

    @Value("#{target.ma}")
    String getMa();

    @Value("#{target.ten}")
    String getTen();

    @Value("#{target.anh}")
    String getAnh();

    @Value("#{target.gioiTinh}")
    String getGioiTinh();

    @Value("#{target.ngaySinh}")
    String getNgaySinh();

    @Value("#{target.soDienThoai}")
    String getSoDienThoai();

    @Value("#{target.email}")
    String getEmail();

    @Value("#{target.cccd}")
    String getCCCD();

    @Value("#{target.trangThai}")
    String getTrangThai();

}
