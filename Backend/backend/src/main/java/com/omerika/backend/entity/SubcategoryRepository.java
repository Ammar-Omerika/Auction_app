package com.omerika.backend.entity;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SubcategoryRepository extends JpaRepository<Subcategory, Integer> {
    List<Subcategory> findByCategory_Id(Integer categoryId);
}
