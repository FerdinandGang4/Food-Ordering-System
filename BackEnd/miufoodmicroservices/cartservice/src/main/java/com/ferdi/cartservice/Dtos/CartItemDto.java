package com.ferdi.cartservice.Dtos;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CartItemDto {
    private Long itemId;
    private Long productId;
    private String productName;

    private Integer quantity;

    private BigDecimal price;

    public BigDecimal getTotalPrice() {
        return price.multiply(BigDecimal.valueOf(quantity));
    }
}
