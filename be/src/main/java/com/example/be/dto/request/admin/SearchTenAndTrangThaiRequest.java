package com.example.be.dto.request.admin;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor

public class SearchTenAndTrangThaiRequest {
    String tenTimKiem;
    int trangThai;
}
