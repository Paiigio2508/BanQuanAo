package com.example.be.repository;
import com.example.be.entity.GioHang;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface GioHangRepository extends JpaRepository<GioHang, String> {
    @Query(value = """
             SELECT * from gio_hang gh where gh.id_khach_hang=:idKH 
            """, nativeQuery = true)
    GioHang getGHByIDKH(String idKH);
}
