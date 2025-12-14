package com.ferdi.cartservice.Entity;
import jakarta.persistence.*;
import lombok.*;
import java.math.BigDecimal;
import java.util.Objects;

@Entity
@Table(name = "cart_items")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
public class CartItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @EqualsAndHashCode.Include
    private Long itemId;

    @Column(nullable = false, unique = true)
    private Long productId;
    @Column(nullable = false)
    private String productName;

    @Column(nullable = false)
    private Integer quantity;

    @Column(nullable = false)
    private BigDecimal price;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "cart_id", nullable = false)
    @ToString.Exclude
    private Cart cart;

    @Override
    public boolean equals(Object o) {
        if (!(o instanceof CartItem cartItem)) return false;
        return Objects.equals(productId, cartItem.productId);
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(productId);
    }
}
