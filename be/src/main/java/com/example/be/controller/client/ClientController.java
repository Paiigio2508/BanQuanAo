package com.example.be.controller.client;

import com.example.be.dto.request.admin.sanphamrequest.ChiTietSanPhamArraySearchRequest;
import com.example.be.service.client.ClientService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin("http://localhost:3000/")
@RestController
@RequestMapping("/home")
@RequiredArgsConstructor
public class ClientController {
    @Autowired
    ClientService clientService;
    @GetMapping()
    public ResponseEntity<?> getALL() {
        return ResponseEntity.ok(clientService.getAllSanPham());
    }

    @PostMapping("/searchMang")
    public ResponseEntity<?> getLocSanPham(@RequestBody ChiTietSanPhamArraySearchRequest request) {
        return ResponseEntity.ok(clientService.getSearchListSanPham(request));
    }

    @GetMapping("/tim-kiem/{tenTim}")
    public ResponseEntity<?> getTimSanPham(@PathVariable("tenTim") String tenTim) {
        return ResponseEntity.ok(clientService.getTim(tenTim));
    }
}
