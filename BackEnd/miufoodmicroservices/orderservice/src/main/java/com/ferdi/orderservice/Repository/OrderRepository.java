package com.ferdi.orderservice.Repository;

import com.ferdi.orderservice.Entity.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {

    Optional<Order> findByOrderNumber(String orderNumber);

    // Optional: find all orders for a user
    List<Order> findByUserId(Long userId);
}
