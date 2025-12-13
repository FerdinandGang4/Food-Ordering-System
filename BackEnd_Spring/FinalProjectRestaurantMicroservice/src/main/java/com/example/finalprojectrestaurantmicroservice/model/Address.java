package com.example.finalprojectrestaurantmicroservice.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import lombok.Data;

@Entity
@Data
public class Address {
    @Id
    @GeneratedValue
    private long addressId;
    private String state;
    private String city;
    private String street;
    private String number;
    private String zip;

}
