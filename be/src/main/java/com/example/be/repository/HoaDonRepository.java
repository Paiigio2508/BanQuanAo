package com.example.be.repository;

import com.example.be.dto.repon.ChiTietSanPhamRepo;
import com.example.be.dto.repon.HoaDonRespon;
import com.example.be.dto.request.TrangThaiRequest;
import com.example.be.entity.HoaDon;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface HoaDonRepository extends JpaRepository<HoaDon, String> {
    @Query(value = """
            SELECT hd.id AS idHD, hd.ma AS ma, hd.nhan_vien AS maNV, kh.ten AS tenKH, kh.so_dien_thoai AS sdt,thanh_tien AS thanhTien,hd.trang_thai AS trangThai,hd.hinh_thuc_thanh_toan as hinhThucThanhToan,
                     hd.ngay_mua as ngayMua,hd.ghi_chu AS ghiChu,hd.tien_van_chuyen as tienVanChuyen FROM hoa_don hd
                     LEFT JOIN nguoi_dung kh ON kh.id = hd.id_khach_hang
            ORDER BY  hd.ngay_mua DESC;
                        """,
            nativeQuery = true)
    List<HoaDonRespon> getALLHDTT();
    @Query(value = """
     SELECT  hd.id AS idHD,hd.ma AS ma, CASE
       WHEN hd.id_khach_hang IS NULL  THEN N'Khách lẻ' ELSE kh.ten END  as tenKH ,ngay_mua as ngayMua,hd.thanh_tien as thanhTien,hd.trang_thai as trangThai,\s
       hd.id_khach_hang as nguoiDung,hd.ghi_chu AS ghiChu,hd.tien_van_chuyen as tienVanChuyen,hd.dia_chi as diaChi, hd.so_dien_thoai as sdt,hd.email as email,hd.ten_nguoi_nhan as tenNguoiNhan,
       hd.ngay_du_kien_nhan as ngayDuKienNhan,
       hd.thanh_tien,tt.phuong_thuc as phuongThuc FROM  hoa_don hd
       LEFT JOIN nguoi_dung kh ON kh.id = hd.id_khach_hang
       left join thanh_toan tt on tt.id_hoa_don = hd.id
       where hd.id=:key
            	    """,
            nativeQuery = true)
    HoaDonRespon detailHD(String key);
    @Query(value = """
SELECT hdct.id as id, hdct.id_chi_tiet_san_pham as idCTSP, ctsp.hinh_anh as linkAnh,sp.ten as tenSP, kt.ten as tenKT, ms.ten as tenMS,hdct.so_luong as soLuong,\s
hdct.don_gia as giaBan,hdct.trang_thai as trangThai , cl.ten as tenCL,gt.ten as tenGT,h.ten as tenHang,dm.ten as tenDM, ms.ma as maMS FROM
chi_tiet_hoa_don hdct left join chi_tiet_san_pham ctsp on ctsp.id = hdct.id_chi_tiet_san_pham
               			LEFT JOIN san_pham sp ON sp.id = ctsp.san_pham_id
               			LEFT JOIN kich_thuoc kt ON kt.id = ctsp.kich_thuoc_id
               			LEFT JOIN mau_sac ms ON ms.id = ctsp.mau_sac_id
                        	LEFT JOIN chat_lieu cl ON cl.id = ctsp.chat_lieu_id
                            LEFT JOIN gioi_tinh gt ON gt.id = ctsp.gioi_tinh_id
                              LEFT JOIN hang h ON h.id = ctsp.hang_id
                                LEFT JOIN danh_muc dm ON dm.id = ctsp.danh_muc_id
                        where hdct.id_hoa_don=:key 
                           	    """,
            nativeQuery = true)
    List<ChiTietSanPhamRepo> detailHDSanPham(String key);

    @Query(value = """
          SELECT hd.id as IdHD,hd.ma, hd.thanh_tien as thanhTien, hd.trang_thai as trangThai, (select group_concat(hdct.id) from chi_tiet_hoa_don hdct where hdct.id_hoa_don=hd.id) as hoaDonDetail
            FROM hoa_don hd where id_khach_hang=:#{#req.id}  AND ( :#{#req.trangThai}  IS NULL
          OR :#{#req.trangThai} LIKE ''OR hd.trang_thai Like (:#{#req.trangThai}))  order by hd.ngay_mua desc;   
                     """, nativeQuery = true)
    List<HoaDonRespon> getALLHDByIDKH(TrangThaiRequest req);
    @Query(value = """
     SELECT  hd.id AS idHD,hd.ma AS ma, CASE
       WHEN hd.id_khach_hang IS NULL  THEN N'Khách lẻ' ELSE kh.ten END  as tenKH ,ngay_mua as ngayMua,hd.thanh_tien as thanhTien,hd.trang_thai as trangThai,\s
       hd.id_khach_hang as nguoiDung,hd.ghi_chu AS ghiChu,hd.tien_van_chuyen as tienVanChuyen,hd.dia_chi as diaChi, hd.so_dien_thoai as sdt,hd.email as email,hd.ten_nguoi_nhan as tenNguoiNhan,
       hd.ngay_du_kien_nhan as ngayDuKienNhan,
       hd.thanh_tien,tt.phuong_thuc as phuongThuc FROM  hoa_don hd
       LEFT JOIN nguoi_dung kh ON kh.id = hd.id_khach_hang
       left join thanh_toan tt on tt.id_hoa_don = hd.id
       where hd.ma=:ma                                                                                
                     """, nativeQuery = true)
    HoaDonRespon searchHDbyMa(String ma );
}
