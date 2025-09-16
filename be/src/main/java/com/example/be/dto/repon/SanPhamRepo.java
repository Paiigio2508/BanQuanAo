package com.example.be.dto.repon;

import java.time.LocalDateTime;

public interface SanPhamRepo {
    public String getId();
    public String getMa();
    public String getTen();
    public LocalDateTime getNgayTao();
    public LocalDateTime getNgaySua();
    public int getSoLuong();
    public int getTrangThai();
}
