package com.example.be.controller.SanPham;

import com.example.be.dto.request.admin.sanphamrequest.ChiTietSanPhamRequest;
import com.example.be.entity.ChiTietSanPham;
import com.example.be.service.SanPham.ChiTietSanPhamService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;

@CrossOrigin("http://localhost:3000/")
@RestController
@RequestMapping("/admin/chi-tiet-san-pham")
@RequiredArgsConstructor
public class ChiTietSanPhamController {
    @Autowired
    private ChiTietSanPhamService chiTietSanPhamService;

    @GetMapping("/showct/{idSP}")
    public ResponseEntity<?> getALLCTSP(@PathVariable("idSP") String id) {
        return new ResponseEntity<>(chiTietSanPhamService.getCtspTheoIdSanPham(id), HttpStatus.OK);
    }

    @PostMapping("/add")
    public ResponseEntity<String> add(@RequestBody ChiTietSanPhamRequest request) {
        request.setGiaNhap(BigDecimal.valueOf(0));
        request.setTrangThai(0);
        request.setNgayTao(LocalDateTime.now());
        ChiTietSanPham newct = chiTietSanPhamService.add(request);
        return ResponseEntity.ok("Done");
    }
}
