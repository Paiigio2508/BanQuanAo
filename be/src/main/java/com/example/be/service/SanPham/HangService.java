package com.example.be.service.SanPham;

import com.example.be.dto.repon.ThuocTinhRepo;
import com.example.be.dto.request.admin.sanphamrequest.ThuocTinhRequest;
import com.example.be.dto.request.admin.sanphamrequest.ThuocTinhSearchRequest;
import com.example.be.entity.Hang;
import com.example.be.repository.SanPham.HangRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class HangService {
    @Autowired
    HangRepository hangRepository;
    public List<ThuocTinhRepo> getAllHang() {
        return hangRepository.getAllHang();
    }
    public Hang update(String id, ThuocTinhRequest request) {
        Hang h = request.mapToEntity(new Hang());
        h.setId(id);
        return hangRepository.save(h);
    }

    public Hang detailH(String id){return hangRepository.findById(id).get();}

    public List<ThuocTinhRepo> getTim(ThuocTinhSearchRequest bangConSearch) {
        return hangRepository.timHang(bangConSearch);
    }

    public String addH(ThuocTinhRequest h){
        Hang hang = Hang.builder()
                .ma(h.getMa())
                .ten(h.getTen())
                .ngayTao(h.getNgayTao())
                .trangThai(0)
                .build();
        hangRepository.save(hang);
        return "Done";
    }
}
