package com.example.be.entity;

import com.example.be.entity.base.BaseEntityBangCon;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.*;
import lombok.experimental.SuperBuilder;

@Entity
@Table(name = "chat_lieu")
@Getter
@Setter
@ToString
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@SuperBuilder
public class ChatLieu extends BaseEntityBangCon {
}
