package com.inventory.OrderService.Repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.inventory.OrderService.Entity.Cart;

public interface CartRepo extends JpaRepository<Cart, Long>{

}
