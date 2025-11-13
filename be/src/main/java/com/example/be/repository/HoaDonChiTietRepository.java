package com.example.be.repository;

import com.example.be.entity.ChiTietHoaDon;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;


@Repository
public interface HoaDonChiTietRepository extends JpaRepository<ChiTietHoaDon, String> {
    @Query(value = "SELECT * FROM hoa_don_chi_tiet where hoa_don_id =:idHD and chi_tiet_san_pham_id =:idCTSP ",nativeQuery = true)
    ChiTietHoaDon getOneHDCT(@Param("idHD") String idHD, @Param("idCTSP")String idCTSP);
}
