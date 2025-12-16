package com.miufood.restaurant_service.dto;

import lombok.Builder;
import lombok.Data;

import java.math.BigDecimal;

@Data
@Builder
public class MenuRequestDto {
    private String name;
    private String description;
    private BigDecimal price;
    private String category;
    private String image;
    private Boolean available;
}
