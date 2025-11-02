package com.example.be.controller.client;

import com.example.be.entity.GioHangChiTiet;
import com.example.be.service.client.GioHangChiTietService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/gio-hang-chi-tiet")
@RequiredArgsConstructor
public class GioHangChiTietController {
    @Autowired
    GioHangChiTietService gioHangChiTietService;
    @GetMapping("/getAll/{idGH}")
    public ResponseEntity<?> getAllGHCT(@PathVariable("idGH") String idGH) {
        return ResponseEntity.ok(gioHangChiTietService.getAllGHCTByIdGH(idGH));
    }
    @PostMapping("/addGHCT")
    public ResponseEntity<?> addGHCT(@RequestBody GioHangChiTiet request){
        return ResponseEntity.ok(gioHangChiTietService.addGHCT(request));
    }
    @PostMapping("/updateGHCT")
    public ResponseEntity<?> updateGHCT(@RequestBody GioHangChiTiet request){
        return ResponseEntity.ok(gioHangChiTietService.updateGHCT(request));
    }
}
