package com.example.be.entity;

import com.example.be.entity.base.BaseEntity;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.*;
import lombok.experimental.SuperBuilder;
import java.time.LocalDateTime;

@Entity
@Table(name = "nguoi_dung")
@Getter
@Setter
@ToString
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@SuperBuilder
public class NguoiDung extends BaseEntity {
    private String ma;
    private String ten;
    private String email;
    private String sdt;
    private String anh;
    private String canCuocCongDan;
    private LocalDateTime ngaySinh;
    private LocalDateTime ngayThamGia;
    private String matKhau;
    private String chucVu;

}
