package com.ferdi.cartservice.Controller;

import com.ferdi.cartservice.Dtos.CartDto;
import com.ferdi.cartservice.Dtos.CartItemDto;
import com.ferdi.cartservice.Service.Interface.CartItemService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/cartitems")
@RequiredArgsConstructor
@CrossOrigin
public class CartItemController {
    private final CartItemService cartItemService;

    @PostMapping("/{userId}")
    public ResponseEntity<CartDto> addItem(
            @PathVariable Long userId,
            @RequestBody CartItemDto cartItemDto) {

        return ResponseEntity.ok(
                cartItemService.addItemToCart(userId, cartItemDto)
        );
    }

    @PutMapping("/{itemId}")
    public ResponseEntity<CartDto> updateItem(
            @PathVariable Long userId,
            @PathVariable Long itemId,
            @RequestParam Integer quantity) {

        return ResponseEntity.ok(
                cartItemService.updateItemQuantity(userId ,itemId, quantity)
        );
    }

    @DeleteMapping("/{itemId}")
    public ResponseEntity<Void> removeItem(@PathVariable Long userId, @PathVariable Long itemId ) {
        cartItemService.removeItemFromCart(userId, itemId);
        return ResponseEntity.noContent().build();
    }
}

