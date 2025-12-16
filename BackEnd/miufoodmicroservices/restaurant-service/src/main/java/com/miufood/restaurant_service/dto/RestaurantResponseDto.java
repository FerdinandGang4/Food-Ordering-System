package com.miufood.restaurant_service.dto;

import com.miufood.restaurant_service.entity.RestaurantStatus;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class RestaurantResponseDto {
    private Long id;
    private String name;
    private String description;
    private String cuisine;
    private String address;
    private RestaurantStatus status;
    private Double averageRating;
}
