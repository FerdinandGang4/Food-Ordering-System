package com.ferdi.cartservice.Entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "carts")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
public class Cart {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @EqualsAndHashCode.Include
    private Long id;

    // Each user has one active cart
    @Column(nullable = false, unique = true)
    private Long userId;

    @OneToMany(
            mappedBy = "cart",
            cascade = CascadeType.ALL,
            orphanRemoval = true,
            fetch = FetchType.LAZY
    )
    @Builder.Default
    @ToString.Exclude
    Set<CartItem>  items = new HashSet<>();

    public Set<CartItem> getItems() {
        if (items == null) {
            //items = new ArrayList<>();
            items = new HashSet<>();
        }
        return items;
    }

    public CartItem getItemById(Long itemId) {
        if (items == null) {
            //items = new ArrayList<>();
            items = new HashSet<>();
        }
        return items.stream()
                .filter(item -> item.getItemId().equals(itemId))
                .findFirst()
                .orElse(null); // or throw custom exception
    }

    public Cart(Long userId) {
        this.userId=userId;
    }

    public void addItem(CartItem item) {
        if(items.contains(item))
        {
           items.remove(item);
        }
        items.add(item);
        item.setCart(this);
    }

    public void removeItem(CartItem item) {
        items.remove(item);
        item.setCart(null);
    }
}
