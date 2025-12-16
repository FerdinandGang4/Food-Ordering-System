package com.miufood.restaurant_service.respository;

import com.miufood.restaurant_service.entity.Restaurant;
import com.miufood.restaurant_service.entity.RestaurantStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RestaurantRepository extends JpaRepository<Restaurant, Long> {
    List<Restaurant> findByStatus(RestaurantStatus status);
}
