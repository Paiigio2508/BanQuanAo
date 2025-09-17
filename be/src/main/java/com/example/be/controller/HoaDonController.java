package com.example.be.controller;

import com.example.be.service.HoaDonService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin("http://localhost:3000/")
@RestController
@RequestMapping("/admin/hoa-don")
@RequiredArgsConstructor
public class HoaDonController {
    @Autowired
    private HoaDonService hoaDonService;
    @GetMapping
    public ResponseEntity<?> getALLTT() {
        return ResponseEntity.ok(hoaDonService.getALLTT());
    }
}
