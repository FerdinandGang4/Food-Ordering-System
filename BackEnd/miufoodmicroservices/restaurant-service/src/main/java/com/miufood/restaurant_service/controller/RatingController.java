package com.miufood.restaurant_service.controller;

import com.miufood.restaurant_service.dto.RatingRequestDto;
import com.miufood.restaurant_service.dto.RatingResponseDto;
import com.miufood.restaurant_service.service.RatingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/api/restaurants/{restaurantId}/ratings")
@CrossOrigin
public class RatingController {
   //
    private RatingService ratingService;
    public RatingController(RatingService ratingService){
        this.ratingService=ratingService;
    }
    // CUSTOMER can submit rating
    @PostMapping("/{customerId}")
    public RatingResponseDto submitRating(@PathVariable Long restaurantId,@PathVariable Long customerId, @RequestBody RatingRequestDto ratingRequestDto) {

        return ratingService.addRating(restaurantId,customerId,ratingRequestDto);
    }

    // CUSTOMER view ratings
    @GetMapping
    public List<RatingResponseDto> getRatings(@PathVariable Long restaurantId) {
        return ratingService.getRatingByRestaurant(restaurantId);
    }
    // CUSTOMER can view average rating
    @GetMapping("/average")
    public Double getAverageRating(@PathVariable Long restaurantId) {
        return ratingService.getAverageRatingByRestaurant(restaurantId);
    }
}
