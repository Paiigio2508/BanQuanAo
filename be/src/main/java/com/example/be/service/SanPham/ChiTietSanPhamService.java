package com.example.be.service.SanPham;

import com.example.be.dto.repon.ChiTietSanPhamRepo;
import com.example.be.dto.request.admin.sanphamrequest.ChiTietSanPhamRequest;
import com.example.be.entity.ChiTietSanPham;
import com.example.be.repository.SanPham.ChiTietSanPhamRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ChiTietSanPhamService {
    @Autowired
    ChiTietSanPhamRepository chiTietSanPhamRepository;
    public List<ChiTietSanPhamRepo> getCtspTheoIdSanPham(String id){
        return chiTietSanPhamRepository.getALLCTSP(id);
    }
    public ChiTietSanPham add (ChiTietSanPhamRequest sp){
        ChiTietSanPham ct = sp.map(new ChiTietSanPham());
        return chiTietSanPhamRepository.save(ct);
    }
}
