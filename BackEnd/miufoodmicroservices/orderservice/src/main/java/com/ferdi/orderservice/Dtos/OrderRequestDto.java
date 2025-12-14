package com.ferdi.orderservice.Dtos;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class OrderRequestDto {
    private Long id;
    private Long userId;
    private List<OrderItemDto> items; // assuming you have an OrderItem entity
    private OrderAddressDto shippingAddress;
    private OrderAddressDto billingAddress;
    private BigDecimal totalPrice;
    private String status;
}
