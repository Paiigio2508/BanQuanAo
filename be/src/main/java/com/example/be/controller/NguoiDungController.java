package com.example.be.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin("http://localhost:3000/")
@RestController
@RequestMapping("/admin/khach-hang")
@RequiredArgsConstructor
public class NguoiDungController {
//    @GetMapping("/{id}")
//    public ResponseEntity<?> getById(@PathVariable("id") String id) {
//        return ResponseEntity.ok(khachHangService.getByID(id));
//    }
}
