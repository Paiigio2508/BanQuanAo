package com.example.be.controller.SanPham;

import com.example.be.dto.request.admin.sanphamrequest.ThuocTinhRequest;
import com.example.be.dto.request.admin.sanphamrequest.ThuocTinhSearchRequest;
import com.example.be.service.SanPham.KichThuocService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;

@CrossOrigin("http://localhost:3000/")
@RestController
@RequestMapping("/admin/kich-thuoc")
@RequiredArgsConstructor
public class KichThuocController {
    @Autowired
    KichThuocService kichThuocService;

    @GetMapping
    public ResponseEntity<?> getALLKT(){
        return  ResponseEntity.ok(kichThuocService.getAllKichThuoc());
    }

    @PostMapping("/tim-kiem")
    public ResponseEntity<?> search(@RequestBody ThuocTinhSearchRequest bangConSearch){
        return ResponseEntity.ok(kichThuocService.getTim(bangConSearch));
    }

    @GetMapping("/detail/{idKT}")
    public ResponseEntity<?> detail(@PathVariable("idKT") String id){
        return ResponseEntity.ok(kichThuocService.detailKT(id));
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<?> update(@PathVariable("id") String id, @RequestBody ThuocTinhRequest request){
        return ResponseEntity.ok(kichThuocService.update(id,request));
    }

    @PostMapping("/add")
    public ResponseEntity<?> add(@RequestBody ThuocTinhRequest v){
        int ktThem = kichThuocService.getAllKichThuoc().size();
        v.setMa("KT" + "-" + (ktThem + 1));
        v.setNgayTao(LocalDateTime.now());
        return  ResponseEntity.ok(kichThuocService.addKT(v));
    }
}

