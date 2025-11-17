package com.example.be.controller;

import com.example.be.dto.request.admin.HoaDonRequet;
import com.example.be.entity.HoaDon;
import com.example.be.service.HoaDonChiTietService;
import com.example.be.service.HoaDonService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;

@CrossOrigin("http://localhost:3000/")
@RestController
@RequestMapping("/admin/hoa-don")
@RequiredArgsConstructor
public class HoaDonController {
    @Autowired
    private HoaDonService hoaDonService;
    @Autowired
    private HoaDonChiTietService hoaDonChiTietService;
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
        return ResponseEntity.ok(hoaDonService.updateHoaDon(hoaDonRequet,id));
    }
    @GetMapping("/san-pham/{idHD}")
    public ResponseEntity<?> SanPhamHoaDon(@PathVariable("idHD") String id){
        return  ResponseEntity.ok(hoaDonService.detailHDSanPham(id));
    }
    @DeleteMapping("/delete-hoa-don-chi-tiet/{idCTSP}/{id}")
    public void  deleteHoaDonChiTiet (@PathVariable("idCTSP") String idCTSP,@PathVariable("id")String id) {
        hoaDonChiTietService.huyDonHang(idCTSP,id); //  roll backed
    }
    @PutMapping("/xoa-hoa-don/{id}/{maNV}")
    public ResponseEntity<?> HuyHoaDonQuanLyHoaDon(@RequestBody HoaDonRequet hoaDonRequest, @PathVariable("id") String id, @PathVariable("maNV") String maNV) {
        HoaDon hoaDon=hoaDonService.findHoaDonbyID(id);
        hoaDon.setNgaySua(LocalDateTime.now());
        return  ResponseEntity.ok(hoaDonService.deleteHoaDon(hoaDonRequest,id));
    }
}
