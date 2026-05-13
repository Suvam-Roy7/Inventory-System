package com.inventory.OrderService.Repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.inventory.OrderService.Entity.CartItem;

public interface CartItemRepo extends JpaRepository<CartItem, Long> {
	
	List<CartItem> findAllByCart_UserId(long userId);


}
