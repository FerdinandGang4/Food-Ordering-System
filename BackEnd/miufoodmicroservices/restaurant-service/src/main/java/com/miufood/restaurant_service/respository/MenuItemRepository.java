package com.miufood.restaurant_service.respository;

import com.miufood.restaurant_service.entity.MenuItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface MenuItemRepository extends JpaRepository<MenuItem, Long> {
    List<MenuItem> findByRestaurantIdAndAvailableTrue(Long restaurantId);
    Optional<MenuItem> findByIdAndRestaurantId(Long menuId, Long restaurantId);


}
