package com.example.be.service.SanPham;

import com.example.be.dto.repon.ThuocTinhRepo;
import com.example.be.dto.request.admin.sanphamrequest.ThuocTinhRequest;
import com.example.be.dto.request.admin.sanphamrequest.ThuocTinhSearchRequest;
import com.example.be.entity.GioiTinh;
import com.example.be.repository.SanPham.GioiTinhRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class GioiTinhService {
    @Autowired
    GioiTinhRepository gioiTinhRepository;
    public List<ThuocTinhRepo> getAllGioiTinh() {
        return gioiTinhRepository.getAllGioiTinh();
    }
    public GioiTinh update(String id, ThuocTinhRequest request) {
        GioiTinh gt = request.mapToEntity(new GioiTinh());
        gt.setId(id);
        return gioiTinhRepository.save(gt);
    }

    public GioiTinh detailGT(String id){return gioiTinhRepository.findById(id).get();}

    public List<ThuocTinhRepo> getTim(ThuocTinhSearchRequest bangConSearch) {
        return gioiTinhRepository.timGioiTinh(bangConSearch);
    }

    public String addGT(ThuocTinhRequest gt){
        GioiTinh gioiTinh = GioiTinh.builder()
                .ma(gt.getMa())
                .ten(gt.getTen())
                .ngayTao(gt.getNgayTao())
                .trangThai(0)
                .build();
        gioiTinhRepository.save(gioiTinh);
        return "Done";
    }
}
