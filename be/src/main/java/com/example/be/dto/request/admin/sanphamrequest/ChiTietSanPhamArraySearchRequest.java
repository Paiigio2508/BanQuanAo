package com.example.be.dto.request.admin.sanphamrequest;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class ChiTietSanPhamArraySearchRequest {
    String[] arrayHang;
    String[] arrayMauSac;
    String[] arrayKichThuoc;
    int giaBatDau;
    int giaKetThuc;
}
