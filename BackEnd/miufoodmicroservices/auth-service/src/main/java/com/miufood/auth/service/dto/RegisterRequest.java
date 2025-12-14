package com.miufood.auth.service.dto;

import com.miufood.auth.service.model.Role;
import lombok.Data;

@Data
public class RegisterRequest {
    private String name;
    private String email;
    private String password;
    private Role role;
}
