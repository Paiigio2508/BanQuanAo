package com.example.be.entity;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.SuperBuilder;

import java.math.BigDecimal;

@Entity
@Table(name = "gio_hang_chi_tiet")
@Getter
@Setter
@ToString
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@SuperBuilder
public class GioHangChiTiet {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;
    @ManyToOne
    @JoinColumn(name = "id_gio_hang",referencedColumnName = "id")
    private GioHang gioHang;
    @ManyToOne
    @JoinColumn(name = "id_chi_tiet_san_pham",referencedColumnName = "id")
    private ChiTietSanPham chiTietSanPham;
    private BigDecimal thanhTien;
    private int soLuong;
}
