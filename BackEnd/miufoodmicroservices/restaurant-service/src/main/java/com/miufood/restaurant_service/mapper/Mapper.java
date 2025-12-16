package com.miufood.restaurant_service.mapper;

import com.miufood.restaurant_service.dto.MenuResponseDto;
import com.miufood.restaurant_service.dto.RatingResponseDto;
import com.miufood.restaurant_service.entity.MenuItem;
import com.miufood.restaurant_service.entity.Rating;

import java.awt.*;

public class Mapper {

    public static MenuResponseDto mapToMenuResponseDto(MenuItem menuItem) {
            return MenuResponseDto.builder()
                    .id(menuItem.getId())
                    .name(menuItem.getName())
                    .price(menuItem.getPrice())
                    .available(menuItem.getAvailable())
                    .build();
    }
    public static RatingResponseDto mapToRatingResponseDto(Rating rating) {
        return RatingResponseDto.builder()
                .rating(rating.getRating())
                .review(rating.getReview())
                .customerId(rating.getCustomerId())
                .build();
    }
}
