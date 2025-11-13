package com.example.be.controller.client;

import com.example.be.dto.request.HoaDonClientRequest;
import com.example.be.service.ThanhToanService;
import com.example.be.service.client.BanHangService;
import com.example.be.util.vnp.PayService;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.util.Map;

@CrossOrigin("http://localhost:3000/")
@RestController
@RequestMapping("/ban-hang-client")
@RequiredArgsConstructor
public class BanHangClientController {
    @Autowired
    BanHangService banHangService;
    @Autowired
    PayService payService;
    @Value("${config.public-url:http://localhost:3000}")
    public String publicUrl;

    @PostMapping("/check-out")
    public  Boolean create(@RequestBody HoaDonClientRequest hoaDonClientRequest){
        return banHangService.createHoaDon(hoaDonClientRequest);
    }
    @PostMapping("/chuyen-khoan/{money}")
    public Map<String, String> createPayment(@PathVariable("money")String money) throws UnsupportedEncodingException {
        try {
            return payService.payWithVNPAY(money);
        } catch (UnsupportedEncodingException e) {
            throw new RuntimeException(e);
        }
    }
    @GetMapping("/payment-callback")
    public ResponseEntity<Boolean> paymentCallback(@RequestParam Map<String, String> queryParams, HttpServletResponse response) throws IOException {
        String vnp_ResponseCode = queryParams.get("vnp_ResponseCode");
        if ("00".equals(vnp_ResponseCode)) {
            response.sendRedirect(publicUrl + "/thanh-toan-thanh-cong");
            return ResponseEntity.ok(true);
        } else{
            response.sendRedirect( publicUrl + "/thanh-toan-that-bai");
        }
        return ResponseEntity.ok(false);
    }
}
