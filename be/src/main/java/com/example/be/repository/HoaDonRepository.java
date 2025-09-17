package com.example.be.repository;

import com.example.be.dto.repon.HoaDonRespon;
import com.example.be.entity.HoaDon;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface HoaDonRepository extends JpaRepository<HoaDon, String> {
    @Query(value = """
            SELECT hd.id AS idHD, hd.ma AS ma, hd.nhan_vien AS maNV, kh.ten AS tenKH, kh.so_dien_thoai AS sdt,thanh_tien AS thanhTien,hd.trang_thai AS trangThai,hd.hinh_thuc_thanh_toan as hinhThucThanhToan,
                     hd.ngay_mua as ngayMua FROM hoa_don hd
                     LEFT JOIN nguoi_dung kh ON kh.id = hd.id_khach_hang
            ORDER BY  hd.ngay_mua DESC;
                        """,
            nativeQuery = true)
    List<HoaDonRespon> getALLHDTT();

}
