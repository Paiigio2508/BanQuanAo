package com.example.be.service.SanPham;

import com.example.be.dto.repon.ThuocTinhRepo;
import com.example.be.dto.request.admin.sanphamrequest.ThuocTinhRequest;
import com.example.be.dto.request.admin.sanphamrequest.ThuocTinhSearchRequest;
import com.example.be.entity.MauSac;
import com.example.be.repository.SanPham.MauSacRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class MauSacService {
    @Autowired
    MauSacRepository mauSacRespository;

    public List<MauSac> getALL(){
        return mauSacRespository.findAll();
    }
    public List<ThuocTinhRepo> getALLMS(){
        return mauSacRespository.getALLMS();
    }

    public MauSac update(String id, ThuocTinhRequest request) {
        MauSac msFirst = mauSacRespository.findById(id).get();
        MauSac ms = request.mapToEntity(new MauSac());
        ms.setNgayTao(msFirst.getNgayTao());
        ms.setNgaySua(LocalDateTime.now());
        ms.setId(id);
        return mauSacRespository.save(ms);
    }

    public MauSac detailMS(String id){return mauSacRespository.findById(id).get();}

    public List<ThuocTinhRepo> getTim(ThuocTinhSearchRequest bangConSearch) {
        return mauSacRespository.tim(bangConSearch);
    }

    public String addMS(ThuocTinhRequest ms){
        MauSac mauSac = MauSac.builder()
                .ma(ms.getMa())
                .ten(ms.getTen())
                .ngayTao(LocalDateTime.now())
                .trangThai(0)
                .build();
        mauSacRespository.save(mauSac);
        return "Done";}
}
