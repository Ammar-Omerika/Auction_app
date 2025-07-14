package com.omerika.backend.entity;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface CardInformationRepository extends JpaRepository<CardInformation, Integer> {

    Optional<CardInformation> findByUser_Id(Integer userId);

}