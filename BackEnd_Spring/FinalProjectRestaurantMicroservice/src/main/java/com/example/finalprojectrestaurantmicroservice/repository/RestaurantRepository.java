package com.example.finalprojectrestaurantmicroservice.repository;

import com.example.finalprojectrestaurantmicroservice.model.Restaurant;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RestaurantRepository extends JpaRepository<Restaurant, Long> {

}
