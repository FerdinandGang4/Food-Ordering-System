package com.example.finalprojectrestaurantmicroservice.service;

import com.example.finalprojectrestaurantmicroservice.repository.MenuRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class MenuService {
    @Autowired
    MenuRepository menuRepository;


}
