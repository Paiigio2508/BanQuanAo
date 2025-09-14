package com.example.be.service.SanPham;

import com.example.be.dto.repon.ThuocTinhRepo;
import com.example.be.dto.request.admin.sanphamrequest.ThuocTinhRequest;
import com.example.be.dto.request.admin.sanphamrequest.ThuocTinhSearchRequest;
import com.example.be.entity.KichThuoc;
import com.example.be.repository.SanPham.KichThuocRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class KichThuocService {
    @Autowired
    KichThuocRepository kichThuocRepository;
    public List<ThuocTinhRepo> getAllKichThuoc() {
        return kichThuocRepository.getALLKT();
    }
    public KichThuoc update(String id, ThuocTinhRequest request) {
        KichThuoc kt = request.mapToEntity(new KichThuoc());
        kt.setId(id);
        return kichThuocRepository.save(kt);
    }

    public KichThuoc detailKT(String id){return kichThuocRepository.findById(id).get();}

    public List<ThuocTinhRepo> getTim(ThuocTinhSearchRequest bangConSearch) {
        return kichThuocRepository.tim(bangConSearch);
    }

    public String addKT(ThuocTinhRequest kt){
        KichThuoc kichThuoc = KichThuoc.builder()
                .ma(kt.getMa())
                .ten(kt.getTen())
                .ngayTao(kt.getNgayTao())
                .trangThai(0)
                .build();
        kichThuocRepository.save(kichThuoc);
        return "Done";
    }
}