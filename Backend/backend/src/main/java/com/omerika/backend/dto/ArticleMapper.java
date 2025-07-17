package com.omerika.backend.dto;

import com.omerika.backend.entity.Article;

public class ArticleMapper {

    public static ArticleDTO mapToDto(Article article) {
        ArticleDTO dto = new ArticleDTO();

        dto.setId(article.getId());
        dto.setTitle(article.getTitle());
        dto.setDescription(article.getDescription());
        dto.setStartPrice(article.getStartPrice());
        dto.setStartDate(article.getStartDate());
        dto.setEndDate(article.getEndDate());

        if (article.getUser() != null) {
            dto.setUserId(article.getUser().getId());
        }

        if (article.getCategory() != null) {
            dto.setCategoryName(article.getCategory().getName());
        }

        if (article.getSubcategory() != null) {
            dto.setSubcategoryName(article.getSubcategory().getName());
        }

        return dto;
    }
}
