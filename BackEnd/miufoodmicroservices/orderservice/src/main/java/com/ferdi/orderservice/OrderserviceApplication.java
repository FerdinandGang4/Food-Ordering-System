package com.ferdi.orderservice;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class OrderserviceApplication {

	public static void main(String[] args) {
		SpringApplication.run(OrderserviceApplication.class, args);
	}

}
/*
* Notes:

createOrder → POST /api/orders

getOrderById → GET /api/orders/{id}

getAllOrders → GET /api/orders

deleteOrder → DELETE /api/orders/{id}

getOrdersByUserId → GET /api/orders/user/{userId}

getOrderByOrderNumber → GET /api/orders/order-number/{orderNumber}
*

* */