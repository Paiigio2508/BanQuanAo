package com.example.be.repository.SanPham;

import com.example.be.dto.repon.ThuocTinhRepo;
import com.example.be.dto.request.admin.sanphamrequest.ThuocTinhSearchRequest;
import com.example.be.entity.KichThuoc;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface KichThuocRepository extends JpaRepository<KichThuoc, String> {
    @Query(value = """
    SELECT 
    o.id as id,
    o.ma as ma ,
         o.ten as ten,
         o.trang_thai as trangThai
      FROM kich_thuoc o ORDER BY o.ngay_tao DESC 
            """, nativeQuery = true)
    List<ThuocTinhRepo> getALLKT();


    @Query(value = """
    SELECT o.id as id,o.ma as ma ,o.ten as ten, o.trang_thai as trangThai FROM kich_thuoc o WHERE 
     (:#{#bangConSearch.ten} IS NULL OR o.ma LIKE (%:#{#bangConSearch.ten}%) OR o.ten LIKE (%:#{#bangConSearch.ten}%) ) AND
     ( :#{#bangConSearch.trangThai} IS NULL OR o.trang_thai=:#{#bangConSearch.trangThai})
    ORDER BY o.ma DESC
            """, nativeQuery = true)
    List<ThuocTinhRepo> tim(ThuocTinhSearchRequest bangConSearch);
    @Query("""
        SELECT DISTINCT kt
        FROM ChiTietSanPham ctsp
        JOIN ctsp.kichThuoc kt
        WHERE ctsp.sanPham.id = :idSanPham
    """)
    List<KichThuoc> findBySanPhamId(@Param("idSanPham") String idSanPham);
}
