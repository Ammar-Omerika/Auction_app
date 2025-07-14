package com.omerika.backend.entity;

import jakarta.persistence.*;
import lombok.*;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "shipping_address")
public class ShippingAddress {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @OneToOne
    @JoinColumn(name = "user_id", nullable = true, unique = true,
            foreignKey = @ForeignKey(name = "fk_shipping_user"))
    private User user;

    private String street;

    private String city;

    private Integer zipCode;

    private String state;

    private String country;
}
