package com.example.be.dto.request.admin.sanphamrequest;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class ChiTietSanPhamSearchRequest {
    String idKT;
    String idMS;
    String idDM;
    String idGT;
    String idCL;
    String idH;
    int trangThaiCT;
    int soLuongBatDau;
    int soLuongKetThuc;
    int giaBanBatDau;
    int giaBanKetThuc;
}
