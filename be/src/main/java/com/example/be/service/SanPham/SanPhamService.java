package com.example.be.service.SanPham;

import com.example.be.dto.repon.SanPhamRepo;
import com.example.be.dto.repon.ThuocTinhRepo;
import com.example.be.dto.request.admin.sanphamrequest.ThuocTinhRequest;
import com.example.be.dto.request.admin.sanphamrequest.ThuocTinhSearchRequest;
import com.example.be.entity.SanPham;

import com.example.be.repository.SanPham.SanPhamRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SanPhamService {
    @Autowired
    SanPhamRepository sanPhamRepository;
    public List<SanPham> getALL() {
        Sort sortByNgayTao = Sort.by(Sort.Direction.DESC, "ngayTao");
        return sanPhamRepository.findAll(sortByNgayTao);
    }
    public List<SanPhamRepo> getAllSanPham() {
        return sanPhamRepository.getALLSP();
    }

    public SanPham update(String id, ThuocTinhRequest request) {
        SanPham sp = request.mapToEntity(new SanPham());
        sp.setId(id);
        return sanPhamRepository.save(sp);
    }

    public SanPham detailSP(String id){return sanPhamRepository.findById(id).get();}

    public List<SanPhamRepo> getTim(ThuocTinhSearchRequest bangConSearch) {
        return sanPhamRepository.tim(bangConSearch);
    }

    public String addSP(ThuocTinhRequest sp){
        SanPham sanPham = SanPham.builder()
                .ma(sp.getMa())
                .ten(sp.getTen())
                .ngayTao(sp.getNgayTao())
                .trangThai(0)
                .build();
        sanPhamRepository.save(sanPham);
        return "Done";
    }

    public List<String>  getListMauSacBySanPhamID(String id){
        return sanPhamRepository.getListMauSacBySanPhamId(id);
    }

    public List<String>  getListKichThuocBySanPhamID(String id){
        return sanPhamRepository.getListKichThuocBySanPhamId(id);
    }
}