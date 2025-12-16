package com.miufood.restaurant_service.service;

import com.miufood.restaurant_service.dto.RatingRequestDto;
import com.miufood.restaurant_service.dto.RatingResponseDto;
import com.miufood.restaurant_service.entity.Rating;
import com.miufood.restaurant_service.entity.Restaurant;
import com.miufood.restaurant_service.exception.ResourceNotFoundException;
import com.miufood.restaurant_service.mapper.Mapper;
import com.miufood.restaurant_service.respository.RatingRepository;
import com.miufood.restaurant_service.respository.RestaurantRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class RatingServiceImp implements RatingService {
    @Autowired
    private RatingRepository ratingRepository;
    @Autowired
    private RestaurantRepository restaurantRepository;
    @Override
    public RatingResponseDto addRating(Long restaurantId,Long customerId,RatingRequestDto ratingRequestDto)  {
        Restaurant restaurant = restaurantRepository.findById(restaurantId)
                .orElseThrow(()->new ResourceNotFoundException("Restaurant not found for adding any ratings"));

       try {
           Rating rating = Rating.builder()
                   .rating((ratingRequestDto.getRating())>5?5:ratingRequestDto.getRating())
                   .review(ratingRequestDto.getReview())
                   .customerId(customerId)
                   .orderId(ratingRequestDto.getOrderId())
                   .restaurant(restaurant)
                   .createdAt(LocalDateTime.now())
                   .build();
           return Mapper.mapToRatingResponseDto(ratingRepository.save(rating));
       }catch (Exception ex){
           throw new ResourceNotFoundException("order may be expired or not exist");
       }
    }

    @Override
    public List<RatingResponseDto> getRatingByRestaurant(Long restaurantId) {
        return ratingRepository.findByRestaurantId(restaurantId).stream()
                .map(Mapper::mapToRatingResponseDto).toList();
    }

    @Override
    public Double getAverageRatingByRestaurant(Long restaurantId) {
        return ratingRepository.calculateAverageRating(restaurantId);
    }
}
