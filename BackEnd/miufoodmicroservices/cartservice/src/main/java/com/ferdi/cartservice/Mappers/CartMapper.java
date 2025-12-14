package com.ferdi.cartservice.Mappers;

import com.ferdi.cartservice.Dtos.CartDto;
import com.ferdi.cartservice.Entity.Cart;
import lombok.experimental.UtilityClass;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.util.stream.Collectors;

@Component
public class CartMapper {
    @Autowired
    private  CartItemMapper cartItemMapper;

    public CartDto toDto(Cart cart) {
        if (cart == null) return null;

        BigDecimal total = cart.getItems().stream()
                .map(item -> item.getPrice()
                        .multiply(BigDecimal.valueOf(item.getQuantity())))
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        return CartDto.builder()
                .cartId(cart.getId())
                .userId(cart.getUserId())
                .items(
                        cart.getItems().stream()
                                .map(cartItemMapper::toDto)
                                .collect(Collectors.toList())
                )
                .totalAmount(total)
                .build();
    }
}
