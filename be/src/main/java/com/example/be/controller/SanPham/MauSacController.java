package com.example.be.controller.SanPham;
import com.example.be.dto.request.admin.sanphamrequest.ThuocTinhRequest;
import com.example.be.dto.request.admin.sanphamrequest.ThuocTinhSearchRequest;
import com.example.be.service.SanPham.MauSacService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;

@CrossOrigin("http://localhost:3000/")
@RestController
@RequestMapping("/admin/mau-sac")
@RequiredArgsConstructor
public class MauSacController {
    @Autowired
    MauSacService mauSacService;

    @GetMapping
    public ResponseEntity<?> getALLMS() {
        return  ResponseEntity.ok(mauSacService.getALLMS());
    }

    @GetMapping("/detail/{idMS}")
    public ResponseEntity<?> detail(@PathVariable("idMS") String id){
        return ResponseEntity.ok(mauSacService.detailMS(id));
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<?> update(@PathVariable("id") String id, @RequestBody ThuocTinhRequest request){
        return ResponseEntity.ok(mauSacService.update(id,request));
    }

    @PostMapping("/tim-kiem")
    public ResponseEntity<?> search(@RequestBody ThuocTinhSearchRequest bangConSearch){
        return ResponseEntity.ok(mauSacService.getTim(bangConSearch));
    }

    @PostMapping("/add")
    public ResponseEntity<?> add(@RequestBody ThuocTinhRequest v) {
        int msThem = mauSacService.getALL().size();
        v.setNgayTao(LocalDateTime.now());
        return ResponseEntity.ok(mauSacService.addMS(v));
    }
}
