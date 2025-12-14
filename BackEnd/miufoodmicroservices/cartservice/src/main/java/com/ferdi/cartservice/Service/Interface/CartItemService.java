package com.ferdi.cartservice.Service.Interface;

import com.ferdi.cartservice.Dtos.CartDto;
import com.ferdi.cartservice.Dtos.CartItemDto;

public interface CartItemService {
    CartDto addItemToCart(Long userId, CartItemDto cartItemDto);

    CartDto updateItemQuantity(Long userId, Long itemId, Integer quantity);

    CartDto removeItemFromCart(Long userId, Long itemId);

    CartItemDto getItemById(Long userId, Long itemId); // new method
}

