package com.example.be.service;

import com.example.be.dto.repon.ChiTietSanPhamRepo;
import com.example.be.dto.repon.HoaDonRespon;
import com.example.be.dto.request.admin.HoaDonRequet;
import com.example.be.entity.HoaDon;
import com.example.be.repository.HoaDonRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class HoaDonService {
    @Autowired
    HoaDonRepository hoaDonRepository;

    public List<HoaDonRespon> getALLTT() {
        return hoaDonRepository.getALLHDTT();
    }
    public HoaDonRespon getByID(String id){
        return hoaDonRepository.detailHD(id);
    }
    public HoaDon updateHoaDon(HoaDonRequet hoaDonRequet,String id) {
        HoaDon hoaDon = hoaDonRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy hóa đơn"));

        int trangThaiHienTai = hoaDon.getTrangThai();
        // Giả sử trạng thái chỉ chạy từ 0 -> 4
        if (trangThaiHienTai < 4) {
            hoaDon.setGhiChu(hoaDonRequet.getGhiChu());
            hoaDon.setNguoiSua(hoaDonRequet.getMaNV());
            hoaDon.setNgaySua(LocalDateTime.now());
            hoaDon.setTrangThai(trangThaiHienTai + 1);
            return hoaDonRepository.save(hoaDon);
        } else {
            // Nếu đã tới trạng thái cuối thì không tăng nữa
            return hoaDon;
        }
    }
    public List<ChiTietSanPhamRepo> detailHDSanPham(String  key){
        return  hoaDonRepository.detailHDSanPham(key);
    }

}
