package com.ferdi.orderservice.Service;

import com.ferdi.orderservice.Dtos.OrderRequestDto;
import com.ferdi.orderservice.Dtos.OrderResponseDto;
import com.ferdi.orderservice.Entity.Order;
import com.ferdi.orderservice.Mappers.OrderMapper;
import com.ferdi.orderservice.Repository.OrderRepository;
import com.ferdi.orderservice.Service.Interface.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class OderServiceIm implements OrderService {
    @Autowired
    private OrderRepository orderRepository;
    @Autowired
    private OrderMapper orderMapper;

    // Create a new order
    public OrderResponseDto createOrder(OrderRequestDto orderRequestDto) {
        Order order = orderMapper.toOrder(orderRequestDto);
        Order savedOrder = orderRepository.save(order);
        return orderMapper.toDTO(savedOrder);
    }

    // Get order by id
    public OrderResponseDto getOrderById(Long id) {
        Order order = orderRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Order not found with id: " + id));
        return orderMapper.toDTO(order);
    }

    // Get all orders
    public List<OrderResponseDto> getAllOrders() {
        return orderRepository.findAll().stream()
                .map(orderMapper::toDTO)
                .collect(Collectors.toList());
    }

    // Update order status
//    public OrderResponseDto updateOrderStatus(Long orderId, String status) {
//        Order order = orderRepository.findById(orderId)
//                .orElseThrow(() -> new RuntimeException("Order not found with id: " + orderId));
//        order.setStatus(Enum.valueOf((Class<com.ferdi.orderservice.Enum.OrderStatus>) order.getStatus().getClass(), status));
//        return orderMapper.toDTO(order);
//    }

    // Delete order
    public void deleteOrder(Long orderId) {
        orderRepository.deleteById(orderId);
    }

    // Get orders by user
    public List<OrderResponseDto> getOrdersByUserId(Long userId) {
        return orderRepository.findByUserId(userId).stream()
                .map(orderMapper::toDTO)
                .collect(Collectors.toList());
    }

    // Get order by order number
    public OrderResponseDto getOrderByOrderNumber(String orderNumber) {
        Order order = orderRepository.findByOrderNumber(orderNumber)
                .orElseThrow(() -> new RuntimeException("Order not found with order number: " + orderNumber));
        return orderMapper.toDTO(order);
    }
}
