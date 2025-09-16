package com.example.be.dto.request.admin;
import com.example.be.entity.NguoiDung;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class DangKyRequest {
    private String ten;
    private String email;
    private String matKhau;



    public NguoiDung map(NguoiDung nguoiDung) {
        nguoiDung.setTen(this.ten);
        nguoiDung.setEmail(this.email);
        nguoiDung.setMatKhau(this.matKhau);

        return nguoiDung;
    }
}
