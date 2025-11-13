package com.example.be.dto.repon;

import org.springframework.beans.factory.annotation.Value;

public interface ThongKeRepo {
    @Value("#{target.tongTienThongKe}")
    Float getTongTienThongKe();
    @Value("#{target.tongHoaDonThongKe}")
    int getTongHoaDonThongKe();
}
