package com.miufood.restaurant_service.dto;

import lombok.Data;

@Data
public class RestaurantRequestDto {
    private String name;
    private String description;
    private String cuisine;
    private String address;
}
