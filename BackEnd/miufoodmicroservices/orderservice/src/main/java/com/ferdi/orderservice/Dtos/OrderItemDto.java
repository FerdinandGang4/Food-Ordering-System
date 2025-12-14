package com.ferdi.orderservice.Dtos;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class OrderItemDto {
    private Long productId;
    private String productName;
    private int quantity;
    private BigDecimal price;
}
