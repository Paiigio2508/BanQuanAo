package com.example.be.controller.client;

import com.example.be.dto.request.TrangThaiRequest;
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
@RequestMapping("/home")
@RequiredArgsConstructor
public class HoaDonClientController {
    @Autowired
    HoaDonService hoaDonService;
    @Autowired
    HoaDonChiTietService hoaDonChiTietService;
    // proflie lịch sử hóa đơn
    @PostMapping("/hoa-don")
    public ResponseEntity<?> getALLHoaDonOL(@RequestBody TrangThaiRequest request) {
        return ResponseEntity.ok(hoaDonService.getALLHDByIDKH(request));
    }
    @GetMapping("/detail-hoa-don/{idHD}")
    public ResponseEntity<?> detailHD33(@PathVariable("idHD") String id){
        return  ResponseEntity.ok(hoaDonService.getByID(id));
    }
    @GetMapping("/hoa-don/san-pham/{idHD}")
    public ResponseEntity<?> SanPhamHoaDon(@PathVariable("idHD") String id){
        return  ResponseEntity.ok(hoaDonService.detailHDSanPham(id));
    }
    @GetMapping("/tim-hoa-don/{ma}")
    public ResponseEntity<?> detailHD(@PathVariable("ma") String ma ) {
        return ResponseEntity.ok(hoaDonService.searchHDbyMa(ma));
    }
    @DeleteMapping("/delete-hoa-don-chi-tiet/{idCTSP}/{id}")
    public void  deleteHoaDonChiTiet (@PathVariable("idCTSP") String idCTSP,@PathVariable("id")String id) {
        hoaDonChiTietService.huyDonHang(idCTSP,id); //  roll backed
    }
    @PutMapping("/xoa-hoa-don/{id}/{tenKH}")
    public ResponseEntity<?> HuyHoaDonQuanLyHoaDon(@RequestBody HoaDonRequet hoaDonRequest, @PathVariable("id") String id, @PathVariable("tenKH") String tenKH) {
        HoaDon hoaDon=hoaDonService.findHoaDonbyID(id);
        hoaDon.setNgaySua(LocalDateTime.now());
        return  ResponseEntity.ok(hoaDonService.deleteHoaDon(hoaDonRequest,id));
    }
}
