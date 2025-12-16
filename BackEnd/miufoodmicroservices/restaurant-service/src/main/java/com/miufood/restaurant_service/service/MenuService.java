package com.miufood.restaurant_service.service;

import com.miufood.restaurant_service.dto.MenuRequestDto;
import com.miufood.restaurant_service.dto.MenuResponseDto;

import java.util.List;


public interface MenuService {
    MenuResponseDto addMenuItem(Long restaurantId,MenuRequestDto menuRequestDto);
    MenuResponseDto updateMenuItem(Long restaurantId,Long menuId,MenuRequestDto menuRequestDto);
    Boolean deleteMenuItem(Long restaurantId,Long menuId);
    List<MenuResponseDto> findMenuByRestaurant(Long restaurantId);
    MenuResponseDto getMenuByRestaurantAndMenuId(Long restaurantId,Long menuId);

}
