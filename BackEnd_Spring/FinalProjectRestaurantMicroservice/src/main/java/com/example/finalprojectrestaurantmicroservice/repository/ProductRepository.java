package com.example.finalprojectrestaurantmicroservice.repository;

import com.example.finalprojectrestaurantmicroservice.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductRepository extends JpaRepository<Product, Long> {
}
