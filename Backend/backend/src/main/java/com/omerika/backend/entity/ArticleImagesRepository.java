package com.omerika.backend.entity;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ArticleImagesRepository extends JpaRepository<ArticleImages, Integer> {

    List<ArticleImages> findByArticle_Id(Integer articleId);
}

