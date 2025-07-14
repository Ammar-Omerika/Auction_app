package com.omerika.backend.entity;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface RatingRepository extends JpaRepository<Rating, Integer> {

    List<Rating> findByReceiver_Id(Integer receiverId);

    List<Rating> findByRater_Id(Integer raterId);

    boolean existsByRater_IdAndReceiver_Id(Integer raterId, Integer receiverId);
}
