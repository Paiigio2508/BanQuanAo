package com.example.be.repository;

import com.example.be.dto.repon.BieuDoRepo;
import com.example.be.dto.repon.SanPhamBanChayRepo;
import com.example.be.dto.repon.ThongKeRepo;
import com.example.be.dto.repon.TrangThaiHoaDonRepo;
import com.example.be.entity.HoaDon;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ThongKeRepository  extends JpaRepository<HoaDon, String> {
    @Query(value = """
            SELECT  CASE WHEN sum(thanh_tien) IS NULL  THEN 0 ELSE sum(thanh_tien) END  as tongTienThongKe
            , count(ma) AS tongHoaDonThongKe
            FROM hoa_don where  cast(hoa_don.ngay_mua AS DATE)=date(curdate())
            and (hoa_don.trang_thai=4 or hoa_don.trang_thai=5)
                        """, nativeQuery = true)
    ThongKeRepo thongKeTheoNgay();

    @Query(value = """
SELECT
  COALESCE(SUM(thanh_tien), 0) AS tongTienThongKe,
  COUNT(ma)                     AS tongHoaDonThongKe
FROM hoa_don
WHERE ngay_tao >= DATE_FORMAT(CURDATE(), '%Y-%m-01')
  AND ngay_tao <  DATE_FORMAT(DATE_ADD(CURDATE(), INTERVAL 1 MONTH), '%Y-%m-01')
  AND trang_thai IN (4, 5);

                        """, nativeQuery = true)
    ThongKeRepo thongKeTheoThang();

    @Query(value = """
SELECT
  COALESCE(SUM(thanh_tien), 0) AS tongTienThongKe,
  COUNT(ma)                     AS tongHoaDonThongKe
FROM hoa_don
WHERE ngay_tao >= MAKEDATE(YEAR(CURDATE()), 1)
  AND ngay_tao <  MAKEDATE(YEAR(CURDATE()) + 1, 1)
  AND trang_thai IN (4, 5);

                        """, nativeQuery = true)
    ThongKeRepo thongKeTheoNam();

    @Query(value = """
SELECT
  COALESCE(SUM(thanh_tien), 0) AS tongTienThongKe,
  COUNT(ma)                    AS tongHoaDonThongKe
FROM hoa_don
WHERE ngay_tao >= DATE_SUB(CURDATE(), INTERVAL 1 DAY)
  AND ngay_tao <  CURDATE()
  AND trang_thai IN (4, 5);
                        """, nativeQuery = true)
    ThongKeRepo doanhThuNgayTruoc();

    @Query(value = """
SELECT
  COALESCE(SUM(thanh_tien), 0) AS tongTienThongKe,
  COUNT(ma) AS tongHoaDonThongKe
FROM hoa_don
WHERE ngay_tao >= DATE_FORMAT(DATE_SUB(CURDATE(), INTERVAL 1 MONTH), '%Y-%m-01')
  AND ngay_tao <  DATE_FORMAT(CURDATE(), '%Y-%m-01')
  AND trang_thai IN (4,5);
                        """, nativeQuery = true)
    ThongKeRepo doanhThuThangTruoc();

    @Query(value = """
SELECT
  COALESCE(SUM(thanh_tien), 0) AS tongTienThongKe,
  COUNT(ma)                     AS tongHoaDonThongKe
FROM hoa_don
WHERE ngay_tao >= MAKEDATE(YEAR(CURDATE()) - 1, 1)
  AND ngay_tao <  MAKEDATE(YEAR(CURDATE()), 1)
  AND trang_thai IN (4, 5);
                                    """, nativeQuery = true)
    ThongKeRepo doanhThuNamTruoc();

    @Query(value = """
select sum(chi_tiet_hoa_don.so_luong) as soLuong,chi_tiet_hoa_don.id_chi_tiet_san_pham as idSP,\s
chi_tiet_san_pham.gia_ban as giaBan,chi_tiet_san_pham.hinh_anh as linkAnh,san_pham.ten as tenSp,
mau_sac.ten as mauSac,kich_thuoc.ten as kichThuoc,hang.ten as hang
from chi_tiet_hoa_don join hoa_don on hoa_don.id = chi_tiet_hoa_don.id_hoa_don
join chi_tiet_san_pham on chi_tiet_san_pham.id =chi_tiet_hoa_don.id_chi_tiet_san_pham
join san_pham on san_pham.id=chi_tiet_san_pham.san_pham_id
join mau_sac on mau_sac.id=chi_tiet_san_pham.mau_sac_id
join kich_thuoc on kich_thuoc.id=chi_tiet_san_pham.kich_thuoc_id
join hang on hang.id=chi_tiet_san_pham.hang_id
WHERE YEAR(chi_tiet_hoa_don.ngay_tao) = YEAR(CURDATE())
AND MONTH(chi_tiet_hoa_don.ngay_tao) = MONTH(CURDATE()) and (hoa_don.trang_thai = 4 or hoa_don.trang_thai = 5)
group by chi_tiet_hoa_don.id_chi_tiet_san_pham ,chi_tiet_san_pham.gia_ban,chi_tiet_san_pham.hinh_anh,
mau_sac.ten,san_pham.ten,kich_thuoc.ten,hang.ten order by sum(chi_tiet_hoa_don.so_luong) desc limit 5
            """, nativeQuery = true)
    List<SanPhamBanChayRepo> getSPBanChayThang();

    @Query(value = """
select sum(chi_tiet_hoa_don.so_luong) as soLuong,chi_tiet_hoa_don.id_chi_tiet_san_pham as idSP,\s
chi_tiet_san_pham.gia_ban as giaBan,chi_tiet_san_pham.hinh_anh as linkAnh,san_pham.ten as tenSp,
mau_sac.ten as mauSac,kich_thuoc.ten as kichThuoc,hang.ten as hang
from chi_tiet_hoa_don join hoa_don on hoa_don.id = chi_tiet_hoa_don.id_hoa_don
join chi_tiet_san_pham on chi_tiet_san_pham.id =chi_tiet_hoa_don.id_chi_tiet_san_pham
join san_pham on san_pham.id=chi_tiet_san_pham.san_pham_id
join mau_sac on mau_sac.id=chi_tiet_san_pham.mau_sac_id
join kich_thuoc on kich_thuoc.id=chi_tiet_san_pham.kich_thuoc_id
join hang on hang.id=chi_tiet_san_pham.hang_id
WHERE YEAR(chi_tiet_hoa_don.ngay_tao) = YEAR(CURDATE())
and (hoa_don.trang_thai = 4 or hoa_don.trang_thai = 5)
group by chi_tiet_hoa_don.id_chi_tiet_san_pham,chi_tiet_san_pham.gia_ban,chi_tiet_san_pham.hinh_anh,mau_sac.ten,san_pham.ten,kich_thuoc.ten,hang.ten
order by sum(chi_tiet_hoa_don.so_luong) desc limit 5
            """, nativeQuery = true)
    List<SanPhamBanChayRepo> getSPBanChayNam();

    @Query(value = """
select sum(chi_tiet_hoa_don.so_luong) as soLuong,chi_tiet_hoa_don.id_chi_tiet_san_pham as idSP,\s
chi_tiet_san_pham.gia_ban as giaBan,chi_tiet_san_pham.hinh_anh as linkAnh,san_pham.ten as tenSp,
mau_sac.ten as mauSac,kich_thuoc.ten as kichThuoc,hang.ten as hang
from chi_tiet_hoa_don join hoa_don on hoa_don.id = chi_tiet_hoa_don.id_hoa_don
join chi_tiet_san_pham on chi_tiet_san_pham.id =chi_tiet_hoa_don.id_chi_tiet_san_pham
join san_pham on san_pham.id=chi_tiet_san_pham.san_pham_id
join mau_sac on mau_sac.id=chi_tiet_san_pham.mau_sac_id
join kich_thuoc on kich_thuoc.id=chi_tiet_san_pham.kich_thuoc_id
join hang on hang.id=chi_tiet_san_pham.hang_id
WHERE YEARWEEK(chi_tiet_hoa_don.ngay_tao) = YEARWEEK(CURDATE())
and (hoa_don.trang_thai=4 or hoa_don.trang_thai=5)
group by chi_tiet_hoa_don.id_chi_tiet_san_pham,chi_tiet_san_pham.gia_ban,chi_tiet_san_pham.hinh_anh,mau_sac.ten,san_pham.ten,kich_thuoc.ten,hang.ten
order by sum(chi_tiet_hoa_don.so_luong) desc limit 5
            """, nativeQuery = true)
    List<SanPhamBanChayRepo> getSPBanChayTuan();

    @Query(value = """
select sum(chi_tiet_hoa_don.so_luong) as soLuong,chi_tiet_hoa_don.id_chi_tiet_san_pham as idSP,
chi_tiet_san_pham.gia_ban as giaBan,chi_tiet_san_pham.hinh_anh as linkAnh,san_pham.ten as tenSp,
mau_sac.ten as mauSac,kich_thuoc.ten as kichThuoc,hang.ten as hang
from chi_tiet_hoa_don join hoa_don on hoa_don.id = chi_tiet_hoa_don.id_hoa_don
join chi_tiet_san_pham on chi_tiet_san_pham.id =chi_tiet_hoa_don.id_chi_tiet_san_pham
join san_pham on san_pham.id=chi_tiet_san_pham.san_pham_id
join mau_sac on mau_sac.id=chi_tiet_san_pham.mau_sac_id
join kich_thuoc on kich_thuoc.id=chi_tiet_san_pham.kich_thuoc_id
join hang on hang.id=chi_tiet_san_pham.hang_id
WHERE date(chi_tiet_hoa_don.ngay_tao) = CURDATE()
and (hoa_don.trang_thai=4 or hoa_don.trang_thai=5)
group by chi_tiet_hoa_don.id_chi_tiet_san_pham,chi_tiet_san_pham.gia_ban,chi_tiet_san_pham.hinh_anh,mau_sac.ten,san_pham.ten,kich_thuoc.ten,hang.ten
order by sum(chi_tiet_hoa_don.so_luong) desc limit 5
            """, nativeQuery = true)
    List<SanPhamBanChayRepo> getSPBanChayNgay();
    @Query(value = """
select sum(chi_tiet_hoa_don.so_luong) as soLuong,chi_tiet_hoa_don.id_chi_tiet_san_pham as idSP,\s
chi_tiet_san_pham.gia_ban as giaBan,chi_tiet_san_pham.hinh_anh as linkAnh,san_pham.ten as tenSp,
mau_sac.ten as mauSac,kich_thuoc.ten as kichThuoc,hang.ten as hang
from chi_tiet_hoa_don join hoa_don on hoa_don.id = chi_tiet_hoa_don.id_hoa_don
join chi_tiet_san_pham on chi_tiet_san_pham.id =chi_tiet_hoa_don.id_chi_tiet_san_pham
join san_pham on san_pham.id=chi_tiet_san_pham.san_pham_id
join mau_sac on mau_sac.id=chi_tiet_san_pham.mau_sac_id
join kich_thuoc on kich_thuoc.id=chi_tiet_san_pham.kich_thuoc_id
join hang on hang.id=chi_tiet_san_pham.hang_id
WHERE chi_tiet_san_pham.so_luong<5
group by chi_tiet_san_pham.id,chi_tiet_san_pham.gia_ban,chi_tiet_san_pham.hinh_anh,mau_sac.ten,san_pham.ten,kich_thuoc.ten,hang.ten
                     """, nativeQuery = true)
    List<SanPhamBanChayRepo> getSPSapHet();
    @Query(value = """
SELECT DATE(hdct.ngay_tao) AS ngay,
COUNT(DISTINCT hdct.id_hoa_don) AS tongHoaDon,
SUM(hdct.so_luong) AS tongSanPham
FROM chi_tiet_hoa_don hdct JOIN hoa_don hd ON hd.id = hdct.id_hoa_don
WHERE DATE(hdct.ngay_tao) = CURDATE() AND hd.trang_thai IN (4,5)
GROUP BY DATE(hdct.ngay_tao)
            """, nativeQuery = true)

    List<BieuDoRepo> getBieuDoNgay();
    @Query(value = """
SELECT YEARWEEK(CURDATE(), 1) AS yearweek,
DATE(hdct.ngay_tao) AS ngay,
COUNT(DISTINCT hdct.id_hoa_don) AS tongHoaDon,
SUM(hdct.so_luong) AS tongSanPham
FROM chi_tiet_hoa_don hdct JOIN hoa_don hd ON hd.id = hdct.id_hoa_don
WHERE YEARWEEK(hdct.ngay_tao, 1) = YEARWEEK(CURDATE(), 1)  AND hd.trang_thai IN (4,5)
GROUP BY DATE(hdct.ngay_tao) ORDER BY ngay;
              """, nativeQuery = true)
    List<BieuDoRepo> getBieuDoTuan();

    @Query(value = """
Select DATE(hdct.ngay_tao) AS ngay,
count(distinct hdct.id_hoa_don) as tongHoaDon,
sum(hdct.so_luong) as tongSanPham from chi_tiet_hoa_don hdct JOIN hoa_don hd ON hd.id = hdct.id_hoa_don
where year(hdct.ngay_tao)= year(curdate()) and month(hdct.ngay_tao)=month(curdate()) and hd.trang_thai=4
group by date(hdct.ngay_tao)
""", nativeQuery = true)
    List<BieuDoRepo> getBieuDoThang();

    @Query(value = """
Select count(distinct hdct.id_hoa_don) as tongHoaDon,
sum(hdct.so_luong) as tongSanPham from chi_tiet_hoa_don hdct JOIN hoa_don hd ON hd.id = hdct.id_hoa_don
where year(date (hdct.ngay_tao))= year(curdate()) and hd.trang_thai=4
            """, nativeQuery = true)
    List<BieuDoRepo> getBieuDoNam();

    @Query(value = """
select case when hoa_don.trang_thai IS NULL  THEN 0 else hoa_don.trang_thai end as trangThai,
count(hoa_don.id) as soLuong from hoa_don where year(hoa_don.ngay_tao)=year(current_date()) and month(hoa_don.ngay_tao)=month(current_date())
group by hoa_don.trang_thai
""", nativeQuery = true)
    List<TrangThaiHoaDonRepo> getTrangThaiHoaDonThang();

    @Query(value = """
select case when hoa_don.trang_thai IS NULL THEN 0\s
else hoa_don.trang_thai end as trangThai,count(hoa_don.id) as soLuong\s
from hoa_don where year(hoa_don.ngay_tao)=year(current_date())
group by hoa_don.trang_thai
""", nativeQuery = true)
    List<TrangThaiHoaDonRepo> getTrangThaiHoaDonNam();

    @Query(value = """
select case when hoa_don.trang_thai IS NULL THEN 0
else hoa_don.trang_thai end as trangThai,count(hoa_don.id) as soLuong from hoa_don
where date(hoa_don.ngay_tao)=current_date()
group by hoa_don.trang_thai
""", nativeQuery = true)
    List<TrangThaiHoaDonRepo> getTrangThaiHoaDonNgay();

    @Query(value = """
select case when hoa_don.trang_thai IS NULL  THEN 0\s
else hoa_don.trang_thai end as trangThai,count(hoa_don.id) as soLuong from hoa_don
where yearweek(hoa_don.ngay_tao)=yearweek(current_date())
group by hoa_don.trang_thai
""", nativeQuery = true)
    List<TrangThaiHoaDonRepo> getTrangThaiHoaDonTuan();

    @Query(value = """
SELECT COALESCE(SUM(hdct.so_luong), 0) AS tongSanPham
FROM chi_tiet_hoa_don hdct
JOIN hoa_don hd ON hd.id = hdct.id_hoa_don
WHERE hd.trang_thai IN (4, 5)                  -- chỉ đơn hoàn tất/đã thanh toán
AND hd.ngay_tao >= CURDATE() 
AND hd.ngay_tao <  CURDATE() + INTERVAL 1 DAY;
            """, nativeQuery = true)
    Integer getSPBanNgay();

    @Query(value = """
SELECT COALESCE(SUM(hdct.so_luong), 0) AS tongSanPham
FROM chi_tiet_hoa_don hdct
JOIN hoa_don hd ON hd.id = hdct.id_hoa_don
WHERE hd.trang_thai IN (4,5)
AND hd.ngay_tao >= CURDATE() - INTERVAL 1 DAY 
AND hd.ngay_tao <  CURDATE(); \s
            """, nativeQuery = true)
    Integer getSPBanNgayTruoc();
}
