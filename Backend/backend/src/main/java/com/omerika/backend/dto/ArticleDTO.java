package com.omerika.backend.dto;

import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
public class ArticleDTO {
    private Integer id;
    private String title;
    private String description;
    private BigDecimal startPrice;
    private LocalDateTime startDate;
    private LocalDateTime endDate;
    private Integer userId;
    private String categoryName;
    private String subcategoryName;
}
