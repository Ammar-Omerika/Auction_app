package com.omerika.backend.entity;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ArticleRepository extends JpaRepository<Article, Integer> {

    List<Article> findByUser_Id(Integer userId);

    List<Article> findByCategory_Id(Integer categoryId);

    List<Article> findBySubcategory_Id(Integer subcategoryId);

    List<Article> findByCategory_IdAndSubcategory_IdAndSizeInAndColorIn(
            Integer categoryId,
            Integer subcategoryId,
            List<Size> sizes,
            List<Color> colors
    );
}
