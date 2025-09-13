package com.example.be.service.SanPham;

import com.example.be.dto.repon.ThuocTinhRepo;
import com.example.be.dto.request.admin.sanphamrequest.ThuocTinhRequest;
import com.example.be.dto.request.admin.sanphamrequest.ThuocTinhSearchRequest;
import com.example.be.entity.ChatLieu;
import com.example.be.repository.SanPham.ChatLieuRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ChatLieuService {
    @Autowired
    ChatLieuRepository chatLieuRepository;
    public List<ThuocTinhRepo> getAllChatLieu() {
        return chatLieuRepository.getAllChatLieu();
    }
    public ChatLieu update(String id, ThuocTinhRequest request) {
        ChatLieu cl = request.mapToEntity(new ChatLieu());
        cl.setId(id);
        return chatLieuRepository.save(cl);
    }

    public ChatLieu detailCL(String id){return chatLieuRepository.findById(id).get();}

    public List<ThuocTinhRepo> getTim(ThuocTinhSearchRequest bangConSearch) {
        return chatLieuRepository.timChatLieu(bangConSearch);
    }

    public String addCL(ThuocTinhRequest cl){
        ChatLieu chatLieu = ChatLieu.builder()
                .ma(cl.getMa())
                .ten(cl.getTen())
                .ngayTao(cl.getNgayTao())
                .trangThai(0)
                .build();
        chatLieuRepository.save(chatLieu);
        return "Done";
    }
}