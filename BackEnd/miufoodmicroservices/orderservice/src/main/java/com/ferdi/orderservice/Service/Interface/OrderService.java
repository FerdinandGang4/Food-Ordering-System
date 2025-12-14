package com.ferdi.orderservice.Service.Interface;

import com.ferdi.orderservice.Dtos.OrderRequestDto;
import com.ferdi.orderservice.Dtos.OrderResponseDto;

import java.util.List;

public interface OrderService {
    OrderResponseDto createOrder(OrderRequestDto orderRequestDto);

    OrderResponseDto getOrderById(Long id);

    List<OrderResponseDto> getAllOrders();

   // OrderResponseDto updateOrderStatus(Long orderId, String status);

    void deleteOrder(Long orderId);

    List<OrderResponseDto> getOrdersByUserId(Long userId);

    OrderResponseDto getOrderByOrderNumber(String orderNumber);
}
