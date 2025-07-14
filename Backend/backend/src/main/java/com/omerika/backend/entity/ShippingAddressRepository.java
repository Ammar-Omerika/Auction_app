package com.omerika.backend.entity;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ShippingAddressRepository extends JpaRepository<ShippingAddress, Integer> {

    Optional<ShippingAddress> findByUser_Id(Integer userId);
}
