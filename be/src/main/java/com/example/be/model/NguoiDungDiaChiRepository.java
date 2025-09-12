package com.example.be.model;

import org.springframework.beans.factory.annotation.Value;

public interface NguoiDungDiaChiRepository {
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

    // todo: address
    @Value("#{target.idDiaChi}")
    String getIdDiaChi();

    @Value("#{target.idThanhPho}")
    String getIDThanhPho();
    @Value("#{target.tenThanhPho}")
    String getTenThanhPho();

    @Value("#{target.idHuyen}")
    String getIDHuyen();
    @Value("#{target.tenhuyen}")
    String getTenHuyen();

    @Value("#{target.idXa}")
    String getIDXa();
    @Value("#{target.tenXa}")
    String getTenXa();

    @Value("#{target.diaChi}")
    String getDiaChi();
}
