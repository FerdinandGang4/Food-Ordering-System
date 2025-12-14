package com.ferdi.orderservice.Mappers;

import com.ferdi.orderservice.Dtos.OrderAddressDto;
import com.ferdi.orderservice.Dtos.OrderItemDto;
import com.ferdi.orderservice.Dtos.OrderRequestDto;
import com.ferdi.orderservice.Dtos.OrderResponseDto;
import com.ferdi.orderservice.Entity.Order;
import com.ferdi.orderservice.Entity.OrderAddress;
import com.ferdi.orderservice.Entity.OrderItem;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Component
public class OrderMapper {
    // Map OrderRequestDto to Order entity
    public Order toOrder(OrderRequestDto dto) {
        if (dto == null) return null;

        // Map shipping address
        OrderAddress deliveryAddress = new OrderAddress();
        if (dto.getShippingAddress() != null) {
            deliveryAddress.setStreet(dto.getShippingAddress().getStreet());
            deliveryAddress.setCity(dto.getShippingAddress().getCity());
            deliveryAddress.setState(dto.getShippingAddress().getState());
            deliveryAddress.setZipCode(dto.getShippingAddress().getZipCode());
        }

        // Create order using constructor that sets userId and deliveryAddress
        Order order = new Order(dto.getUserId(), deliveryAddress);

        // Map items
        if (dto.getItems() != null) {
            dto.getItems().forEach(itemDto -> {
                if (itemDto != null && itemDto.getPrice() != null && itemDto.getQuantity() > 0) {
                    OrderItem item = new OrderItem();
                    item.setProductId(itemDto.getProductId());
                    item.setQuantity(itemDto.getQuantity());
                    item.setPrice(itemDto.getPrice());
                    order.addItem(item); // recalculates totalAmount
                }
            });
        }

        // Optionally override totalAmount if DTO has it
        if (dto.getTotalPrice() != null) {
            order.setTotalAmount(dto.getTotalPrice());
        }

        return order;
    }

    // Map Order entity to OrderResponseDto
    public OrderResponseDto toDTO(Order order) {
        if (order == null) return null;

        OrderResponseDto dto = new OrderResponseDto();
        dto.setId(order.getId());
        dto.setCustomerName("User-" + order.getUserId()); // or fetch real name from user service
        dto.setTotalPrice(order.getTotalAmount() != null ? order.getTotalAmount() : null);
        dto.setStatus(order.getStatus() != null ? order.getStatus().name() : null);

        // Map address
        if (order.getDeliveryAddress() != null) {
            OrderAddressDto addressDto = new OrderAddressDto();
            addressDto.setStreet(order.getDeliveryAddress().getStreet());
            addressDto.setCity(order.getDeliveryAddress().getCity());
            addressDto.setState(order.getDeliveryAddress().getState());
            addressDto.setZipCode(order.getDeliveryAddress().getZipCode());
            dto.setShippingAddress(addressDto);
            dto.setBillingAddress(addressDto); // assuming same as shipping
        }

        // Map items
        if (order.getItems() != null) {
            List<OrderItemDto> itemDtos = order.getItems().stream()
                    .map(this::toItemDto)
                    .collect(Collectors.toList());
            dto.setItems(itemDtos);
        } else {
            dto.setItems(new ArrayList<>());
        }

        return dto;
    }

    // Map OrderItem to OrderItemDto
    private OrderItemDto toItemDto(OrderItem item) {
        if (item == null) return null;
        OrderItemDto dto = new OrderItemDto();
        dto.setProductId(item.getProductId());
        dto.setProductName(item.getProductName()); // new field
        dto.setQuantity(item.getQuantity());
        dto.setPrice(item.getPrice());
        return dto;
    }

}
