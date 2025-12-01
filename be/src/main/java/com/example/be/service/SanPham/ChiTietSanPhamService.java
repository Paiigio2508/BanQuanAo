package com.example.be.service.SanPham;

import com.example.be.dto.repon.AddChiTietSanPhamRepo;
import com.example.be.dto.repon.ChiTietSanPhamRepo;
import com.example.be.dto.repon.DetailChiTietSanPhamRepo;
import com.example.be.dto.request.admin.sanphamrequest.ChiTietSanPhamRequest;
import com.example.be.dto.request.admin.sanphamrequest.ChiTietSanPhamSearchRequest;
import com.example.be.dto.request.admin.sanphamrequest.HinhAnhRequest;
import com.example.be.entity.ChiTietSanPham;
import com.example.be.repository.SanPham.ChiTietSanPhamRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
public class ChiTietSanPhamService {
    @Autowired
    ChiTietSanPhamRepository chiTietSanPhamRepository;
    @Autowired
    HinhAnhService hinhAnhService;
    public List<ChiTietSanPhamRepo> getCtspTheoIdSanPham(String id){
        return chiTietSanPhamRepository.getALLCTSP(id);
    }
    public List<AddChiTietSanPhamRepo> getAllCtsp(){
        return chiTietSanPhamRepository.getALL();
    }
    public ChiTietSanPham add (ChiTietSanPhamRequest request, HinhAnhRequest ha){
        request.setGiaNhap(BigDecimal.valueOf(0));
        request.setTrangThai(0);
        request.setNgayTao(LocalDateTime.now());
        ArrayList<String> listLink = request.getLinkAnh();
        ChiTietSanPham ct = request.map(new ChiTietSanPham());
        ChiTietSanPham saved = chiTietSanPhamRepository.save(ct);
        for (String link : listLink) {
            int maAnh = hinhAnhService.getALL().size();
            ha.setTrangThai(0);
            ha.setMa("HA-" + (maAnh + 1));
            ha.setChiTietSanPham(ct.getId());
            ha.setTen(ct.getMauSac().getId());
            ha.setUrl(link);
            ha.setNgayTao(LocalDateTime.now());
            hinhAnhService.add(ha);
        }
        return saved;
    }
    public DetailChiTietSanPhamRepo detailCTSP(String id){return chiTietSanPhamRepository.detailCTSP(id);}
    public ChiTietSanPham update(String id, ChiTietSanPhamRequest request) {
        ChiTietSanPham ctBanDau= chiTietSanPhamRepository.findById(id).get();
        ChiTietSanPham ct = request.map(new ChiTietSanPham());
        ct.setTenCt(ct.getSanPham().getTen() + " - " +"["+ct.getKichThuoc().getTen()+" "+ct.getMauSac().getTen()+"]");
        ct.setId(id);
        ct.setHinhAnh(ctBanDau.getHinhAnh());
        ct.setNgayTao(ctBanDau.getNgayTao());
        ct.setNgaySua(LocalDateTime.now());
        ct.setGiaNhap(ctBanDau.getGiaNhap());
        return chiTietSanPhamRepository.save(ct);
    }
    public List<ChiTietSanPhamRepo> getSearch(String idSP, ChiTietSanPhamSearchRequest ctspSearch){
        return chiTietSanPhamRepository.getTim(idSP,ctspSearch);
    }
}
