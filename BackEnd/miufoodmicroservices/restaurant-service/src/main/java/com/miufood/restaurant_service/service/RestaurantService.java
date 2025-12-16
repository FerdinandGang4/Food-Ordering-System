package com.miufood.restaurant_service.service;

import com.miufood.restaurant_service.dto.RestaurantRequestDto;
import com.miufood.restaurant_service.dto.RestaurantResponseDto;

import java.util.List;


public interface RestaurantService {
    RestaurantResponseDto createRestaurant(Long vendorId,RestaurantRequestDto restaurantRequestDto);
    RestaurantResponseDto updateRestaurant(Long restaurantId, RestaurantRequestDto restaurantRequestDto);
    Boolean deleteRestaurant(Long restaurantId);
    boolean approveRestaurant(Long restaurantId);
    List<RestaurantResponseDto> getApprovedRestaurants();
    RestaurantResponseDto getRestaurantById(Long restaurantId);
}
