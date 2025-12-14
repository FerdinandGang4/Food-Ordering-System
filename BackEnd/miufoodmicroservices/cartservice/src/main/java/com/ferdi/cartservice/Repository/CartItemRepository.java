package com.ferdi.cartservice.Repository;

import com.ferdi.cartservice.Entity.CartItem;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CartItemRepository extends JpaRepository<CartItem, Long> {
}
