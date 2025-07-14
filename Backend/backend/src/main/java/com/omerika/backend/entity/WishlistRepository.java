package com.omerika.backend.entity;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface WishlistRepository extends JpaRepository<Wishlist, Integer> {

    List<Wishlist> findByUser_Id(Integer userId);

    Optional<Wishlist> findByUser_IdAndArticle_Id(Integer userId, Integer articleId);

    void deleteByUser_IdAndArticle_Id(Integer userId, Integer articleId);
}
