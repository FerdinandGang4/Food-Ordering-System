package com.ferdi.orderservice.Entity;

import com.ferdi.orderservice.Enum.OrderStatus;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.apache.catalina.User;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Entity
@Data
@Table(name = "orders")
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Order {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String orderNumber;

    @Column(nullable = false)
    private Long userId;

    @Enumerated(EnumType.STRING)
    private OrderStatus status;

    private BigDecimal totalAmount;

    @Embedded
    private OrderAddress deliveryAddress;

    @OneToMany(
            mappedBy = "order",
            cascade = CascadeType.PERSIST,
            orphanRemoval = true
    )
    private List<OrderItem> items = new ArrayList<>();

    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    public Order(Long userId, OrderAddress deliveryAddress) {
        this.userId = userId;
        this.deliveryAddress = deliveryAddress;
        this.status = OrderStatus.CREATED;
        this.orderNumber = UUID.randomUUID().toString();
        this.createdAt = LocalDateTime.now();
        this.updatedAt = LocalDateTime.now();
        this.totalAmount = BigDecimal.ZERO;
    }

    public void addItem(OrderItem item) {
        if (items == null) {
            items = new ArrayList<>();
        }
        item.setOrder(this); // set the owning side
        items.add(item);
        recalculateTotal();
    }

    public void removeItem(OrderItem item) {
        items.remove(item);
        recalculateTotal();
    }

    private void recalculateTotal() {
        this.totalAmount = items.stream()
                .map(item -> item.getSubtotal() != null ? item.getSubtotal() : BigDecimal.ZERO)
                .reduce(BigDecimal.ZERO, BigDecimal::add);
        this.updatedAt = LocalDateTime.now();
    }


}







