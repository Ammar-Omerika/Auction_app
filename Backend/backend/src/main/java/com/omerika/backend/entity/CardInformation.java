package com.omerika.backend.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "card_information")
public class CardInformation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @OneToOne
    @JoinColumn(name = "user_id", nullable = true, unique = true,
            foreignKey = @ForeignKey(name = "fk_cardinfo_user"))
    private User user;

    private String nameOnCard;

    private String cardNumber;

    private LocalDate expirationDate;

    private String cvcCvv;
}
