package com.example.be.service;

import com.example.be.entity.ChiTietHoaDon;
import com.example.be.entity.ChiTietSanPham;
import com.example.be.repository.HoaDonChiTietRepository;
import com.example.be.repository.SanPham.ChiTietSanPhamRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class HoaDonChiTietService {
    @Autowired
    HoaDonChiTietRepository hoaDonChiTietRepository;

    @Autowired
    ChiTietSanPhamRepository ctspRepository;
    public void huyDonHang(String idCTSP,String idHD){
        ChiTietHoaDon hdct = hoaDonChiTietRepository.getHDCTByCTSPAndHD(idCTSP,idHD);
        System.out.println("Hóa đơn chi tiết"+hdct);
        ChiTietSanPham ctsp = ctspRepository.getReferenceById(idCTSP);
        int slt = ctsp.getSoLuong();
        int slh = hdct.getSoLuong();
        ctsp.setSoLuong(slt+slh);
        ctspRepository.save(ctsp);
    }
}
