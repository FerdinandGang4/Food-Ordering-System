package com.example.finalprojectrestaurantmicroservice.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import lombok.Data;

@Entity
@Data
public class Product {
    @Id
    @GeneratedValue
    private long productId;
    private String name;
    private String description;
    private double price;
    private String category;
}
