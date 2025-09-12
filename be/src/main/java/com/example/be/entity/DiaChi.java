package com.example.be.entity;

import com.example.be.entity.base.BaseEntity;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.*;
import lombok.experimental.SuperBuilder;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
@Table(name = "dia_chi")
@Entity
@Builder
public class DiaChi extends BaseEntity {
    @ManyToOne
    @JoinColumn(name = "id_nguoi_dung",referencedColumnName = "id")
    private NguoiDung nguoiDung;
    private String tenNguoiNhan;
    private String soDienThoai;
    private String diaChi;
    private String idXa;
    private Integer idHuyen;
    private Integer idThanhPho;
    private int idQuocGia;
    private String tenXa;
    private String tenHuyen;
    private String tenThanhPho;
    private String quocGia;
}
