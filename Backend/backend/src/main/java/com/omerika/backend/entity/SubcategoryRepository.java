package com.omerika.backend.entity;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface SubcategoryRepository extends JpaRepository<Subcategory, Integer> {
    List<Subcategory> findByCategory_Id(Integer categoryId);
    Optional<Subcategory> findByName(String name);
}
