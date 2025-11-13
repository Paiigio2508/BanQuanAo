package com.example.be.dto.repon;

import java.math.BigDecimal;

public interface SanPhamBanChayRepo {
    String getIdSP();
    String getLinkAnh();
    String getTenSp();
    String getMauSac();
    String getKichThuoc();
    String getHang();
    BigDecimal getGiaBan();
    String getSoLuong();
}
