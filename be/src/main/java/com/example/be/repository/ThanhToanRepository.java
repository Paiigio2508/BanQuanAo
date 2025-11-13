package com.example.be.repository;

import com.example.be.entity.ThanhToan;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ThanhToanRepository extends JpaRepository<ThanhToan, String> {
    @Query(value = """
            SELECT * FROM thanh_toan where hoa_don_id=:idHD
                           """, nativeQuery = true)
    List<ThanhToan> getThanhToanByIdHD(String idHD);

    @Query(value = "select * from thanh_toan where hoa_don_id=:idHD && phuong_thuc=:phuongThuc", nativeQuery = true)
    ThanhToan getThongTin(String idHD, int phuongThuc);
}
