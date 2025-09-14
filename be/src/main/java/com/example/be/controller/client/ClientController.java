package com.example.be.controller.client;

import com.example.be.service.client.ClientService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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

}
