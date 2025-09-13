package com.example.be.controller.SanPham;

import com.example.be.dto.request.admin.sanphamrequest.ThuocTinhRequest;
import com.example.be.dto.request.admin.sanphamrequest.ThuocTinhSearchRequest;
import com.example.be.service.SanPham.SanPhamService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;

@CrossOrigin("http://localhost:3000/")
@RestController
@RequestMapping("/admin/san-pham")
@RequiredArgsConstructor
public class SanPhamController {
    @Autowired
    SanPhamService sanPhamService;

    @GetMapping
    public ResponseEntity<?> getALLSP(){
        return  ResponseEntity.ok(sanPhamService.getAllSanPham());
    }

    @PostMapping("/tim-kiem")
    public ResponseEntity<?> search(@RequestBody ThuocTinhSearchRequest bangConSearch){
        return ResponseEntity.ok(sanPhamService.getTim(bangConSearch));
    }

    @GetMapping("/detail/{idSP}")
    public ResponseEntity<?> detail(@PathVariable("idSP") String id){
        return ResponseEntity.ok(sanPhamService.detailSP(id));
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<?> update(@PathVariable("id") String id, @RequestBody ThuocTinhRequest request){
        return ResponseEntity.ok(sanPhamService.update(id,request));
    }

    @PostMapping("/add")
    public ResponseEntity<?> add(@RequestBody ThuocTinhRequest v){
        int spThem = sanPhamService.getAllSanPham().size();
        v.setMa("SP" + "-" + (spThem + 1));
        v.setNgayTao(LocalDateTime.now());
        return  ResponseEntity.ok(sanPhamService.addSP(v));
    }
}

