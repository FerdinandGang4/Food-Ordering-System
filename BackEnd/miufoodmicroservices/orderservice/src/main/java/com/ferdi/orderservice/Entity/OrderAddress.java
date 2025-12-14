package com.ferdi.orderservice.Entity;

import jakarta.persistence.Embeddable;
import lombok.Data;

@Embeddable
@Data
public class OrderAddress {
    private String street;
    private String city;
    private String state;
    private String zipCode;
}
