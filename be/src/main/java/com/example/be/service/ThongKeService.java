package com.example.be.service;

import com.example.be.dto.repon.BieuDoRepo;
import com.example.be.dto.repon.SanPhamBanChayRepo;
import com.example.be.dto.repon.ThongKeRepo;
import com.example.be.dto.repon.TrangThaiHoaDonRepo;
import com.example.be.repository.ThongKeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ThongKeService {
    @Autowired
    ThongKeRepository thongKeRepository;
    public ThongKeRepo thongKeTheoNgay(){
        return thongKeRepository.thongKeTheoNgay();
    }
    public  ThongKeRepo thongKeTheoThang(){
        return thongKeRepository.thongKeTheoThang();
    }
    public  ThongKeRepo thongKeTheoNam(){
        return thongKeRepository.thongKeTheoNam();
    }
    public  ThongKeRepo getDoanhThuNgayTruoc(){
        return thongKeRepository.doanhThuNgayTruoc();
    }
    public  ThongKeRepo getDoanhThuThangTruoc(){
        return thongKeRepository.doanhThuThangTruoc();
    }
    public  ThongKeRepo getDoanhThuNamTruoc(){
        return thongKeRepository.doanhThuNamTruoc();
    }
    public List<SanPhamBanChayRepo> getSpBanChayNgay(){return thongKeRepository.getSPBanChayNgay();}
    public List<SanPhamBanChayRepo> getSpBanChayThang(){return thongKeRepository.getSPBanChayThang();}
    public List<SanPhamBanChayRepo> getSpBanChayNam(){return thongKeRepository.getSPBanChayNam();}
    public List<SanPhamBanChayRepo> getSpBanSapHet(){return thongKeRepository.getSPSapHet();}
    public List<SanPhamBanChayRepo> getSpBanChayTuan(){return thongKeRepository.getSPBanChayTuan();}
    public List<BieuDoRepo> getBieuDoNgay(){
        return thongKeRepository.getBieuDoNgay();
    }
    public  List<BieuDoRepo> getBieuDoTuan(){
        return thongKeRepository.getBieuDoTuan();
    }
    public  List<BieuDoRepo> getBieuDoThang(){
        return thongKeRepository.getBieuDoThang();
    }
    public  List<BieuDoRepo> getBieuDoNam(){
        return thongKeRepository.getBieuDoNam();
    }
    public List<TrangThaiHoaDonRepo> getTrangThaiHoaDonNgay(){
        return thongKeRepository.getTrangThaiHoaDonNgay();
    }
    public List<TrangThaiHoaDonRepo> getTrangThaiHoaDonThang(){
        return thongKeRepository.getTrangThaiHoaDonThang();
    }
    public List<TrangThaiHoaDonRepo> getTrangThaiHoaDonNam(){
        return thongKeRepository.getTrangThaiHoaDonNam();
    }
    public List<TrangThaiHoaDonRepo> getTrangThaiHoaDonTuan(){
        return thongKeRepository.getTrangThaiHoaDonTuan();
    }
    public Integer getSPBanNgay(){
        return thongKeRepository.getSPBanNgay();
    }
    public Integer getSPBanNgayTruoc(){
        return thongKeRepository.getSPBanNgayTruoc();
    }}
