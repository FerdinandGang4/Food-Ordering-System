package com.miufood.restaurant_service.service;

import com.miufood.restaurant_service.dto.RatingRequestDto;
import com.miufood.restaurant_service.dto.RatingResponseDto;

import java.util.List;


public interface RatingService {
    RatingResponseDto addRating(Long restaurantId,Long customerId,RatingRequestDto ratingRequestDto);
    List<RatingResponseDto> getRatingByRestaurant(Long restaurantId);
    Double getAverageRatingByRestaurant(Long restaurantId);
}
