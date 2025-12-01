package com.example.be.repository.SanPham;

import com.example.be.dto.repon.AddChiTietSanPhamRepo;
import com.example.be.dto.repon.ChiTietSanPhamRepo;
import com.example.be.dto.repon.DetailChiTietSanPhamRepo;
import com.example.be.dto.request.admin.sanphamrequest.ChiTietSanPhamSearchRequest;
import com.example.be.entity.ChiTietSanPham;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ChiTietSanPhamRepository extends JpaRepository<ChiTietSanPham, String> {
    @Query(value = """
					SELECT o.id AS idCTSP,
                    COALESCE(MAX(ha.url), 'Chưa có ảnh') AS linkAnh,
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
                                                                      join hinh_anh ha on o.id = ha.chi_tiet_san_pham_id
                    WHERE (:idSP IS NULL OR o.san_pham_id = :idSP)
                    GROUP BY o.id, sp.ten, kt.ten, ms.ten, ms.ma, o.so_luong, o.gia_ban, o.trang_thai
""" ,nativeQuery = true)
    List<ChiTietSanPhamRepo> getALLCTSP(@Param("idSP") String idSP);

    @Query(value = """
					SELECT o.id AS idCTSP,
                     sp.id AS idSP,
                     kt.id AS idKT,
                     ms.id AS idMS         
                    FROM chi_tiet_san_pham o
                    JOIN san_pham sp  ON o.san_pham_id = sp.id
                    JOIN kich_thuoc kt ON o.kich_thuoc_id = kt.id
                    JOIN mau_sac ms ON o.mau_sac_id = ms.id
                    GROUP BY o.id, sp.id, kt.id, ms.id
""" ,nativeQuery = true)
    List<AddChiTietSanPhamRepo> getALL();

    @Query(value = """
            SELECT o.hinh_anh as hinhAnh,o.id  AS id,o.mo_ta AS moTa ,sp.id AS sanPham,sp.ten AS tenSP ,kt.id AS kichThuoc,ms.id AS mauSac,cl.id AS chatLieu,gt.id AS gioiTinh,dm.id AS danhMuc
            ,h.id AS hang,o.so_luong AS soLuong,o.gia_ban AS giaBan,o.trang_thai AS trangThai
            FROM chi_tiet_san_pham o
            JOIN san_pham sp  on o.san_pham_id=sp.id
            JOIN kich_thuoc kt  on o.kich_thuoc_id=kt.id
            JOIN mau_sac ms  on o.mau_sac_id=ms.id
            JOIN chat_lieu cl  on o.chat_lieu_id=cl.id
            JOIN gioi_tinh gt  on o.gioi_tinh_id=gt.id
            JOIN danh_muc dm  on o.danh_muc_id=dm.id
            JOIN hang h  on o.hang_id=h.id
            WHERE o.id=:idCT
                     """, nativeQuery = true)
    DetailChiTietSanPhamRepo detailCTSP(@Param("idCT") String idCT);

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
           GROUP BY o.id, sp.ten, kt.ten, ms.ten, ms.ma, o.so_luong, o.gia_ban, o.trang_thai,o.san_pham_id,o.kich_thuoc_id,o.mau_sac_id,o.chat_lieu_id,o.gioi_tinh_id,o.danh_muc_id,o.hang_id
            HAVING                                                                
            ((:#{#ctspSearch.idKT} IS NULL OR o.kich_thuoc_id =:#{#ctspSearch.idKT} ) AND
            (:#{#ctspSearch.idMS} IS NULL OR o.mau_sac_id =:#{#ctspSearch.idMS} ) AND
            (:#{#ctspSearch.idCL} IS NULL OR o.chat_lieu_id =:#{#ctspSearch.idCL} ) AND
            (:#{#ctspSearch.idGT} IS NULL OR o.gioi_tinh_id =:#{#ctspSearch.idGT} ) AND
            (:#{#ctspSearch.idDM} IS NULL OR o.danh_muc_id =:#{#ctspSearch.idDM} ) AND
            (:#{#ctspSearch.idH} IS NULL OR o.hang_id =:#{#ctspSearch.idH} ) AND
            (:#{#ctspSearch.trangThaiCT} IS NULL OR o.trang_thai =:#{#ctspSearch.trangThaiCT}) AND
            (o.so_luong BETWEEN :#{#ctspSearch.soLuongBatDau} AND :#{#ctspSearch.soLuongKetThuc} ) AND
            (o.gia_ban BETWEEN :#{#ctspSearch.giaBanBatDau} AND :#{#ctspSearch.giaBanKetThuc})
            AND o.san_pham_id =:idSP)
                     """, nativeQuery = true)
    List<ChiTietSanPhamRepo> getTim(@Param("idSP") String idSP, ChiTietSanPhamSearchRequest ctspSearch);


}
