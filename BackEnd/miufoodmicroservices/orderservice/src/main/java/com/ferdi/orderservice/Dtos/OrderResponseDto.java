package com.ferdi.orderservice.Dtos;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class OrderResponseDto {
    private Long id;
    private String customerName;
    private List<OrderItemDto> items;
    private OrderAddressDto shippingAddress;
    private OrderAddressDto billingAddress;
    private BigDecimal totalPrice;
    private String status;
}
