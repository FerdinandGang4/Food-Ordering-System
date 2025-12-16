package com.ferdi.cartservice.Controller;

import com.ferdi.cartservice.Dtos.CartDto;
import com.ferdi.cartservice.Dtos.CartItemDto;
import com.ferdi.cartservice.Service.Interface.CartService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/carts")
@RequiredArgsConstructor
@CrossOrigin
public class CartController {
    @Autowired
    private CartService cartService;

    @PostMapping("/{userId}")
    public ResponseEntity<CartDto> createCart(@PathVariable Long userId) {
        CartDto cart = cartService.createCart(userId);
        return ResponseEntity.ok(cart);
    }

    @PostMapping("/{userId}/items")
    public ResponseEntity<CartItemDto> addItemToCart(
            @PathVariable Long userId,
            @RequestBody CartItemDto itemDto
    ) {
        CartItemDto addedItem = cartService.addItemToCart(userId, itemDto);
        return ResponseEntity.ok(addedItem);
    }

    @GetMapping("/{userId}")
    public ResponseEntity<CartDto> getCartByUserId(@PathVariable Long userId) {
        CartDto cart = cartService.getCartByUserId(userId);
        return ResponseEntity.ok(cart);
    }

    @PutMapping("/{userId}/items/{itemId}")
    public ResponseEntity<CartItemDto> updateCartItem(
            @PathVariable Long userId,
            @PathVariable Long itemId,
            @RequestBody CartItemDto itemDto
    ) {
        CartItemDto updatedItem = cartService.updateCartItem(userId, itemId, itemDto);
        return ResponseEntity.ok(updatedItem);
    }

    // Remove an item from the cart
    @DeleteMapping("/{userId}/items/{itemId}")
    public ResponseEntity<Void> removeItemFromCart(
            @PathVariable Long userId,
            @PathVariable Long itemId
    ) {
        cartService.removeItemFromCart(userId, itemId);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/{userId}")
    public ResponseEntity<Void> clearCart(@PathVariable Long userId) {
        cartService.clearCart(userId);
        return ResponseEntity.noContent().build();
    }
}
