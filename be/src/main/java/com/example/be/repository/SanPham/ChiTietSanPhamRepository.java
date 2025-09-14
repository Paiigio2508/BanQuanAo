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
    @Query(value =
            "SELECT " +
                    "  o.id AS idCTSP, " +
                    "  COALESCE(MIN(o.hinh_anh), 'Chưa có ảnh') AS linkAnh, " +  // bỏ N'...'
                    "  sp.ten AS tenSP, " +
                    "  kt.ten AS tenKT, " +
                    "  ms.ten AS tenMS, " +
                    "  ms.ma  AS maMS, " +
                    "  COALESCE(o.so_luong, 0) AS soLuong, " +
                    "  o.gia_ban AS giaBan, " +
                    "  o.trang_thai AS trangThai " +
                    "FROM chi_tiet_san_pham o " +
                    "JOIN san_pham sp  ON o.san_pham_id = sp.id " +
                    "JOIN kich_thuoc kt ON o.kich_thuoc_id = kt.id " +
                    "JOIN mau_sac ms   ON o.mau_sac_id   = ms.id " +
                    "WHERE (:idSP IS NULL OR o.san_pham_id = :idSP) " +
                    "GROUP BY o.id, sp.ten, kt.ten, ms.ten, ms.ma, o.so_luong, o.gia_ban, o.trang_thai",
            nativeQuery = true)
    List<ChiTietSanPhamRepo> getALLCTSP(@Param("idSP") String idSP);
}
