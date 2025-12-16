package com.miufood.restaurant_service.dto;

import lombok.Data;

@Data
public class RatingRequestDto {
    // rating will be from 1 to 5
    private Integer rating;
    private String review;
    private Long orderId;
}
