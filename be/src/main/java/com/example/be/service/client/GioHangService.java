package com.example.be.service.client;

import com.example.be.entity.GioHang;
import com.example.be.repository.GioHangRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class GioHangService {
    @Autowired
    GioHangRepository gioHangRepository;

    public GioHang addGioHang(GioHang request) {
        return gioHangRepository.save(request);
    }

    public GioHang getGHByKH(String idKH) {
        return gioHangRepository.getGHByIDKH(idKH);
    }
}
