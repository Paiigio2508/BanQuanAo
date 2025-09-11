package com.example.be.entity;

import com.example.be.entity.base.BaseEntity;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.*;
import lombok.experimental.SuperBuilder;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "hoa_don")
@Getter
@Setter
@ToString
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@SuperBuilder
public class HoaDon extends BaseEntity {
    @ManyToOne
    @JoinColumn(name = "id_nhan_vien",referencedColumnName = "id")
    private NguoiDung nhanVien;
    @ManyToOne
    @JoinColumn(name = "id_khach_hang",referencedColumnName = "id")
    private NguoiDung khachHang;
    private BigDecimal thanhTien;
    private LocalDateTime ngayMua;
    private String hinhThucThanhToan;
}
