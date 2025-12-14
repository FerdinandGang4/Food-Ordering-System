package com.ferdi.cartservice.Service;

import com.ferdi.cartservice.Dtos.CartDto;
import com.ferdi.cartservice.Dtos.CartItemDto;
import com.ferdi.cartservice.Entity.Cart;
import com.ferdi.cartservice.Entity.CartItem;
import com.ferdi.cartservice.Mappers.CartItemMapper;
import com.ferdi.cartservice.Mappers.CartMapper;
import com.ferdi.cartservice.Repository.CartItemRepository;
import com.ferdi.cartservice.Repository.CartRepository;
import com.ferdi.cartservice.Service.Interface.CartItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CartItemIm implements CartItemService {
    @Autowired
    private CartRepository cartRepository;
    private  CartItemRepository cartItemRepository;
    private  CartMapper cartMapper;
    private CartItemMapper cartItemMapper;

    @Override
    public CartDto addItemToCart(Long userId, CartItemDto dto) {
        Cart cart = cartRepository.findByUserId(userId)
                .orElseGet(() -> cartRepository.save(new Cart(userId)));
        CartItem item = cartItemMapper.toEntity(dto);
        item.setProductName(dto.getProductName());
        cart.addItem(item);
        cartRepository.save(cart);
        return cartMapper.toDto(cart);
    }

    @Override
    public CartDto updateItemQuantity(Long userId, Long itemId, Integer quantity) {
        Cart cart = cartRepository.findByUserId(userId)
                .orElseThrow(() -> new RuntimeException("Cart not found"));

        CartItem item = cart.getItems().stream()
                .filter(i -> i.getItemId().equals(itemId))
                .findFirst()
                .orElseThrow(() -> new RuntimeException("Item not found"));

        item.setQuantity(quantity);
        cartItemRepository.save(item);

        return cartMapper.toDto(cart);
    }

    @Override
    public CartDto removeItemFromCart(Long userId, Long itemId) {
        Cart cart = cartRepository.findByUserId(userId)
                .orElseThrow(() -> new RuntimeException("Cart not found"));

        CartItem item = cart.getItems().stream()
                .filter(i -> i.getItemId().equals(itemId))
                .findFirst()
                .orElseThrow(() -> new RuntimeException("Item not found"));

        cart.removeItem(item);
        cartRepository.save(cart);

        return cartMapper.toDto(cart);
    }

    @Override
    public CartItemDto getItemById(Long userId, Long itemId) {
        Cart cart = cartRepository.findByUserId(userId)
                .orElseThrow(() -> new RuntimeException("Cart not found for user: " + userId));
        CartItem item = cart.getItems().stream()
                .filter(i -> i.getItemId().equals(itemId))
                .findFirst()
                .orElseThrow(() -> new RuntimeException("Item not found with id: " + itemId));

        return cartItemMapper.toDto(item);
    }

}
