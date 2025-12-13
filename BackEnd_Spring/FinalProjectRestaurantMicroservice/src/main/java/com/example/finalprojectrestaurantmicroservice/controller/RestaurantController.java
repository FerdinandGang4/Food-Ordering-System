package com.example.finalprojectrestaurantmicroservice.controller;

import com.example.finalprojectrestaurantmicroservice.model.Restaurant;
import com.example.finalprojectrestaurantmicroservice.service.RestaurantService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/Restaurants")
public class RestaurantController {
    private RestaurantService restaurantService;

    @PostMapping
    public Restaurant create(@RequestBody Restaurant restaurant){
        return restaurantService.create(restaurant);
    }

    @GetMapping("/{id}")
    public Restaurant getById(@PathVariable long id){
        return restaurantService.getById(id);
    }

    @GetMapping
    public List<Restaurant> getAll(){
        return restaurantService.getAll();
    }

    @PutMapping("/{id}")
    public Restaurant update(@PathVariable long id, @RequestBody Restaurant restaurant){
        return restaurantService.update(id, restaurant);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable long id){
        restaurantService.delete(id);
    }

}
