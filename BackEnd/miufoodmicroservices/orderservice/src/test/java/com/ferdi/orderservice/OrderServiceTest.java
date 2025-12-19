package com.ferdi.orderservice;

import com.ferdi.orderservice.Dtos.OrderRequestDto;
import com.ferdi.orderservice.Dtos.OrderResponseDto;
import com.ferdi.orderservice.Entity.Order;
import com.ferdi.orderservice.Mappers.OrderMapper;
import com.ferdi.orderservice.Repository.OrderRepository;
import com.ferdi.orderservice.Service.OderServiceIm;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;

import java.math.BigDecimal;

@ExtendWith(MockitoExtension.class)
class OrderServiceTest {

    @Mock
    private OrderRepository orderRepository;

    @Mock
    private OrderMapper orderMapper;

    @InjectMocks
    private OderServiceIm orderService;

    private Order order;
    private OrderResponseDto orderResponseDto;
    private OrderRequestDto orderRequestDto;

    @BeforeEach
    void setup() {
        order = new Order();
        order.setId(1L);
        order.setTotalAmount(BigDecimal.valueOf(100));

        orderResponseDto = new OrderResponseDto();
        orderResponseDto.setId(1L);
        orderResponseDto.setTotalPrice(BigDecimal.valueOf(100));

        orderRequestDto = new OrderRequestDto();
        orderRequestDto.setId(1L);
        orderRequestDto.setTotalPrice(BigDecimal.valueOf(100));

        Mockito.when(orderMapper.toOrder(orderRequestDto)).thenReturn(order);
        Mockito.when(orderRepository.save(order)).thenReturn(order);
        Mockito.when(orderMapper.toDTO(order)).thenReturn(orderResponseDto);
    }

    @Test
    void createOrder_ShouldReturnOrderResponseDto() {
        OrderResponseDto result = orderService.createOrder(orderRequestDto);

        Assertions.assertAll(
                () -> Assertions.assertEquals(1L, result.getId()),
                () -> Assertions.assertEquals(
                        BigDecimal.valueOf(100),
                        result.getTotalPrice()
                )
        );

        Mockito.verify(orderMapper).toOrder(orderRequestDto);
        Mockito.verify(orderRepository).save(order);
        Mockito.verify(orderMapper).toDTO(order);
    }


}
