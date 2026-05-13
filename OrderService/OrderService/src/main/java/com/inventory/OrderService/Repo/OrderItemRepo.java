package com.inventory.OrderService.Repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.*;

import com.inventory.OrderService.Entity.OrderedItems;

public interface OrderItemRepo extends JpaRepository<OrderedItems, Long> {
	
	@Query("SELECT oi FROM OrderedItems oi WHERE oi.order_id = :orderId")
	List<OrderedItems> findByOrderId(@Param("orderId") long orderId);

}
