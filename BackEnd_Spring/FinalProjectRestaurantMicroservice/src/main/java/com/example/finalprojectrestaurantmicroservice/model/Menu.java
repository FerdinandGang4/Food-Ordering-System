package com.example.finalprojectrestaurantmicroservice.model;

import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Entity
@Data
public class Menu {
    @Id
    @GeneratedValue
    private long menuId;
    @OneToMany
    private List<Product> products;
    @OneToOne
    private Restaurant restaurant;
}
