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

    public OrderResponseDto createOrder(OrderRequestDto orderRequestDto) {
        Order order = orderMapper.toOrder(orderRequestDto);
        Order savedOrder = orderRepository.save(order);
        return orderMapper.toDTO(savedOrder);
    }

    public OrderResponseDto getOrderById(Long id) {
        Order order = orderRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Order not found with id: " + id));
        return orderMapper.toDTO(order);
    }

    public List<OrderResponseDto> getAllOrders() {
        return orderRepository.findAll().stream()
                .map(orderMapper::toDTO)
                .collect(Collectors.toList());
    }

    public void deleteOrder(Long orderId) {
        orderRepository.deleteById(orderId);
    }

    public List<OrderResponseDto> getOrdersByUserId(Long userId) {
        return orderRepository.findByUserId(userId).stream()
                .map(orderMapper::toDTO)
                .collect(Collectors.toList());
    }

    public OrderResponseDto getOrderByOrderNumber(String orderNumber) {
        Order order = orderRepository.findByOrderNumber(orderNumber)
                .orElseThrow(() -> new RuntimeException("Order not found with order number: " + orderNumber));
        return orderMapper.toDTO(order);
    }
}
