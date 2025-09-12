package com.example.be.repository;
import com.example.be.dto.repon.DiaChiKhachHangRepon;
import com.example.be.entity.DiaChi;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DiaChiRepository extends JpaRepository<DiaChi, String> {
    @Query(value = "SELECT * FROM dia_chi a WHERE a.trang_thai = 0 AND a.id_nguoi_dung =:id",nativeQuery = true)
    DiaChi findByUserAndStatus (@Param("id") String user);
    @Query(value = "SELECT id , id_nguoi_dung as nguoiDung,id_thanh_pho as idThanhPho,id_huyen as idHuyen,id_xa as idXa, ten_nguoi_nhan as tenNguoiNhan, so_dien_thoai as soDienThoai,dia_chi as diaChi,ten_xa as tenXa,ten_huyen as tenHuyen,ten_thanh_pho as tenThanhPho, trang_thai as trangThai from dia_chi where id_nguoi_dung =:id",nativeQuery = true)
    List<DiaChiKhachHangRepon> findDiaChiByKH (@Param("id") String user);
}
