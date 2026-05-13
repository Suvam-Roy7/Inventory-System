package com.inventory.OrderService.Entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

@Entity
public class CartItem {

    @Id
    @GeneratedValue
    private Long id;

    private Long productId;

    private int quantity;

    @ManyToOne
    @JoinColumn(name = "cart_user_id")
    private Cart cart;

    public Long getId() {
        return id;
    }

    public Long getProductId() {
        return productId;
    }

    public void setProductId(Long productId) {
        this.productId = productId;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public Cart getCart() {
        return cart;
    }

    public void setCart(Cart cart) {
        this.cart = cart;
    }
    
    public CartItem(Long productId, int quantity, Cart cart) {
        this.productId = productId;
        this.quantity = quantity;
        this.cart = cart;
    }
    
    public CartItem() {
    }
}