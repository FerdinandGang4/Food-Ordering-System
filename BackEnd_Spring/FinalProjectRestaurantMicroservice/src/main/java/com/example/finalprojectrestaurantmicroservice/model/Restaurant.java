package com.example.finalprojectrestaurantmicroservice.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Restaurant {
    @Id
    @GeneratedValue
    private long restaurantId;
    private String restaurantName;
    private String password;
    private String email;
    private String phoneNumber;
    @OneToOne
    @JoinColumn(name = "adress_id")
    private Address address;
    @OneToMany(mappedBy = "restaurant")
    private List<Rating> ratings;
    @OneToOne
    private Menu menu;
}
