package com.ferdi.orderservice.Dtos;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@NoArgsConstructor
@AllArgsConstructor
public class OrderAddressDto {
    private String street;
    private String city;
    private String state;
    private String zipCode;
}
