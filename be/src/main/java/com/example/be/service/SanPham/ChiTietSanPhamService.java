package com.example.be.service.SanPham;

import com.example.be.dto.repon.ChiTietSanPhamRepo;
import com.example.be.dto.repon.DetailChiTietSanPhamRepo;
import com.example.be.dto.request.admin.sanphamrequest.ChiTietSanPhamRequest;
import com.example.be.dto.request.admin.sanphamrequest.ChiTietSanPhamSearchRequest;
import com.example.be.entity.ChiTietSanPham;
import com.example.be.repository.SanPham.ChiTietSanPhamRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDateTime;
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
    public DetailChiTietSanPhamRepo detailCTSP(String id){return chiTietSanPhamRepository.detailCTSP(id);}
    public ChiTietSanPham update(String id, ChiTietSanPhamRequest request) {
        ChiTietSanPham ctBanDau= chiTietSanPhamRepository.findById(id).get();
        ChiTietSanPham ct = request.map(new ChiTietSanPham());
        ct.setId(id);
        ct.setNgaySua(LocalDateTime.now());
        ct.setNgayTao(ctBanDau.getNgayTao());
        return chiTietSanPhamRepository.save(ct);
    }
    public List<ChiTietSanPhamRepo> getSearch(String idSP, ChiTietSanPhamSearchRequest ctspSearch){
        return chiTietSanPhamRepository.getTim(idSP,ctspSearch);
    }
}
