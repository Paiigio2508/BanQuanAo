package com.example.be.entity;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.SuperBuilder;

import java.time.LocalDateTime;

@Entity
@Table(name = "chat_lieu")
@Getter
@Setter
@ToString
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@SuperBuilder
public class GioHang{
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;
    @ManyToOne
    @JoinColumn(name = "id_khach_hang",referencedColumnName = "id")
    private NguoiDung nguoiDung;
    private LocalDateTime ngayTao;
    private LocalDateTime ngaySua;
}
