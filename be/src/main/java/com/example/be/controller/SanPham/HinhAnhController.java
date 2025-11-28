package com.example.be.controller.SanPham;

import com.example.be.dto.request.admin.sanphamrequest.HinhAnhRequest;
import com.example.be.service.SanPham.HinhAnhService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin("http://localhost:3000/")
@RestController
@RequestMapping("/admin/hinhanh")
@RequiredArgsConstructor
public class HinhAnhController {
    @Autowired
    HinhAnhService hinhAnhService;
    @GetMapping("/{ten}/{idSP}")
    public ResponseEntity<?> detail(@PathVariable("ten") String ten, @PathVariable("idSP") String idSP){
        return ResponseEntity.ok(hinhAnhService.getAnhCTSP(ten,idSP));
    }
    @PostMapping("/add-anh/{idSP}")
    public ResponseEntity<?> upAnh(@RequestBody HinhAnhRequest ha, @PathVariable("idSP") String idSP){
        return ResponseEntity.ok(hinhAnhService.addAnhMoi(ha,idSP));
    }
    @DeleteMapping("/delete-anh/{idCTSP}")
    public ResponseEntity<?> deleteAnh(@PathVariable("idCTSP") String idCTSP){
        hinhAnhService.deleteAnh(idCTSP);
        return ResponseEntity.ok("Done");
    }
}
