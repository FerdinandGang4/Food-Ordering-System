package com.miufood.restaurant_service.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class RatingResponseDto {
    private Integer rating;
    private String review;
    private Long customerId;
}
