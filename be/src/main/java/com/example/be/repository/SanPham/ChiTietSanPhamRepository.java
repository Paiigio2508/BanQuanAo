package com.example.be.repository.SanPham;

import com.example.be.dto.repon.ChiTietSanPhamRepo;
import com.example.be.entity.ChiTietSanPham;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ChiTietSanPhamRepository extends JpaRepository<ChiTietSanPham, String> {
    @Query(value = """
            SELECT o.id AS idCTSP
            ,CASE WHEN MIN(o.hinh_anh) IS NULL THEN N'Chưa có ảnh' ELSE MIN(o.hinh_anh) END AS linkAnh
            ,sp.ten AS tenSP ,kt.ten AS tenKT,ms.ten AS tenMS,ms.ma AS maMS
            ,CASE WHEN o.so_luong IS NULL THEN N'0' ELSE o.so_luong END AS soLuong
            ,o.gia_ban AS giaBan,o.trang_thai AS trangThai
            FROM chi_tiet_san_pham o
            JOIN san_pham sp  on o.san_pham_id=sp.id
            JOIN kich_thuoc kt  on o.kich_thuoc_id=kt.id
            JOIN mau_sac ms  on o.mau_sac_id=ms.id
            WHERE o.san_pham_id=:idSP
             group by o.id
                     """, nativeQuery = true)
    List<ChiTietSanPhamRepo> getALLCTSP(@Param("idSP") String idSP);
}
