package com.example.be.service.client;

import com.example.be.dto.repon.GioHangChiTietRespon;
import com.example.be.entity.GioHangChiTiet;
import com.example.be.repository.GioHangChiTietRepository;
import com.example.be.repository.GioHangRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;

@Service
public class GioHangChiTietService {
    @Autowired
    GioHangRepository gioHangRepository;
    @Autowired
    GioHangChiTietRepository gioHangChiTietRepository;
    public List<GioHangChiTietRespon> getAllGHCTByIdGH(String idGH){
        return gioHangChiTietRepository.getAllGHCTByIDGH(idGH);
    }
    public GioHangChiTiet addGHCT(GioHangChiTiet ghct){
        return gioHangChiTietRepository.save(ghct);
    }
    public GioHangChiTiet updateGHCT(GioHangChiTiet request){
        GioHangChiTiet ghct=gioHangChiTietRepository.findById(request.getId()).get();
        ghct.setSoLuong(request.getSoLuong());
        ghct.setThanhTien(request.getThanhTien());
        return gioHangChiTietRepository.save(ghct);
    }
    public GioHangChiTiet deleteGHCT(String id){
        GioHangChiTiet ghct=gioHangChiTietRepository.findById(id).get();
        gioHangChiTietRepository.delete(ghct);
        return ghct;
    }
}
