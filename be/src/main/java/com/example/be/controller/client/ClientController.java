package com.example.be.controller.client;

import com.example.be.dto.request.admin.sanphamrequest.ChiTietSanPhamArraySearchRequest;
import com.example.be.service.KhachHangService;
import com.example.be.service.SanPham.HangService;
import com.example.be.service.SanPham.KichThuocService;
import com.example.be.service.SanPham.MauSacService;
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
    KhachHangService khachHangService;
    @GetMapping()
    public ResponseEntity<?> getALL() {
        return ResponseEntity.ok(clientService.getAllSanPham());
    }

    @PostMapping("/searchMang")
    public ResponseEntity<?> getLocSanPham(@RequestBody ChiTietSanPhamArraySearchRequest request) {
        return ResponseEntity.ok(clientService.getSearchListSanPham(request));
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

    @GetMapping("/dia-chi-mac-dinh/{idKH}")
    public  ResponseEntity<?> getDiaChiMacDinh(@PathVariable("idKH") String idKH){
        return ResponseEntity.ok(khachHangService.findDiaChiMacDinh(idKH));
    }
}
