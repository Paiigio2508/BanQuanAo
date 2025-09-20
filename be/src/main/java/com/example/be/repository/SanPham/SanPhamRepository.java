package com.example.be.repository.SanPham;

import com.example.be.dto.repon.SanPhamRepo;
import com.example.be.dto.repon.ThuocTinhRepo;
import com.example.be.dto.request.admin.sanphamrequest.ThuocTinhSearchRequest;
import com.example.be.entity.SanPham;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SanPhamRepository extends JpaRepository<SanPham, String> {
    @Query(value = """
    SELECT 
            	a.id as id,
            	a.ma as ma ,
            	a.ten as ten,
            	case
            		when SUM(coalesce(o.so_luong, 0)) is null then N'0'
            		else SUM(coalesce(o.so_luong, 0))
            	end as soLuong,
            	a.trang_thai as trangThai
            from
            	san_pham a
            left join chi_tiet_san_pham o on
            	o.san_pham_id = a.id
            group by
            	ma,
            	ten,
            	a.trang_thai,
            	a.id
            order by
            	a.ngay_tao desc
            """, nativeQuery = true)
    List<SanPhamRepo> getALLSP();
    @Query(value = """

            SELECT
    o.id as id,
    o.ma as ma,
    o.ten as ten,
    SUM(coalesce(a.so_luong, 0)) as soLuong,
    o.trang_thai as trangThai
FROM san_pham o
LEFT JOIN chi_tiet_san_pham a ON a.san_pham_id = o.id
WHERE
    (:#{#bangConSearch.ten} IS NULL\s
        OR o.ma LIKE %:#{#bangConSearch.ten}%
        OR o.ten LIKE %:#{#bangConSearch.ten}%)
    AND (:#{#bangConSearch.trangThai} IS NULL
        OR o.trang_thai = :#{#bangConSearch.trangThai})
GROUP BY
    o.id, o.ma, o.ten, o.trang_thai
ORDER BY o.ma DESC
            """, nativeQuery = true)
    List<SanPhamRepo> tim(ThuocTinhSearchRequest bangConSearch);
    @Query(value = """
            select 
            distinct ms.ma  
            from mau_sac ms
            join chi_tiet_san_pham ctsp on ms.id = ctsp.mau_sac_id
            join san_pham sp on sp.id = ctsp.san_pham_id
            where sp.id =:id order by ms.ma ASC 
           """, nativeQuery = true)
    List<String> getListMauSacBySanPhamId(String id);
    @Query(value = """
           select distinct kt.ten  from kich_thuoc kt
            join chi_tiet_san_pham ctsp on kt.id = ctsp.kich_thuoc_id
            join san_pham sp on sp.id = ctsp.san_pham_id
            where sp.id =:id order by kt.ten ASC 
            """, nativeQuery = true)
    List<String> getListKichThuocBySanPhamId(String id);
}
