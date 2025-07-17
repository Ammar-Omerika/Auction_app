package com.omerika.backend.controller;

import com.omerika.backend.dto.ArticleImagesDTO;
import com.omerika.backend.entity.Article;
import com.omerika.backend.entity.ArticleImages;
import com.omerika.backend.entity.ArticleRepository;
import com.omerika.backend.entity.ArticleImagesRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/article-images")
@RequiredArgsConstructor
public class ArticleImagesController {

    private final ArticleRepository articleRepository;
    private final ArticleImagesRepository articleImagesRepository;

    @PostMapping
    public ResponseEntity<Void> addImageToArticle(@RequestBody ArticleImagesDTO dto) {
        Article article = articleRepository.findById(dto.getArticleId())
                .orElseThrow(() -> new RuntimeException("Article not found"));

        ArticleImages image = ArticleImages.builder()
                .link(dto.getLink())
                .article(article)
                .build();

        articleImagesRepository.save(image);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/{articleId}")
    public ResponseEntity<List<String>> getImagesForArticle(@PathVariable Integer articleId) {
        List<ArticleImages> images = articleImagesRepository.findByArticle_Id(articleId);
        List<String> links = images.stream()
                .map(ArticleImages::getLink)
                .toList();
        return ResponseEntity.ok(links);
    }


}
