package com.example.be.controller;

import com.example.be.dto.request.admin.HoaDonRequet;
import com.example.be.service.HoaDonService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin("http://localhost:3000/")
@RestController
@RequestMapping("/admin/hoa-don")
@RequiredArgsConstructor
public class HoaDonController {
    @Autowired
    private HoaDonService hoaDonService;
    @GetMapping
    public ResponseEntity<?> getALLTT() {
        return ResponseEntity.ok(hoaDonService.getALLTT());
    }
    @GetMapping("/detail-hoa-don/{idHD}")
    public ResponseEntity<?> detailHD(@PathVariable("idHD") String id){
        return  ResponseEntity.ok(hoaDonService.getByID(id));
    }
    @PutMapping("/updateTT/{idHD}")
    public  ResponseEntity<?> updateTrangThaiHoaDon(@RequestBody HoaDonRequet hoaDonRequet, @PathVariable("idHD") String id ){
        System.out.println(hoaDonRequet);
        return ResponseEntity.ok(hoaDonService.updateHoaDon(hoaDonRequet,id));
    }
    @GetMapping("/san-pham/{idHD}")
    public ResponseEntity<?> SanPhamHoaDon(@PathVariable("idHD") String id){
        return  ResponseEntity.ok(hoaDonService.detailHDSanPham(id));
    }
}
