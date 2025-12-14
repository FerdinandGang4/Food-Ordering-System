package com.miufood.auth.service.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class LoginResponse
{
    private String token;
    private Long userId;
    private String name;
    private Boolean success;
}
