package com.example.be.entity;

import com.example.be.entity.base.BaseEntity;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.*;
import lombok.experimental.SuperBuilder;

import java.math.BigDecimal;
import java.sql.Date;
import java.time.LocalDateTime;

@Entity
@Table(name = "hoa_don")
@Getter
@Setter
@ToString
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@SuperBuilder
public class HoaDon extends BaseEntity {
    private String ma;
    @ManyToOne
    @JoinColumn(name = "id_khach_hang")
    private NguoiDung nguoiDung;
    private LocalDateTime ngayMua;
    private BigDecimal thanhTien;
    private String tenNguoiNhan;
    private String soDienThoai;
    private String email;
    private String diaChi;
    private String ghiChu;
    private Date ngayDuKienNhan;
    private Date ngayNhanHang;
    private BigDecimal tienVanChuyen;
}
