package com.example.be.service.client;

import com.example.be.dto.request.HoaDonChiTietRequest;
import com.example.be.dto.request.HoaDonClientRequest;
import com.example.be.entity.*;
import com.example.be.repository.*;
import com.example.be.repository.SanPham.ChiTietSanPhamRepository;
import com.example.be.service.ThanhToanService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;
import java.util.Random;

@Service
@RequiredArgsConstructor
public class BanHangService {
    @Autowired
    HoaDonRepository hoaDonRepository;
    @Autowired
    ChiTietSanPhamRepository ctspRepository;
    @Autowired
    NguoiDungRepository nguoiDungRepository;
    @Autowired
    private DiaChiRepository diaChiRepository;
    @Autowired
    private HoaDonChiTietRepository hoaDonChiTietRepository;
    @Autowired
    private GioHangChiTietRepository gioHangChiTietRepository;
    @Autowired
    ThanhToanService thanhToanService;

    public Boolean createHoaDon(HoaDonClientRequest hoaDonRequest) {
        NguoiDung kh;
        if (hoaDonRequest.getIdUser() != "") {
            kh = this.nguoiDungRepository.findById(hoaDonRequest.getIdUser()).get();
        } else {
            kh = null;
        }

        HoaDon hoaDon = HoaDon.builder()
                .ma(hoaDonRequest.getMa())
                .nguoiDung(kh)
                .diaChi(hoaDonRequest.getDiaChi())
                .tenNguoiNhan(hoaDonRequest.getTenNguoiNhan())
                .ngayTao(LocalDateTime.now())
                .tienVanChuyen(hoaDonRequest.getTienShip())
                .email(hoaDonRequest.getEmail())
                .soDienThoai(hoaDonRequest.getSdt())
                .ngayMua(LocalDateTime.now())
                .ngayDuKienNhan(hoaDonRequest.getNgayDuKienNhan())
                .thanhTien(hoaDonRequest.getTongTien())
                .trangThai(0)
                .build();

        for (HoaDonChiTietRequest request : hoaDonRequest.getListHDCT()) {
            ChiTietSanPham spct = ctspRepository.findById(request.getIdCTSP()).get();
            if (spct.getSoLuong() < request.getSoLuong()) {
                return false;
            }
        }
        HoaDon saveHoaDon = hoaDonRepository.save(hoaDon);

        for (HoaDonChiTietRequest request : hoaDonRequest.getListHDCT()) {
            ChiTietSanPham spct = ctspRepository.findById(request.getIdCTSP()).get();
            ChiTietHoaDon hdct = ChiTietHoaDon.builder()
                    .chiTietSanPham(spct)
                    .soLuong(request.getSoLuong())
                    .donGia(request.getDonGia())
                    .trangThai(1)
                    .hoaDon(hoaDon)
                    .ngayTao(LocalDateTime.now())
                    .build();

            hoaDonChiTietRepository.save(hdct);
            spct.setSoLuong(spct.getSoLuong() - request.getSoLuong());
            if (spct.getSoLuong() == 0) {
                spct.setTrangThai(1);
            }
            ctspRepository.save(spct);
        }
        for (HoaDonChiTietRequest x : hoaDonRequest.getListHDCT()) {
                GioHangChiTiet gioHangChiTiet = gioHangChiTietRepository.listGHCTByIdGioHangAndSanPham(x.getIdGioHang(), x.getIdCTSP());
                System.out.println("gio hang: " + gioHangChiTiet.getId());
                if (gioHangChiTiet != null) {
                    gioHangChiTietRepository.deleteById(gioHangChiTiet.getId());
                }
        }

        ThanhToan thanhToanRequest = new ThanhToan();
        thanhToanRequest.setHoaDon(saveHoaDon);
        thanhToanRequest.setNgayTao(LocalDateTime.now());
        thanhToanRequest.setTongTien(saveHoaDon.getThanhTien().add(saveHoaDon.getTienVanChuyen()));
        System.out.println("Thanh toán requesst "+thanhToanRequest);
        if (hoaDonRequest.getIdPayMethod() == 0) {
            thanhToanRequest.setTienMat(saveHoaDon.getThanhTien().add(saveHoaDon.getTienVanChuyen()));
            thanhToanRequest.setPhuongThuc("Tiền mặt");
        } else {
            thanhToanRequest.setTongTien(saveHoaDon.getThanhTien().add(saveHoaDon.getTienVanChuyen()));
            thanhToanRequest.setPhuongThuc("Chuyển khoản");
            thanhToanRequest.setPhuongThucVNP(hoaDonRequest.getMaGiaoDich());
        }

        thanhToanService.thanhToan(thanhToanRequest);
        return true;
    }
    //xử lý số lượng sản phẩm
    public Map<String, Integer> getSLAndSLT(String idSP, String idHD){
        ChiTietSanPham ctsp=ctspRepository.getReferenceById(idSP);
        HoaDon hd=hoaDonRepository.findById(idHD).get();
        ChiTietHoaDon hdct=hoaDonChiTietRepository.getOneHDCT(hd.getId(),idSP);
        Integer soLuongTon = ctsp.getSoLuong();
        Integer soLuong    = hdct.getSoLuong();
        Map<String, Integer> result = new HashMap<>();
        result.put("soLuong", soLuong);
        result.put("soLuongTon", soLuongTon);
        return result;
    }
}
