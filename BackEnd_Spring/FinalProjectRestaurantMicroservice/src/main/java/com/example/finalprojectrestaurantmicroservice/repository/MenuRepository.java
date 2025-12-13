package com.example.finalprojectrestaurantmicroservice.repository;

import com.example.finalprojectrestaurantmicroservice.model.Menu;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MenuRepository extends JpaRepository<Menu, Long> {
}
