package com.example.be.dto.request.admin.sanphamrequest;
import com.example.be.entity.base.BaseEntityBangCon;
import lombok.*;
import java.time.LocalDateTime;
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ThuocTinhRequest {
    private String ma;
    private String ten;
    private LocalDateTime ngayTao;
    private LocalDateTime ngaySua;
    private int trangThai;


    public <T extends BaseEntityBangCon> T mapToEntity(T entity) {
        entity.setMa(this.ma);
        entity.setTen(this.ten);
        entity.setNgayTao(this.ngayTao);
        entity.setNgaySua(this.ngaySua);
        entity.setTrangThai(this.trangThai);
        System.out.println(entity.getMa());
        return entity;
    }
}

