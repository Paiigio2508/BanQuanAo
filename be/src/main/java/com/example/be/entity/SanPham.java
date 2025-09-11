package com.example.be.entity;

import com.example.be.entity.base.BaseEntityBangCon;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.*;
import lombok.experimental.SuperBuilder;

@Entity
@Table(name = "san_pham")
@Getter
@Setter
@ToString
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@SuperBuilder
public class SanPham extends BaseEntityBangCon {
}
