package com.example.be.dto.request;

import lombok.*;

import java.math.BigDecimal;
import java.sql.Date;
import java.util.List;

@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class HoaDonClientRequest {
    private String ma;
    private BigDecimal tongTien;
    private BigDecimal tienShip;
    private String idUser;
    private String email;
    private String tenNguoiNhan;
    private String diaChi;
    private Date ngayDuKienNhan;
    private String sdt;
    private Integer idPayMethod;
    private String maGiaoDich;

    private List<HoaDonChiTietRequest> listHDCT;
}
