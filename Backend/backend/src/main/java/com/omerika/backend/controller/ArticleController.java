package com.omerika.backend.controller;

import com.omerika.backend.dto.ArticleDTO;
import com.omerika.backend.dto.ArticleMapper;
import com.omerika.backend.entity.*;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.*;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/v1/articles")
@RequiredArgsConstructor
public class ArticleController {

    private final ArticleRepository articleRepository;
    private final UserRepository userRepository;
    private final CategoryRepository categoryRepository;
    private final SubcategoryRepository subcategoryRepository;

    @GetMapping
    public ResponseEntity<Page<ArticleDTO>> getArticles(
            @RequestParam(required = false) Integer categoryId,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "8") int size,
            @RequestParam(defaultValue = "startDate") String sortBy,
            @RequestParam(defaultValue = "desc") String direction
    ) {
        Sort sort = direction.equalsIgnoreCase("asc") ?
                Sort.by(sortBy).ascending() :
                Sort.by(sortBy).descending();

        Pageable pageable = PageRequest.of(page, size, sort);

        Page<Article> articles = (categoryId != null) ?
                articleRepository.findByCategory_Id(categoryId, pageable) :
                articleRepository.findAll(pageable);

        Page<ArticleDTO> articleDTOs = articles.map(ArticleMapper::mapToDto);

        return ResponseEntity.ok(articleDTOs);
    }

    @PostMapping
    public ResponseEntity<ArticleDTO> createArticle(
            @RequestBody ArticleDTO dto,
            Authentication authentication
    ) {
        String userEmail = authentication.getName();
        User seller = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Category category = categoryRepository.findByName(dto.getCategoryName())
                .orElseThrow(() -> new RuntimeException("Category not found"));

        Subcategory subcategory = subcategoryRepository.findByName(dto.getSubcategoryName())
                .orElseThrow(() -> new RuntimeException("Subcategory not found"));

        Article article = new Article();
        article.setTitle(dto.getTitle());
        article.setDescription(dto.getDescription());
        article.setStartPrice(dto.getStartPrice());
        article.setStartDate(dto.getStartDate());
        article.setEndDate(dto.getEndDate());
        article.setUser(seller);
        article.setCategory(category);
        article.setSubcategory(subcategory);// ✅ now it's not null


        Article saved = articleRepository.save(article);
        return ResponseEntity.ok(ArticleMapper.mapToDto(saved));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ArticleDTO> getArticleById(@PathVariable Integer id) {
        return articleRepository.findById(id)
                .map(ArticleMapper::mapToDto)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
}
