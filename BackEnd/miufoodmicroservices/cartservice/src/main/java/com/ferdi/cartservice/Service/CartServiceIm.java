package com.ferdi.cartservice.Service;

import com.ferdi.cartservice.Dtos.CartDto;
import com.ferdi.cartservice.Dtos.CartItemDto;
import com.ferdi.cartservice.Entity.Cart;
import com.ferdi.cartservice.Entity.CartItem;
import com.ferdi.cartservice.Mappers.CartItemMapper;
import com.ferdi.cartservice.Mappers.CartMapper;
import com.ferdi.cartservice.Repository.CartItemRepository;
import com.ferdi.cartservice.Repository.CartRepository;
import com.ferdi.cartservice.Service.Interface.CartService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.Set;

@Service
@RequiredArgsConstructor
@Transactional
public class CartServiceIm implements CartService {
    @Autowired
    private  CartRepository cartRepository;
    @Autowired
    private  CartItemRepository cartItemRepository;
    @Autowired
    private  CartMapper cartMapper;
    @Autowired
    private CartItemMapper cartItemMapper;

    @Override
    public CartDto getCartByUserId(Long userId) {
        Cart cart = cartRepository.findByUserId(userId)
                .orElseGet(() -> cartRepository.save(new Cart(userId)));
        return cartMapper.toDto(cart);
    }

    @Override
    public CartDto createCart(Long userId) {
        Cart cart = new Cart(userId);
        return cartMapper.toDto(cartRepository.save(cart));
    }

    @Override
    public void clearCart(Long userId) {
        Cart cart = cartRepository.findByUserId(userId)
                .orElseThrow(() -> new RuntimeException("Cart not found"));
        cart.getItems().clear();
        cartRepository.save(cart);
    }

    @Override
    public CartItemDto addItemToCart(Long userId, CartItemDto itemDto) {

        Cart cart = cartRepository.findByUserId(userId)
                .orElseThrow(() -> new RuntimeException("Cart not found"));

        CartItem item = cartItemMapper.toEntity(itemDto);

        item.setCart(cart);


        CartItem savedItem = cartItemRepository.save(item);

        return cartItemMapper.toDto(savedItem);
    }


    @Override
    public CartItemDto updateCartItem(Long userId, Long itemId, CartItemDto itemDto) {
        CartItem item = cartItemRepository.findById(itemId)
                .orElseThrow(() -> new RuntimeException("Item not found"));
        item.setQuantity(itemDto.getQuantity());
        return cartItemMapper.toDto(cartItemRepository.save(item));
    }

    @Override
    public void removeItemFromCart(Long userId, Long itemId) {
        CartItem item = cartItemRepository.findById(itemId)
                .orElseThrow(() -> new RuntimeException("Item not found"));
        cartItemRepository.delete(item);
    }
}
