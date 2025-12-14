package com.ferdi.cartservice.Mappers;

import com.ferdi.cartservice.Dtos.CartItemDto;
import com.ferdi.cartservice.Entity.CartItem;
import org.springframework.stereotype.Component;

@Component
public class CartItemMapper {
    public CartItemDto toDto(CartItem entity)
    {
        if (entity == null) return null;

        return CartItemDto.builder()
                .productId(entity.getProductId())
                .productName(entity.getProductName())
                .quantity(entity.getQuantity())
                .price(entity.getPrice())
                .build();
    }

    public CartItem toEntity(CartItemDto dto) {
        if (dto == null) return null;

        CartItem entity = new CartItem();
        entity.setItemId(dto.getItemId());
        entity.setProductId(dto.getProductId());
        entity.setProductName(dto.getProductName());
        entity.setQuantity(dto.getQuantity());
        entity.setPrice(dto.getPrice());
        return entity;
    }

}
