package com.omerika.backend.entity;

import jakarta.persistence.*;
import lombok.*;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "wishlist", uniqueConstraints = {
        @UniqueConstraint(columnNames = {"user_id", "article_id"})
})
public class Wishlist {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false,
            foreignKey = @ForeignKey(name = "fk_wishlist_user"))
    private User user;

    @ManyToOne
    @JoinColumn(name = "article_id", nullable = false,
            foreignKey = @ForeignKey(name = "fk_wishlist_article"))
    private Article article;
}
