package com.example.be.controller.SanPham;

import com.example.be.dto.request.admin.sanphamrequest.ThuocTinhRequest;
import com.example.be.dto.request.admin.sanphamrequest.ThuocTinhSearchRequest;
import com.example.be.service.SanPham.DanhMucService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;

@CrossOrigin("http://localhost:3000/")
@RestController
@RequestMapping("/admin/danh-muc")
@RequiredArgsConstructor
public class DanhMucController {
    @Autowired
    DanhMucService danhMucService;

    @GetMapping
    public ResponseEntity<?> getALLDM(){
        return  ResponseEntity.ok(danhMucService.getAllDanhMuc());
    }

    @PostMapping("/tim-kiem")
    public ResponseEntity<?> search(@RequestBody ThuocTinhSearchRequest bangConSearch){
        return ResponseEntity.ok(danhMucService.getTim(bangConSearch));
    }

    @GetMapping("/detail/{idDM}")
    public ResponseEntity<?> detail(@PathVariable("idDM") String id){
        return ResponseEntity.ok(danhMucService.detailDM(id));
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<?> update(@PathVariable("id") String id, @RequestBody ThuocTinhRequest request){
        return ResponseEntity.ok(danhMucService.update(id,request));
    }

    @PostMapping("/add")
    public ResponseEntity<?> add(@RequestBody ThuocTinhRequest v){
        int dmThem = danhMucService.getAllDanhMuc().size();
        v.setMa("DM" + "-" + (dmThem + 1));
        v.setNgayTao(LocalDateTime.now());
        return  ResponseEntity.ok(danhMucService.addDM(v));
    }
}

