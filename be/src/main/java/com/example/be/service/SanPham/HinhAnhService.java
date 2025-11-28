package com.example.be.service.SanPham;

import com.example.be.dto.request.admin.sanphamrequest.HinhAnhRequest;
import com.example.be.entity.HinhAnh;
import com.example.be.repository.SanPham.HinhAnhRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class HinhAnhService {
    @Autowired
    HinhAnhRepository hinhAnhRepository;
    public List<HinhAnh> getALL(){
        return hinhAnhRepository.findAll();
    }
    public HinhAnh add (HinhAnhRequest request){
        HinhAnh ha = request.map(new HinhAnh());
        return hinhAnhRepository.save(ha);
    }
    public HinhAnh addAnhMoi (HinhAnhRequest request, String idSP){
        int maAnh = getALL().size();
        request.setChiTietSanPham(idSP);
        request.setTrangThai(0);
        request.setNgayTao(LocalDateTime.now());
        request.setMa("HA-" + (maAnh + 1));
        HinhAnh ha = request.map(new HinhAnh());
        return hinhAnhRepository.save(ha);
    }
    public String deleteAnh (String idCTSP){
        hinhAnhRepository.deleteAnhCTSP(idCTSP);
        return "Done";
    }
    public List<HinhAnh> getAnhCTSP(String tenAnh, String idSP){
        return hinhAnhRepository.getAnhCTSP(tenAnh,idSP);
    }
}
