package com.miufood.restaurant_service.respository;

import com.miufood.restaurant_service.entity.Rating;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RatingRepository extends JpaRepository<Rating, Long> {
    boolean existsByOrderId(Long orderId);

    List<Rating> findByRestaurantId(Long restaurantId);

    @Query("SELECT AVG(r.rating) FROM Rating r WHERE r.restaurant.id = :restaurantId")
    Double calculateAverageRating(Long restaurantId);

}
