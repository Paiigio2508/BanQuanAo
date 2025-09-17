package com.example.be.service;

import com.example.be.dto.repon.HoaDonRespon;
import com.example.be.repository.HoaDonRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class HoaDonService {
    @Autowired
    HoaDonRepository hoaDonRepository;
    public List<HoaDonRespon> getALLTT() {
        return hoaDonRepository.getALLHDTT();
    }

}
