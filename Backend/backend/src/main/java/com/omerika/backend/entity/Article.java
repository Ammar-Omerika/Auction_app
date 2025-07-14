package com.omerika.backend.entity;

import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "article")
public class Article {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String title;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false,
            foreignKey = @ForeignKey(name = "fk_article_user"))
    private User user;

    @ManyToOne
    @JoinColumn(name = "category_id", nullable = false,
            foreignKey = @ForeignKey(name = "fk_article_category"))
    private Category category;

    @ManyToOne
    @JoinColumn(name = "subcategory_id", nullable = false,
            foreignKey = @ForeignKey(name = "fk_article_subcategory"))
    private Subcategory subcategory;

    @Column(columnDefinition = "TEXT")
    private String description;

    private LocalDateTime startDate;

    private LocalDateTime endDate;

    @Enumerated(EnumType.STRING)
    private Color color;

    @Enumerated(EnumType.STRING)
    private Size size;

    @Column(precision = 10, scale = 2)
    private BigDecimal startPrice;

    @OneToMany(mappedBy = "article", cascade = CascadeType.ALL)
    private List<ArticleImages> images;

    @OneToMany(mappedBy = "article", cascade = CascadeType.ALL)
    private List<Wishlist> wishlists;

    @OneToMany(mappedBy = "article", cascade = CascadeType.ALL)
    private List<Bid> bids;

}

