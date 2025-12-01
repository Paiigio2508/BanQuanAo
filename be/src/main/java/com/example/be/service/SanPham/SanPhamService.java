package com.example.be.service.SanPham;

import com.example.be.dto.impldto.SanPhamDetailResponse;
import com.example.be.dto.repon.SanPhamRepo;
import com.example.be.dto.repon.ThuocTinhRepo;
import com.example.be.dto.request.admin.sanphamrequest.ThuocTinhRequest;
import com.example.be.dto.request.admin.sanphamrequest.ThuocTinhSearchRequest;
import com.example.be.entity.ChiTietSanPham;
import com.example.be.entity.SanPham;

import com.example.be.repository.SanPham.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class SanPhamService {
    @Autowired
    SanPhamRepository sanPhamRepository;
    @Autowired
    ChiTietSanPhamClientRepository chiTietSanPhamClientRepository;
    @Autowired
    private MauSacRepository mauSacRepository;
    @Autowired
    private HinhAnhRepository hinhAnhRepository;
    @Autowired
    private KichThuocRepository kichThuocRepository;

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
    public SanPhamDetailResponse getProductDetailByCtsp(String ctspId) {
        // 0) CTSP đại diện
        ChiTietSanPham ctsp0 = chiTietSanPhamClientRepository.findById(ctspId)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy CTSP"));
        String sanPhamId = ctsp0.getSanPham().getId();

        // 1) Màu + ảnh (gom ảnh từ tất cả CTSP thuộc mỗi màu)
        var colors = mauSacRepository.findBySanPhamId(sanPhamId)
                .stream()
                .map(ms -> {
                    List<String> ctspIds = chiTietSanPhamClientRepository
                            .findIdsBySanPhamAndMauSac(sanPhamId, ms.getId());
                    List<String> images = ctspIds.isEmpty()
                            ? List.of()
                            : hinhAnhRepository.findUrlsByCtspIds(ctspIds)
                            .stream().distinct().toList();
                    return new SanPhamDetailResponse.ColorResponse(
                            ms.getId(), ms.getTen(), ms.getMa(), images
                    );
                })
                .toList();

        // 2) Size (distinct theo sản phẩm)
        var sizes = kichThuocRepository.findBySanPhamId(sanPhamId)
                .stream()
                .map(kt -> new SanPhamDetailResponse.SizeResponse(kt.getId(), kt.getTen()))
                .toList();

        // 3) Toàn bộ CTSP của SP
        List<ChiTietSanPham> allCtsp = chiTietSanPhamClientRepository.findBySanPhamId(sanPhamId);

        // 4) Build variants (KHÔNG còn khuyến mại)
        var variants = allCtsp.stream()
                .map(v -> new SanPhamDetailResponse.VariantResponse(
                        v.getId(),
                        v.getMauSac()    != null ? v.getMauSac().getId()    : null,
                        v.getKichThuoc() != null ? v.getKichThuoc().getId() : null,
                        v.getGiaBan(),
                        v.getSoLuong()
                ))
                .toList();

        // 5) Trả DTO (meta từ CTSP đại diện)
        return new SanPhamDetailResponse(
                ctsp0.getSanPham().getId(),
                ctsp0.getSanPham().getTen(),
                ctsp0.getMoTa(),
                ctsp0.getHang()     != null ? ctsp0.getHang().getTen()     : null,
                ctsp0.getDanhMuc()  != null ? ctsp0.getDanhMuc().getTen()  : null,
                ctsp0.getChatLieu() != null ? ctsp0.getChatLieu().getTen() : null,
                ctsp0.getGioiTinh()   != null ? ctsp0.getGioiTinh().getTen()   : null,
                colors,
                sizes,
                variants
        );
    }


}