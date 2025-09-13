package com.example.be.controller.SanPham;

import com.example.be.dto.request.admin.sanphamrequest.ThuocTinhRequest;
import com.example.be.dto.request.admin.sanphamrequest.ThuocTinhSearchRequest;
import com.example.be.service.SanPham.HangService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;

@CrossOrigin("http://localhost:3000/")
@RestController
@RequestMapping("/admin/hang")
@RequiredArgsConstructor
public class HangController {
    @Autowired
    HangService hangService;

    @GetMapping
    public ResponseEntity<?> getAllHang(){
        return  ResponseEntity.ok(hangService.getAllHang());
    }

    @PostMapping("/tim-kiem")
    public ResponseEntity<?> search(@RequestBody ThuocTinhSearchRequest bangConSearch){
        return ResponseEntity.ok(hangService.getTim(bangConSearch));
    }

    @GetMapping("/detail/{idH}")
    public ResponseEntity<?> detail(@PathVariable("idH") String id){
        return ResponseEntity.ok(hangService.detailH(id));
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<?> update(@PathVariable("id") String id, @RequestBody ThuocTinhRequest request){
        return ResponseEntity.ok(hangService.update(id,request));
    }

    @PostMapping("/add")
    public ResponseEntity<?> add(@RequestBody ThuocTinhRequest v){
        int hThem = hangService.getAllHang().size();
        v.setMa("H" + "-" + (hThem + 1));
        v.setNgayTao(LocalDateTime.now());
        return  ResponseEntity.ok(hangService.addH(v));
    }
}
