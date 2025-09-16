package com.example.be.repository.SanPham;

import com.example.be.dto.repon.ChiTietSanPhamRepo;
import com.example.be.dto.request.admin.sanphamrequest.ChiTietSanPhamArraySearchRequest;
import com.example.be.entity.ChiTietSanPham;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ChiTietSanPhamClientRepository extends JpaRepository<ChiTietSanPham, String> {
    @Query(value = """
SELECT o.id AS idCTSP,
                     COALESCE(MIN(o.hinh_anh), 'Chưa có ảnh') AS linkAnh,
                     sp.ten AS tenSP,
                     kt.ten AS tenKT,
                     ms.ten AS tenMS,
                     ms.ma  AS maMS,
                     COALESCE(o.so_luong, 0) AS soLuong,
                     o.gia_ban AS giaBan,
                     o.trang_thai AS trangThai,
                     o.mo_ta as moTa,
                     dm.ten as tenDM,
                     cl.ten as tenCL,
                     gt.ten as tenGT,
                      h.ten as tenHang
                    FROM chi_tiet_san_pham o
                    JOIN san_pham sp  ON o.san_pham_id = sp.id
                    JOIN kich_thuoc kt ON o.kich_thuoc_id = kt.id
                    JOIN mau_sac ms   ON o.mau_sac_id   = ms.id
                    join danh_muc dm ON o.danh_muc_id = dm.id
                    join chat_lieu cl ON o.chat_lieu_id = cl.id
                    join gioi_tinh gt ON o.gioi_tinh_id =gt.id
                    join hang h ON o.hang_id =h.id
            	where
             	o.so_luong > 0 AND
             	( o.gia_ban BETWEEN :#{#req.giaBatDau} AND :#{#req.giaKetThuc} )
GROUP BY o.id, sp.ten, kt.ten, ms.ten, ms.ma, o.so_luong, o.gia_ban, o.trang_thai
            """, nativeQuery = true)
    List<ChiTietSanPhamRepo> getLocSanPhamNoData(@Param("req") ChiTietSanPhamArraySearchRequest req);

    @Query(value = """
                       SELECT o.id AS idCTSP,
                                 o.hinh_anh AS linkAnh,
                                 sp.ten AS tenSP,
                                 kt.ten AS tenKT,
                                 ms.ten AS tenMS,
                                 ms.ma  AS maMS,
                                 COALESCE(o.so_luong, 0) AS soLuong,
                                 o.gia_ban AS giaBan,
                                 o.trang_thai AS trangThai,
                                 o.mo_ta as moTa,
                                 dm.ten as tenDM,
                                 cl.ten as tenCL,
                                 gt.ten as tenGT,
                                  h.ten as tenHang
                                FROM chi_tiet_san_pham o
                                JOIN san_pham sp  ON o.san_pham_id = sp.id
                                JOIN kich_thuoc kt ON o.kich_thuoc_id = kt.id
                                JOIN mau_sac ms   ON o.mau_sac_id   = ms.id
                                join danh_muc dm ON o.danh_muc_id = dm.id
                                join chat_lieu cl ON o.chat_lieu_id = cl.id
                                join gioi_tinh gt ON o.gioi_tinh_id =gt.id
                                join hang h ON o.hang_id =h.id
                        	where
                         	o.so_luong > 0 AND
                         	( o.mau_sac_id IN :#{#req.arrayMauSac} ) AND
                         	( o.hang_id IN :#{#req.arrayHang} ) AND 
                         	( o.kich_thuoc_id IN :#{#req.arrayKichThuoc} ) AND
                         	( o.gia_ban BETWEEN :#{#req.giaBatDau} AND :#{#req.giaKetThuc} )
            GROUP BY o.id, sp.ten, kt.ten, ms.ten, ms.ma, o.so_luong, o.gia_ban, o.trang_thai
                        """, nativeQuery = true)
    List<ChiTietSanPhamRepo> getLocSanPhamAll(@Param("req") ChiTietSanPhamArraySearchRequest req);

    @Query(value = """
           SELECT o.id AS idCTSP,
           COALESCE(MIN(o.hinh_anh), 'Chưa có ảnh') AS linkAnh,
           sp.ten AS tenSP,
           kt.ten AS tenKT,
           ms.ten AS tenMS,
           ms.ma  AS maMS,
           COALESCE(o.so_luong, 0) AS soLuong,
           o.gia_ban AS giaBan,
           o.trang_thai AS trangThai,
           o.mo_ta as moTa,
           dm.ten as tenDM,
           cl.ten as tenCL,
           gt.ten as tenGT,
           h.ten as tenHang
           FROM chi_tiet_san_pham o
           JOIN san_pham sp  ON o.san_pham_id = sp.id
           JOIN kich_thuoc kt ON o.kich_thuoc_id = kt.id
           JOIN mau_sac ms   ON o.mau_sac_id   = ms.id
           join danh_muc dm ON o.danh_muc_id = dm.id
           join chat_lieu cl ON o.chat_lieu_id = cl.id
           join gioi_tinh gt ON o.gioi_tinh_id =gt.id
           join hang h ON o.hang_id =h.id
           where
          o.so_luong > 0 AND
          ( o.hang_id IN :#{#req.arrayHang} ) AND
          ( o.gia_ban BETWEEN :#{#req.giaBatDau} AND :#{#req.giaKetThuc} )
        GROUP BY o.id, sp.ten, kt.ten, ms.ten, ms.ma, o.so_luong, o.gia_ban, o.trang_thai
                        """, nativeQuery = true)
    List<ChiTietSanPhamRepo> getLocSanPham(@Param("req") ChiTietSanPhamArraySearchRequest req);

    @Query(value = """
            select
           SELECT o.id AS idCTSP,
           COALESCE(MIN(o.hinh_anh), 'Chưa có ảnh') AS linkAnh,
           sp.ten AS tenSP,
           kt.ten AS tenKT,
           ms.ten AS tenMS,
           ms.ma  AS maMS,
           COALESCE(o.so_luong, 0) AS soLuong,
           o.gia_ban AS giaBan,
           o.trang_thai AS trangThai,
           o.mo_ta as moTa,
           dm.ten as tenDM,
           cl.ten as tenCL,
           gt.ten as tenGT,
           h.ten as tenHang
           FROM chi_tiet_san_pham o
           JOIN san_pham sp  ON o.san_pham_id = sp.id
           JOIN kich_thuoc kt ON o.kich_thuoc_id = kt.id
           JOIN mau_sac ms   ON o.mau_sac_id   = ms.id
           join danh_muc dm ON o.danh_muc_id = dm.id
           join chat_lieu cl ON o.chat_lieu_id = cl.id
           join gioi_tinh gt ON o.gioi_tinh_id =gt.id
           join hang h ON o.hang_id =h.id
            	where
             	o.so_luong > 0 AND
             	( o.mau_sac_id IN :#{#req.arrayMauSac} ) AND
             	( o.hang_id IN :#{#req.arrayHang} ) AND
             	( o.gia_ban BETWEEN :#{#req.giaBatDau} AND :#{#req.giaKetThuc} )
        GROUP BY o.id, sp.ten, kt.ten, ms.ten, ms.ma, o.so_luong, o.gia_ban, o.trang_thai
            """, nativeQuery = true)
    List<ChiTietSanPhamRepo> getLocSanPhamMauSac(@Param("req") ChiTietSanPhamArraySearchRequest req);

    @Query(value = """
           SELECT o.id AS idCTSP,
           COALESCE(MIN(o.hinh_anh), 'Chưa có ảnh') AS linkAnh,
           sp.ten AS tenSP,
           kt.ten AS tenKT,
           ms.ten AS tenMS,
           ms.ma  AS maMS,
           COALESCE(o.so_luong, 0) AS soLuong,
           o.gia_ban AS giaBan,
           o.trang_thai AS trangThai,
           o.mo_ta as moTa,
           dm.ten as tenDM,
           cl.ten as tenCL,
           gt.ten as tenGT,
           h.ten as tenHang
           FROM chi_tiet_san_pham o
           JOIN san_pham sp  ON o.san_pham_id = sp.id
           JOIN kich_thuoc kt ON o.kich_thuoc_id = kt.id
           JOIN mau_sac ms   ON o.mau_sac_id   = ms.id
           join danh_muc dm ON o.danh_muc_id = dm.id
           join chat_lieu cl ON o.chat_lieu_id = cl.id
           join gioi_tinh gt ON o.gioi_tinh_id =gt.id
           join hang h ON o.hang_id =h.id
            	where
             	o.so_luong > 0 AND
             	( o.hang_id IN :#{#req.arrayHang} ) AND 
             	( o.kich_thuoc_id IN :#{#req.arrayKichThuoc} ) AND
             	( o.gia_ban BETWEEN :#{#req.giaBatDau} AND :#{#req.giaKetThuc} )                
        GROUP BY o.id, sp.ten, kt.ten, ms.ten, ms.ma, o.so_luong, o.gia_ban, o.trang_thai
            """, nativeQuery = true)
    List<ChiTietSanPhamRepo> getLocSanPhamKichThuoc(@Param("req") ChiTietSanPhamArraySearchRequest req);

    @Query(value = """
           SELECT o.id AS idCTSP,
           COALESCE(MIN(o.hinh_anh), 'Chưa có ảnh') AS linkAnh,
           sp.ten AS tenSP,
           kt.ten AS tenKT,
           ms.ten AS tenMS,
           ms.ma  AS maMS,
           COALESCE(o.so_luong, 0) AS soLuong,
           o.gia_ban AS giaBan,
           o.trang_thai AS trangThai,
           o.mo_ta as moTa,
           dm.ten as tenDM,
           cl.ten as tenCL,
           gt.ten as tenGT,
           h.ten as tenHang
           FROM chi_tiet_san_pham o
           JOIN san_pham sp  ON o.san_pham_id = sp.id
           JOIN kich_thuoc kt ON o.kich_thuoc_id = kt.id
           JOIN mau_sac ms   ON o.mau_sac_id   = ms.id
           join danh_muc dm ON o.danh_muc_id = dm.id
           join chat_lieu cl ON o.chat_lieu_id = cl.id
           join gioi_tinh gt ON o.gioi_tinh_id =gt.id
           join hang h ON o.hang_id =h.id
            	where
             	o.so_luong > 0 AND
             	( o.mau_sac_id IN :#{#req.arrayMauSac} ) AND
             	( o.gia_ban BETWEEN :#{#req.giaBatDau} AND :#{#req.giaKetThuc} )
        GROUP BY o.id, sp.ten, kt.ten, ms.ten, ms.ma, o.so_luong, o.gia_ban, o.trang_thai
            """, nativeQuery = true)
    List<ChiTietSanPhamRepo> getLocMauSac(@Param("req") ChiTietSanPhamArraySearchRequest req);

    @Query(value = """
           SELECT o.id AS idCTSP,
           COALESCE(MIN(o.hinh_anh), 'Chưa có ảnh') AS linkAnh,
           sp.ten AS tenSP,
           kt.ten AS tenKT,
           ms.ten AS tenMS,
           ms.ma  AS maMS,
           COALESCE(o.so_luong, 0) AS soLuong,
           o.gia_ban AS giaBan,
           o.trang_thai AS trangThai,
           o.mo_ta as moTa,
           dm.ten as tenDM,
           cl.ten as tenCL,
           gt.ten as tenGT,
           h.ten as tenHang
           FROM chi_tiet_san_pham o
           JOIN san_pham sp  ON o.san_pham_id = sp.id
           JOIN kich_thuoc kt ON o.kich_thuoc_id = kt.id
           JOIN mau_sac ms   ON o.mau_sac_id   = ms.id
           join danh_muc dm ON o.danh_muc_id = dm.id
           join chat_lieu cl ON o.chat_lieu_id = cl.id
           join gioi_tinh gt ON o.gioi_tinh_id =gt.id
           join hang h ON o.hang_id =h.id
            	where
             	o.so_luong > 0 AND
             	( o.mau_sac_id IN :#{#req.arrayMauSac} ) AND
             	( o.kich_thuoc_id IN :#{#req.arrayKichThuoc} ) AND
             	( o.gia_ban BETWEEN :#{#req.giaBatDau} AND :#{#req.giaKetThuc} )
        GROUP BY o.id, sp.ten, kt.ten, ms.ten, ms.ma, o.so_luong, o.gia_ban, o.trang_thai
            """, nativeQuery = true)
    List<ChiTietSanPhamRepo> getLocMauSacKichthuoc(@Param("req") ChiTietSanPhamArraySearchRequest req);

    @Query(value = """
           SELECT o.id AS idCTSP,
           COALESCE(MIN(o.hinh_anh), 'Chưa có ảnh') AS linkAnh,
           sp.ten AS tenSP,
           kt.ten AS tenKT,
           ms.ten AS tenMS,
           ms.ma  AS maMS,
           COALESCE(o.so_luong, 0) AS soLuong,
           o.gia_ban AS giaBan,
           o.trang_thai AS trangThai,
           o.mo_ta as moTa,
           dm.ten as tenDM,
           cl.ten as tenCL,
           gt.ten as tenGT,
           h.ten as tenHang
           FROM chi_tiet_san_pham o
           JOIN san_pham sp  ON o.san_pham_id = sp.id
           JOIN kich_thuoc kt ON o.kich_thuoc_id = kt.id
           JOIN mau_sac ms   ON o.mau_sac_id   = ms.id
           join danh_muc dm ON o.danh_muc_id = dm.id
           join chat_lieu cl ON o.chat_lieu_id = cl.id
           join gioi_tinh gt ON o.gioi_tinh_id =gt.id
           join hang h ON o.hang_id =h.id
            	where
             	o.so_luong > 0 AND
             	( o.kich_thuoc_id IN :#{#req.arrayKichThuoc} ) AND
             	( o.gia_ban BETWEEN :#{#req.giaBatDau} AND :#{#req.giaKetThuc} )
        GROUP BY o.id, sp.ten, kt.ten, ms.ten, ms.ma, o.so_luong, o.gia_ban, o.trang_thai
            """, nativeQuery = true)
    List<ChiTietSanPhamRepo> getLocKichThuoc(@Param("req") ChiTietSanPhamArraySearchRequest req);

    @Query(value = """

                SELECT
                o.id AS idCTSP,
                COALESCE(MIN(o.hinh_anh), 'Chưa có ảnh') AS linkAnh,
                sp.ten AS tenSP,
                kt.ten AS tenKT,
                ms.ten AS tenMS,
                ms.ma  AS maMS,
                COALESCE(o.so_luong, 0) AS soLuong,
                o.gia_ban AS giaBan,
                o.trang_thai AS trangThai,
                o.mo_ta as moTa,
                dm.ten as tenDM,
                cl.ten as tenCL,
                gt.ten as tenGT,
                h.ten as tenHang
            FROM chi_tiet_san_pham o
            JOIN san_pham sp  ON o.san_pham_id = sp.id
            JOIN kich_thuoc kt ON o.kich_thuoc_id = kt.id
            JOIN mau_sac ms   ON o.mau_sac_id   = ms.id
            JOIN danh_muc dm  ON o.danh_muc_id = dm.id
            JOIN chat_lieu cl ON o.chat_lieu_id = cl.id
            JOIN gioi_tinh gt ON o.gioi_tinh_id = gt.id
            JOIN hang h       ON o.hang_id = h.id
            WHERE o.so_luong > 0
              AND (sp.ten LIKE CONCAT('%', :tenTim, '%') OR ms.ten LIKE CONCAT('%', :tenTim, '%'))
            GROUP BY
                o.id, sp.ten, kt.ten, ms.ten, ms.ma,
                o.so_luong, o.gia_ban, o.trang_thai, o.mo_ta,
                dm.ten, cl.ten, gt.ten, h.ten;
            """ ,nativeQuery = true)
    List<ChiTietSanPhamRepo> getTimSanPham(@Param("tenTim") String tenTim);
}
