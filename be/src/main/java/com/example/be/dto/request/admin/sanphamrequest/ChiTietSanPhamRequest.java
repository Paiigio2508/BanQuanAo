package com.example.be.dto.request.admin.sanphamrequest;

import com.example.be.entity.*;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ChiTietSanPhamRequest {
    public String id;
    public String sanPham;
    public String gioiTinh;
    public String mauSac;
    public String kichThuoc;
    public String chatLieu;
    public String danhMuc;
    public String hang;
    public BigDecimal giaNhap;
    public BigDecimal giaBan;
    public String hinhAnh;
    public int soLuong;
    public String moTa;
    public LocalDateTime ngayTao;
    public LocalDateTime ngaySua;
    public int trangThai;

    public ChiTietSanPham map(ChiTietSanPham ctsp){
        ctsp.setId(this.id);
        ctsp.setSanPham(SanPham.builder().id(this.sanPham).build());
        ctsp.setGioiTinh(GioiTinh.builder().id(this.gioiTinh).build());
        ctsp.setMauSac(MauSac.builder().id(this.mauSac).build());
        ctsp.setKichThuoc(KichThuoc.builder().id(this.kichThuoc).build());
        ctsp.setChatLieu(ChatLieu.builder().id(this.chatLieu).build());
        ctsp.setDanhMuc(DanhMuc.builder().id(this.danhMuc).build());
        ctsp.setHang(Hang.builder().id(this.hang).build());
        ctsp.setGiaNhap(this.giaNhap);
        ctsp.setGiaBan(this.giaBan);
        ctsp.setHinhAnh(this.hinhAnh);
        ctsp.setSoLuong(this.soLuong);
        ctsp.setMoTa(this.moTa);
        ctsp.setNgayTao(this.ngayTao);
        ctsp.setNgaySua(this.ngaySua);
        ctsp.setTrangThai(this.trangThai);
        return ctsp;
    }
}
