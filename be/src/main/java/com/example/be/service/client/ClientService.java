package com.example.be.service.client;

import com.example.be.dto.repon.ChiTietSanPhamRepo;
import com.example.be.repository.SanPham.ChiTietSanPhamRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ClientService {
    @Autowired
    ChiTietSanPhamRepository chiTietSanPhamRepository;
    public List<ChiTietSanPhamRepo> getAllSanPham() {
        return chiTietSanPhamRepository.getALLCTSP(null);
    }
}
