package com.miufood.restaurant_service.controller;


import com.miufood.restaurant_service.dto.MenuRequestDto;
import com.miufood.restaurant_service.dto.MenuResponseDto;
import com.miufood.restaurant_service.service.MenuService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.awt.*;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/restaurants")
@CrossOrigin
public class MenuController {
    @Autowired
    private MenuService menuService;
    // VENDOR ADD MENU
    @PostMapping("/{restaurantId}/menu")
    public MenuResponseDto addMenuItem(@PathVariable Long restaurantId, @RequestBody MenuRequestDto menuRequestDto) {
        return menuService.addMenuItem(restaurantId, menuRequestDto);
    }
    // VENDOR : update menu item
    @PutMapping("/{restaurantId}/menu/{menuId}")
    public MenuResponseDto updateMenuItem(@PathVariable Long restaurantId,@PathVariable Long menuId, @RequestBody MenuRequestDto menuRequestDto) {
       return menuService.updateMenuItem(restaurantId, menuId, menuRequestDto);
    }
    //VENDOR : delete menu item
    @DeleteMapping("/{restaurantId}/menu/{menuId}")
    public ResponseEntity<?> deleteMenuItem(@PathVariable Long restaurantId, @PathVariable Long menuId) {
        Map<String , Object> map = new HashMap<>();
        if(menuService.deleteMenuItem(restaurantId, menuId)){
            map.put("success", true);
            return ResponseEntity.ok(map);
        }
        map.put("success", false);
        return ResponseEntity.badRequest().body(map);
    }
    //CUSTOMER : can view a menu item
    @GetMapping("/{restaurantId}/menu/{menuId}")
    public MenuResponseDto getMenuItem(@PathVariable Long restaurantId,@PathVariable Long menuId) {
       return menuService.getMenuByRestaurantAndMenuId(menuId,restaurantId);
    }
    // CUSTOMER : view menu of a restaurant
    @GetMapping("/{restaurantId}/menu")
    public List<MenuResponseDto> getMenuByRestaurant(@PathVariable Long restaurantId) {
       return menuService.findMenuByRestaurant(restaurantId);
    }
}
