package com.example.be.controller.client;

import com.example.be.dto.request.TrangThaiRequest;
import com.example.be.service.HoaDonService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin("http://localhost:3000/")
@RestController
@RequestMapping("/home")
@RequiredArgsConstructor
public class HoaDonClientController {
    @Autowired
    HoaDonService hoaDonService;
    // proflie lịch sử hóa đơn
    @PostMapping("/hoa-don")
    public ResponseEntity<?> getALLHoaDonOL(@RequestBody TrangThaiRequest request) {
        return ResponseEntity.ok(hoaDonService.getALLHDByIDKH(request));
    }

    @GetMapping("/hoa-don/san-pham/{idHD}")
    public ResponseEntity<?> SanPhamHoaDon(@PathVariable("idHD") String id){
        return  ResponseEntity.ok(hoaDonService.detailHDSanPham(id));
    }
    @GetMapping("/tim-hoa-don/{ma}")
    public ResponseEntity<?> detailHD(@PathVariable("ma") String ma ) {
        return ResponseEntity.ok(hoaDonService.searchHDbyMa(ma));
    }

}
