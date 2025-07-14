package com.omerika.backend.entity;

import jakarta.persistence.*;
import lombok.*;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "rating")
public class Rating {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    //User rating
    @ManyToOne
    @JoinColumn(name = "rater_id", nullable = false,
            foreignKey = @ForeignKey(name = "fk_rating_rater"))
    private User rater;

    //User being rated
    @ManyToOne
    @JoinColumn(name = "receiver_id", nullable = false,
            foreignKey = @ForeignKey(name = "fk_rating_receiver"))
    private User receiver;

    @Column(nullable = false)
    private Integer rating;
}
