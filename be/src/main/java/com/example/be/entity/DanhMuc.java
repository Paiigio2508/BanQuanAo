package com.example.be.entity;

import com.example.be.entity.base.BaseEntityBangCon;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.*;
import lombok.experimental.SuperBuilder;

@Entity
@Table(name = "danh_muc")
@Getter
@Setter
@ToString
@NoArgsConstructor(access = AccessLevel.PUBLIC)
@SuperBuilder
public class DanhMuc extends BaseEntityBangCon {
}
