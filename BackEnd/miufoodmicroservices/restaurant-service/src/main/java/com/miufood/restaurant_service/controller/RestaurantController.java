package com.miufood.restaurant_service.controller;

import com.miufood.restaurant_service.dto.RestaurantRequestDto;
import com.miufood.restaurant_service.dto.RestaurantResponseDto;
import com.miufood.restaurant_service.entity.Restaurant;
import com.miufood.restaurant_service.service.RestaurantService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/restaurants")
@RequiredArgsConstructor
@CrossOrigin
public class RestaurantController {
    @Autowired
    private RestaurantService restaurantService;

    // having role VENDOR
    @PostMapping("/{vendorId}")
    public RestaurantResponseDto createRestaurant(@PathVariable Long vendorId,@RequestBody RestaurantRequestDto restaurantRequestDto) {
        System.out.println("restaurantRequestDto = " + restaurantRequestDto);
        return restaurantService.createRestaurant(vendorId,restaurantRequestDto);
    }

    //having role VENDOR
    @PutMapping("/{restaurantId}")
    public RestaurantResponseDto updateRestaurant(@PathVariable Long restaurantId,@RequestBody RestaurantRequestDto restaurantRequestDto) {
        return restaurantService.updateRestaurant(restaurantId,restaurantRequestDto);
    }
    // having role ADMIN
    @PutMapping("/{restaurantId}/approve")
    public ResponseEntity<?> approveRestaurant(@PathVariable Long restaurantId) {
        Map<String, Object> map = new HashMap<>();
        if (restaurantService.approveRestaurant(restaurantId)) {
            map.put("message", "success");
            return ResponseEntity.ok(map);
        }
        map.put("message", "fail");
        return ResponseEntity.unprocessableEntity().body(map);
    }

    // CUSTOMER : can view all approved restaurants
    @GetMapping
    public List<RestaurantResponseDto> getRestaurants() {
        return restaurantService.getApprovedRestaurants();
    }
    // CUSTOMER : view restaurant details
    @GetMapping("/{id}")
    public RestaurantResponseDto getRestaurantById(@PathVariable Long id) {
        return restaurantService.getRestaurantById(id);
    }

}
