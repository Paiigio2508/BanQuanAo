package com.example.be.dto.request;

import lombok.*;

import java.math.BigDecimal;

@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class HoaDonChiTietRequest {
    private String idCTSP;

    private BigDecimal donGia;

    private Integer soLuong;

   private String idGioHang;
}
