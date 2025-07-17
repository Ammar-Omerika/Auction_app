package com.omerika.backend.entity;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;

import java.util.List;

public interface ArticleRepository extends JpaRepository<Article, Integer> {

    List<Article> findByUser_Id(Integer userId);

    List<Article> findByCategory_Id(Integer categoryId);

    Page<Article> findByCategory_Id(Integer categoryId, Pageable pageable);

    List<Article> findBySubcategory_Id(Integer subcategoryId);

    List<Article> findByCategory_IdAndSubcategory_IdAndSizeInAndColorIn(
            Integer categoryId,
            Integer subcategoryId,
            List<Size> sizes,
            List<Color> colors
    );
}
