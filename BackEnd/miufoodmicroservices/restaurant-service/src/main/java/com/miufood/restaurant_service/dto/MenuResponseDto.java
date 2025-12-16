package com.miufood.restaurant_service.dto;

import lombok.Builder;
import lombok.Data;

import java.math.BigDecimal;

@Data
@Builder
public class MenuResponseDto {
    private Long id;
    private String name;
    private BigDecimal price;
    private Boolean available;
}
