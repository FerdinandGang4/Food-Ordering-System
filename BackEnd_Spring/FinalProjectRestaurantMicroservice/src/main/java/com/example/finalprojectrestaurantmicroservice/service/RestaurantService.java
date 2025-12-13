package com.example.finalprojectrestaurantmicroservice.service;

import com.example.finalprojectrestaurantmicroservice.model.Restaurant;
import com.example.finalprojectrestaurantmicroservice.repository.RestaurantRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RestaurantService {
    private RestaurantRepository restaurantRepository;

    public Restaurant create(Restaurant restaurant){
        return restaurantRepository.save(restaurant);
    }

    public Restaurant getById(long id) {
        return restaurantRepository.findById(id).orElseThrow(
                () -> new RuntimeException("restaurant not found"));
    }

    public List<Restaurant> getAll(){
        return restaurantRepository.findAll();
    }

    public Restaurant update(long id, Restaurant restaurant){
        Restaurant current = restaurantRepository.findById(id).orElseThrow(
                () -> new RuntimeException("restaruatn not found"));
        current.setRestaurantName(restaurant.getRestaurantName());
        current.setRestaurantId(restaurant.getRestaurantId());
        current.setAddress(restaurant.getAddress());
        current.setEmail(restaurant.getEmail());
        current.setPassword(restaurant.getPassword());
        current.setPhoneNumber(restaurant.getPhoneNumber());
        current.setRatings(restaurant.getRatings());

        return restaurantRepository.save(current);
    }

    public void delete(long id){
        if (!restaurantRepository.existsById(id)){
            throw new RuntimeException("restaurant not found");
        }
        restaurantRepository.deleteById(id);
    }
}
