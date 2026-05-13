package com.inventory.OrderService.Repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.inventory.OrderService.Entity.Order;

public interface OrderRepo extends JpaRepository<Order, Long>{
	
	@Query("SELECT o FROM Order o WHERE o.user_id = :userId")
	List<Order> findByUserId(@Param("userId") long userId);

}
