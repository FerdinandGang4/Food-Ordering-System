package com.example.finalprojectrestaurantmicroservice.model;


import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class Rating {
    @Id
    @GeneratedValue
    private long ratingId;
    private double rating;
    private String description;
    @ManyToOne
    @JoinColumn(name = "restaurant_id")
    private Restaurant restaurant;
}
