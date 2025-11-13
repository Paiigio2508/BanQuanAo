package com.example.be.dto.request;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ChangePasswordRequest {
    private String matKhau; // mật khẩu hiện tại
    private String matKhauHienTai;     // mật khẩu mới
}
