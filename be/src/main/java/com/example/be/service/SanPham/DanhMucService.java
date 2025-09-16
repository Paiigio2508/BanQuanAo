package com.example.be.service.SanPham;
import com.example.be.dto.repon.ThuocTinhRepo;
import com.example.be.dto.request.admin.sanphamrequest.ThuocTinhRequest;
import com.example.be.dto.request.admin.sanphamrequest.ThuocTinhSearchRequest;
import com.example.be.entity.DanhMuc;
import com.example.be.repository.SanPham.DanhMucRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DanhMucService {
    @Autowired
    DanhMucRepository danhMucRepository;
    public List<ThuocTinhRepo> getAllDanhMuc() {
        return danhMucRepository.getAllDanhMuc();
    }
    public DanhMuc update(String id, ThuocTinhRequest request) {
        DanhMuc dm = request.mapToEntity(new DanhMuc());
        dm.setId(id);
        return danhMucRepository.save(dm);
    }

    public DanhMuc detailDM(String id){return danhMucRepository.findById(id).get();}

    public List<ThuocTinhRepo> getTim(ThuocTinhSearchRequest bangConSearch) {
        return danhMucRepository.timDanhMuc(bangConSearch);
    }

    public String addDM(ThuocTinhRequest dm){
        DanhMuc danhMuc = DanhMuc.builder()
                .ma(dm.getMa())
                .ten(dm.getTen())
                .ngayTao(dm.getNgayTao())
                .trangThai(0)
                .build();
        danhMucRepository.save(danhMuc);
        return "Done";
    }
}
