package com.example.be.service;

import com.example.be.dto.request.admin.DangKyRequest;
import com.example.be.entity.NguoiDung;
import com.example.be.repository.NguoiDungRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class NguoiDungService {
    @Autowired
    NguoiDungRepository nguoiDungRepository;
//    NguoiDung getByID(DangKyRequest request){
//
//    }
}
