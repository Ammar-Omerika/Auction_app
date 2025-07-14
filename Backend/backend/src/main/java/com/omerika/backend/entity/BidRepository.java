package com.omerika.backend.entity;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BidRepository extends JpaRepository<Bid, Integer> {

    List<Bid> findByArticle_Id(Integer articleId);

    List<Bid> findByUser_Id(Integer userId);
}
