package com.ferdi.cartservice.Service.Interface;

import com.ferdi.cartservice.Dtos.CartDto;
import com.ferdi.cartservice.Dtos.CartItemDto;

public interface CartService {
    // ---------------- Cart operations ----------------
    CartDto getCartByUserId(Long userId);

    CartDto createCart(Long userId);

    void clearCart(Long userId);

    // ---------------- Cart item operations ----------------
    CartItemDto addItemToCart(Long userId, CartItemDto itemDto);

    CartItemDto updateCartItem(Long userId, Long itemId, CartItemDto itemDto);

    void removeItemFromCart(Long userId, Long itemId);
}
