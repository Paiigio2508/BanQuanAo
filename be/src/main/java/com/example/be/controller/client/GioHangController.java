package com.example.be.controller.client;

import com.example.be.entity.GioHang;
import com.example.be.service.client.GioHangService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/gio-hang")
@RequiredArgsConstructor
public class GioHangController {
    @Autowired
    GioHangService gioHangService;
    @GetMapping("/detailByKH/{idKH}")
    public ResponseEntity<?> detailGH(@PathVariable("idKH")String idKH){
        return ResponseEntity.ok(gioHangService.getGHByKH(idKH));
    }
    @PostMapping("/addGH")
    public ResponseEntity<?> addGH(@RequestBody GioHang request){
        return ResponseEntity.ok(gioHangService.addGioHang(request));
    }
}
