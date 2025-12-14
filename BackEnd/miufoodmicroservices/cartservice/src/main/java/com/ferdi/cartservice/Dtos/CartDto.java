package com.ferdi.cartservice.Dtos;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.List;


@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CartDto {
    private Long cartId;

    private Long userId;

    private List<CartItemDto> items;

    private BigDecimal totalAmount;

    // Optional: calculate total if not set
    public BigDecimal calculateTotal() {
        return items.stream()
                .map(CartItemDto::getTotalPrice)
                .reduce(BigDecimal.ZERO, BigDecimal::add);
    }
}
