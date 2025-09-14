package com.example.be.entity;

import com.example.be.entity.base.BaseEntity;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.*;

import java.math.BigDecimal;

@Entity
@Table(name = "chi_tiet_san_pham")
@Getter
@Setter
@ToString
@NoArgsConstructor(access = AccessLevel.PUBLIC)
public class ChiTietSanPham  extends BaseEntity {
    @ManyToOne
    @JoinColumn(name = "san_pham_id")
    private SanPham sanPham;
    @ManyToOne
    @JoinColumn(name = "gioi_tinh_id")
    private GioiTinh gioiTinh;
    @ManyToOne
    @JoinColumn(name = "mau_sac_id")
    private MauSac mauSac;
    @ManyToOne
    @JoinColumn(name = "kich_thuoc_id")
    private KichThuoc kichThuoc;
    @ManyToOne
    @JoinColumn(name = "chat_lieu_id")
    private ChatLieu chatLieu;
    @ManyToOne
    @JoinColumn(name = "danh_muc_id")
    private DanhMuc danhMuc;
    @ManyToOne
    @JoinColumn(name = "hang_id")
    private Hang hang;
    private BigDecimal giaNhap;
    private BigDecimal giaBan;
    private String hinhAnh;
    private int soLuong;
    private String moTa;
}
