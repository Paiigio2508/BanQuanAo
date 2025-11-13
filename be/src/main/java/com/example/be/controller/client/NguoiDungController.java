package com.example.be.controller.client;

import com.example.be.dto.request.admin.NguoiDungRequest;
import com.example.be.service.KhachHangService;
import com.google.gson.Gson;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin("http://localhost:3000/")
@RestController
@RequestMapping("/home/khach-hang")
@RequiredArgsConstructor
public class NguoiDungController {
    @Autowired
    KhachHangService khachHangService;
    @GetMapping("/{id}")
    public ResponseEntity<?> getById(@PathVariable("id") String id) {
        return ResponseEntity.ok(khachHangService.getByID(id));
    }
    @PutMapping()
    public ResponseEntity<?> update(@RequestParam("request") String request) {
        Gson gson = new Gson();
        NguoiDungRequest requestDto = gson.fromJson(request, NguoiDungRequest.class);
        return ResponseEntity.ok(khachHangService.update(requestDto));
    }
}
