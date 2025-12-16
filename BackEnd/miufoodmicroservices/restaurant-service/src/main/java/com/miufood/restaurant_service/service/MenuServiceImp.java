package com.miufood.restaurant_service.service;

import com.miufood.restaurant_service.dto.MenuRequestDto;
import com.miufood.restaurant_service.dto.MenuResponseDto;
import com.miufood.restaurant_service.entity.MenuItem;
import com.miufood.restaurant_service.entity.Restaurant;
import com.miufood.restaurant_service.exception.ResourceNotFoundException;
import com.miufood.restaurant_service.mapper.Mapper;
import com.miufood.restaurant_service.respository.MenuItemRepository;
import com.miufood.restaurant_service.respository.RestaurantRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class MenuServiceImp implements MenuService {
    @Autowired
    private MenuItemRepository menuItemRepository;
    @Autowired
    private RestaurantRepository restaurantRepository;

    @Override
    public MenuResponseDto addMenuItem(Long restaurantId, MenuRequestDto menuRequestDto) {
        Restaurant restaurant = restaurantRepository.findById(restaurantId)
                .orElseThrow(()->new ResourceNotFoundException("Restaurant not found"));

        MenuItem menuItem = MenuItem.builder()
                .name(menuRequestDto.getName())
                .description(menuRequestDto.getDescription())
                .price(menuRequestDto.getPrice())
                .category(menuRequestDto.getCategory())
                .imageUrl(menuRequestDto.getImage())
                .available(true)
                .restaurant(restaurant)
                .build();
        return Mapper.mapToMenuResponseDto(menuItemRepository.save(menuItem));
    }

    @Override
    public MenuResponseDto updateMenuItem(Long restaurantId,Long menuId, MenuRequestDto menuRequestDto) {
        MenuItem menuItem =  menuItemRepository.findById(menuId)
                .orElseThrow(() -> new ResourceNotFoundException("Menu item not found"));
        if(!menuItem.getRestaurant().getId().equals(restaurantId)) {
            throw new ResourceNotFoundException("Menu does not belong to the restaurant");
        }
        menuItem.setName(menuRequestDto.getName());
        menuItem.setDescription(menuRequestDto.getDescription());
        menuItem.setPrice(menuRequestDto.getPrice());
        menuItem.setCategory(menuRequestDto.getCategory());
        menuItem.setImageUrl(menuRequestDto.getImage());
        menuItem.setAvailable(menuRequestDto.getAvailable());
        return Mapper.mapToMenuResponseDto(menuItemRepository.save(menuItem));
    }

    @Override
    public Boolean deleteMenuItem(Long restaurantId,Long menuId) {
       MenuItem menuItem= menuItemRepository.findById(menuId)
                .orElseThrow(() -> new ResourceNotFoundException("Menu item not found"));

       if(menuItem.getRestaurant().getId().equals(restaurantId)){
           menuItemRepository.deleteById(menuId);
       }else {
           throw new ResourceNotFoundException("Menu does not belong to the restaurant");
       }
        return true;
    }

    @Override
    public List<MenuResponseDto> findMenuByRestaurant(Long restaurantId) {
        return menuItemRepository.findByRestaurantIdAndAvailableTrue(restaurantId).stream()
                .map(Mapper::mapToMenuResponseDto).toList();
    }

    @Override
    public MenuResponseDto getMenuByRestaurantAndMenuId(Long restaurantId,Long menuId) {
        MenuItem menuItem = menuItemRepository.findByIdAndRestaurantId(restaurantId, menuId)
                .orElseThrow(() -> new ResourceNotFoundException("Menu Not Found For Restaurant"));
        return Mapper.mapToMenuResponseDto(menuItem);
    }

}
