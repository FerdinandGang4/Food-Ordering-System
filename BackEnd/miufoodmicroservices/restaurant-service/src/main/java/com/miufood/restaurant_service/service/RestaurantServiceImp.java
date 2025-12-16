package com.miufood.restaurant_service.service;

import com.miufood.restaurant_service.dto.RestaurantRequestDto;
import com.miufood.restaurant_service.dto.RestaurantResponseDto;
import com.miufood.restaurant_service.entity.Restaurant;
import com.miufood.restaurant_service.entity.RestaurantStatus;
import com.miufood.restaurant_service.exception.ResourceNotFoundException;
import com.miufood.restaurant_service.respository.RestaurantRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class RestaurantServiceImp implements RestaurantService {
    @Autowired
    private RestaurantRepository restaurantRepository;


    @Override
    public RestaurantResponseDto createRestaurant(Long vendorId,RestaurantRequestDto restaurantRequestDto) {
        Restaurant restaurant = Restaurant.builder()
                .name(restaurantRequestDto.getName())
                .description(restaurantRequestDto.getDescription())
                .cuisine(restaurantRequestDto.getCuisine())
                .address(restaurantRequestDto.getAddress())
                .status(RestaurantStatus.PENDING)
                .averageRating(0.0)
                .vendorId(vendorId)
                .createdAt(LocalDateTime.now())
                .build();
        return mapToRestaurantResponseDto(restaurantRepository.save(restaurant));
    }

    // can only update by VENDOR
    @Override
    public RestaurantResponseDto updateRestaurant(Long restaurantId, RestaurantRequestDto restaurantRequestDto) {
        Restaurant restaurant = this.getRestaurantEntity(restaurantId);
        restaurant.setName(restaurantRequestDto.getName());
        restaurant.setDescription(restaurantRequestDto.getDescription());
        restaurant.setCuisine(restaurantRequestDto.getCuisine());
        restaurant.setAddress(restaurantRequestDto.getAddress());
        return mapToRestaurantResponseDto(restaurantRepository.save(restaurant));
    }

    @Override
    public Boolean deleteRestaurant(Long restaurantId) {
        return null;
    }

    @Override
    public boolean approveRestaurant(Long restaurantId) {
        Restaurant restaurant =this.getRestaurantEntity(restaurantId);
        if(restaurant.getStatus() == RestaurantStatus.APPROVED) return false;
        restaurant.setStatus(RestaurantStatus.APPROVED);
        restaurantRepository.save(restaurant);
        return true;
    }

    @Override
    public List<RestaurantResponseDto> getApprovedRestaurants() {
        return restaurantRepository.findByStatus(RestaurantStatus.APPROVED).stream().map(this::mapToRestaurantResponseDto).toList();
    }

    @Override
    public RestaurantResponseDto getRestaurantById(Long restaurantId) {
        Restaurant restaurant = this.getRestaurantEntity(restaurantId);
        return  mapToRestaurantResponseDto(restaurant);
    }

    private RestaurantResponseDto mapToRestaurantResponseDto(Restaurant restaurant) {
       return RestaurantResponseDto.builder()
               .id(restaurant.getId())
               .name(restaurant.getName())
               .address(restaurant.getAddress())
               .description(restaurant.getDescription())
               .cuisine(restaurant.getCuisine())
               .status(restaurant.getStatus())
               .averageRating(restaurant.getAverageRating())
               .build();
    }

    private Restaurant getRestaurantEntity(Long restaurantId) {
        return restaurantRepository.findById(restaurantId).orElseThrow(()->new ResourceNotFoundException("Restaurant Not Found Exception"));
    }
}
