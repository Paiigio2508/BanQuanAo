package com.example.be.controller.client;

import com.example.be.dto.impldto.SanPhamDetailResponse;
import com.example.be.dto.request.admin.DiaChiRequest;
import com.example.be.dto.request.admin.sanphamrequest.ChiTietSanPhamArraySearchRequest;
import com.example.be.service.KhachHangService;
import com.example.be.service.SanPham.HangService;
import com.example.be.service.SanPham.KichThuocService;
import com.example.be.service.SanPham.MauSacService;
import com.example.be.service.SanPham.SanPhamService;
import com.example.be.service.client.ClientService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin("http://localhost:3000/")
@RestController
@RequestMapping("/home")
@RequiredArgsConstructor
public class ClientController {
    @Autowired
    ClientService clientService;
    @Autowired
    KichThuocService kichThuocService;
    @Autowired
    MauSacService mauSacService;
    @Autowired
    HangService hangService;
    @Autowired
    SanPhamService sanPhamService;
    @Autowired
    KhachHangService khachHangService;
    @GetMapping()
    public ResponseEntity<?> getALL() {
        return ResponseEntity.ok(clientService.getAllSanPham());
    }

    @PostMapping("/searchMang")
    public ResponseEntity<?> getLocSanPham(@RequestBody ChiTietSanPhamArraySearchRequest request) {
        return ResponseEntity.ok(clientService.getSearchListSanPham(request));
    }
    // detail
    @GetMapping("/san-pham-detail/{id}")
    public ResponseEntity<SanPhamDetailResponse> getDetail(@PathVariable("id") String id) {
        return ResponseEntity.ok(sanPhamService.getProductDetailByCtsp(id));
    }
    @GetMapping("/tim-kiem/{tenTim}")
    public ResponseEntity<?> getTimSanPham(@PathVariable("tenTim") String tenTim) {
        return ResponseEntity.ok(clientService.getTim(tenTim));
    }
    @GetMapping("/kich-thuoc")
    public ResponseEntity<?> getALLKT(){
        return  ResponseEntity.ok(kichThuocService.getAllKichThuoc());
    }

    @GetMapping("/hang")
    public ResponseEntity<?> getALLH(){
        return  ResponseEntity.ok(hangService.getAllHang());
    }

    @GetMapping("/mau-sac")
    public ResponseEntity<?> getALLMS(){
        return  ResponseEntity.ok(mauSacService.getALLMS());
    }
    @GetMapping("/khach-hang/dia-chi/{id}")
    public ResponseEntity<?> getALLDCbyKH(@PathVariable("id") String idKH){
        return ResponseEntity.ok(khachHangService.findDiaChiByKH(idKH));
    }
    @GetMapping("/khach-hang/dia-chi-mac-dinh/{id}")
    public  ResponseEntity<?> getDiaChiMacDinh(@PathVariable("id") String idKH){
        return ResponseEntity.ok(khachHangService.findDiaChiMacDinh(idKH));
    }
    @PostMapping("/khach-hang/add-dia-chi")
    public ResponseEntity<?> addDiaChi(@RequestBody DiaChiRequest request){
        System.out.println(request);
        return ResponseEntity.ok(khachHangService.addDiaChi(request));
    }
    @GetMapping("/khach-hang/detailDC/{id}")
    public ResponseEntity<?> detailDiaChi(@PathVariable("id")String id){
        return ResponseEntity.ok(khachHangService.detailDiaChi(id));
    }
    @PostMapping("/khach-hang/update-dia-chi/{id}")
    public ResponseEntity<?> updateDiaChi(@PathVariable("id")String id,@RequestBody DiaChiRequest request){
        return ResponseEntity.ok(khachHangService.updateDiaChi(id,request));
    }
    @PostMapping("/khach-hang/update-tt-dc/{id}")
    public ResponseEntity<?> updateTTDC(@PathVariable("id")String id){
        return ResponseEntity.ok(khachHangService.updateDiaChiMacDinh(id));
    }
}
