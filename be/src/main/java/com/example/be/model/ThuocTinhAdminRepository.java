package com.example.be.model;


import org.springframework.beans.factory.annotation.Value;

public interface ThuocTinhAdminRepository {
    @Value("#{target.id}")
    String getId();

    @Value("#{target.ma}")
    String getMa();

    @Value("#{target.ten}")
    String getTen();

    @Value("#{target.trangThai}")
    String getTrangThai();
}
