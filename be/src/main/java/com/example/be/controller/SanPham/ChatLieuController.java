package com.example.be.controller.SanPham;

import com.example.be.dto.request.admin.sanphamrequest.ThuocTinhRequest;
import com.example.be.dto.request.admin.sanphamrequest.ThuocTinhSearchRequest;
import com.example.be.service.SanPham.ChatLieuService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;

@CrossOrigin("http://localhost:3000/")
@RestController
@RequestMapping("/admin/chat-lieu")
@RequiredArgsConstructor
public class ChatLieuController {
    @Autowired
    ChatLieuService chatLieuService;

    @GetMapping
    public ResponseEntity<?> getALLCL(){
        return  ResponseEntity.ok(chatLieuService.getAllChatLieu());
    }

    @PostMapping("/tim-kiem")
    public ResponseEntity<?> search(@RequestBody ThuocTinhSearchRequest bangConSearch){
        return ResponseEntity.ok(chatLieuService.getTim(bangConSearch));
    }

    @GetMapping("/detail/{idCL}")
    public ResponseEntity<?> detail(@PathVariable("idCL") String id){
        return ResponseEntity.ok(chatLieuService.detailCL(id));
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<?> update(@PathVariable("id") String id, @RequestBody ThuocTinhRequest request){
        return ResponseEntity.ok(chatLieuService.update(id,request));
    }

    @PostMapping("/add")
    public ResponseEntity<?> add(@RequestBody ThuocTinhRequest v){
        int clThem = chatLieuService.getAllChatLieu().size();
        v.setMa("CL" + "-" + (clThem + 1));
        v.setNgayTao(LocalDateTime.now());
        return  ResponseEntity.ok(chatLieuService.addCL(v));
    }
}

