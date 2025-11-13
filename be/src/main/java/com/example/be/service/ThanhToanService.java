package com.example.be.service;

import com.example.be.entity.ThanhToan;
import com.example.be.repository.HoaDonRepository;
import com.example.be.repository.NguoiDungRepository;
import com.example.be.repository.ThanhToanRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.thymeleaf.context.Context;
import org.thymeleaf.spring6.SpringTemplateEngine;

import java.util.List;

@Service
public class ThanhToanService {

    @Autowired
    ThanhToanRepository thanhToanRepository;

    @Value("${config.public-url:http://localhost:3000}")
    private String publicUrl;

    public ThanhToan thanhToan(ThanhToan request) {
        return thanhToanRepository.save(request);
    }
    public List<ThanhToan> getThanhToanByIdHD(String idHD) {
        return thanhToanRepository.getThanhToanByIdHD(idHD);
    }

    public ThanhToan save(ThanhToan tt) {
        return thanhToanRepository.save(tt);
    }

}
