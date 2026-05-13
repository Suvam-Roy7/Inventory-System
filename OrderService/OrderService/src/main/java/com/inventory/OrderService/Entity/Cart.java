package com.inventory.OrderService.Entity;

import java.util.ArrayList;
import java.util.List;

import com.inventory.OrderService.DTOs.AddCartItemDTO;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Transient;

@Entity
public class Cart {

    @Id
    private long userId;

    @OneToMany(
        mappedBy = "cart",
        cascade = CascadeType.ALL,
        orphanRemoval = true
    )
    private List<CartItem> items = new ArrayList<>();

    public long getUserId() {
        return userId;
    }

    public void setUserId(long userId) {
        this.userId = userId;
    }

    public List<CartItem> getItems() {
        return items;
    }

    public void setItems(List<CartItem> items) {
        this.items = items;
    }
    
    public Cart(long userId, List<CartItem> items) {
        this.userId = userId;
        this.items = items;
    }
    
    public Cart() {
        this.items = new ArrayList<>();
    }
}