package com.example.be.service.client;

import com.example.be.dto.repon.ChiTietSanPhamRepo;
import com.example.be.dto.request.admin.sanphamrequest.ChiTietSanPhamArraySearchRequest;
import com.example.be.repository.SanPham.ChiTietSanPhamClientRepository;
import com.example.be.repository.SanPham.ChiTietSanPhamRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ClientService {
    @Autowired
    ChiTietSanPhamRepository chiTietSanPhamRepository;
    @Autowired
    ChiTietSanPhamClientRepository chiTietSanPhamClientRepository;
    public List<ChiTietSanPhamRepo> getAllSanPham() {
        return chiTietSanPhamRepository.getALLCTSP(null);
    }

    public List<ChiTietSanPhamRepo> getSearchListSanPham(ChiTietSanPhamArraySearchRequest sp) {

        if(sp.getArrayHang().length>0 && sp.getArrayMauSac().length<=0 && sp.getArrayKichThuoc().length<=0){
            return chiTietSanPhamClientRepository.getLocSanPham(sp);
        }
        if(sp.getArrayHang().length>0 && sp.getArrayMauSac().length>0 && sp.getArrayKichThuoc().length<=0){
            return chiTietSanPhamClientRepository.getLocSanPhamMauSac(sp);
        }
        if(sp.getArrayHang().length>0 && sp.getArrayMauSac().length<=0 && sp.getArrayKichThuoc().length>0){
            System.out.println(sp);
            return chiTietSanPhamClientRepository.getLocSanPhamKichThuoc(sp);
        }
        if(sp.getArrayHang().length<=0 && sp.getArrayMauSac().length>0 && sp.getArrayKichThuoc().length<=0){
            return chiTietSanPhamClientRepository.getLocMauSac(sp);
        }
        if(sp.getArrayHang().length<=0 && sp.getArrayMauSac().length>0 && sp.getArrayKichThuoc().length>0){
            return chiTietSanPhamClientRepository.getLocMauSacKichthuoc(sp);
        }
        if(sp.getArrayHang().length<=0 && sp.getArrayMauSac().length<=0 && sp.getArrayKichThuoc().length>0){
            return chiTietSanPhamClientRepository.getLocKichThuoc(sp);
        }
        if(sp.getArrayHang().length>0 && sp.getArrayMauSac().length>0 && sp.getArrayKichThuoc().length>0){
            return chiTietSanPhamClientRepository.getLocSanPhamAll(sp);
        }
        return chiTietSanPhamClientRepository.getLocSanPhamNoData(sp);
    }
    public List<ChiTietSanPhamRepo> getTim(String ten) {
        return chiTietSanPhamClientRepository.getTimSanPham(ten);
    }
}
