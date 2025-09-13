package com.example.be.controller.SanPham;

import com.example.be.dto.request.admin.sanphamrequest.ThuocTinhRequest;
import com.example.be.dto.request.admin.sanphamrequest.ThuocTinhSearchRequest;
import com.example.be.service.SanPham.GioiTinhService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;

@CrossOrigin("http://localhost:3000/")
@RestController
@RequestMapping("/admin/gioi-tinh")
@RequiredArgsConstructor
public class GioiTinhController {
    @Autowired
    GioiTinhService gioiTinhService;

    @GetMapping
    public ResponseEntity<?> getALLGT(){
        return  ResponseEntity.ok(gioiTinhService.getAllGioiTinh());
    }

    @PostMapping("/tim-kiem")
    public ResponseEntity<?> search(@RequestBody ThuocTinhSearchRequest bangConSearch){
        return ResponseEntity.ok(gioiTinhService.getTim(bangConSearch));
    }

    @GetMapping("/detail/{idGT}")
    public ResponseEntity<?> detail(@PathVariable("idGT") String id){
        return ResponseEntity.ok(gioiTinhService.detailGT(id));
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<?> update(@PathVariable("id") String id, @RequestBody ThuocTinhRequest request){
        return ResponseEntity.ok(gioiTinhService.update(id,request));
    }

    @PostMapping("/add")
    public ResponseEntity<?> add(@RequestBody ThuocTinhRequest v){
        int clThem = gioiTinhService.getAllGioiTinh().size();
        v.setMa("GT" + "-" + (clThem + 1));
        v.setNgayTao(LocalDateTime.now());
        return  ResponseEntity.ok(gioiTinhService.addGT(v));
    }
}

