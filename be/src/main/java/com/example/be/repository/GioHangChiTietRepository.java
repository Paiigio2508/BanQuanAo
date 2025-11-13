package com.example.be.repository;
import com.example.be.dto.repon.GioHangChiTietRespon;
import com.example.be.entity.GioHangChiTiet;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface GioHangChiTietRepository extends JpaRepository<GioHangChiTiet, String> {
    String BASE_SELECT_GHCT = """
        SELECT  
            ghct.id AS idGhct,
            ghct.id_gio_hang AS idGioHang,
            ghct.so_luong AS soLuong,
            ghct.thanh_tien AS thanhTien,
            ctsp.san_pham_id AS idSanPham,
            ctsp.so_luong AS soLuongTon,
            ctsp.id AS idCTSP,
            sp.ten AS name,
            kt.ten AS size,
            ms.ten AS color,
            ms.ma AS colorCode,
            ctsp.gia_ban AS price,
            ctsp.hinh_anh AS image,
            ctsp.hinh_anh AS hoverImage
        FROM gio_hang_chi_tiet ghct
        JOIN chi_tiet_san_pham ctsp ON ghct.id_chi_tiet_san_pham = ctsp.id
        JOIN san_pham sp ON ctsp.san_pham_id = sp.id
        JOIN mau_sac ms ON ctsp.mau_sac_id = ms.id
        JOIN kich_thuoc kt ON ctsp.kich_thuoc_id = kt.id
        """;

    @Query(value = BASE_SELECT_GHCT+"WHERE ghct.id_gio_hang = :idGH", nativeQuery = true)
    List<GioHangChiTietRespon> getAllGHCTByIDGH(@Param("idGH") String idGH);
    @Query("Select pt from GioHangChiTiet pt where pt.gioHang.id=:id and pt.chiTietSanPham.id=:idctsp")
    GioHangChiTiet listGHCTByIdGioHangAndSanPham(String id, String idctsp);
}
