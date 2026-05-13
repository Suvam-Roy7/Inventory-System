package com.inventory.InventoryService.Repo;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.inventory.InventoryService.Entity.Inventory;

public interface InventoryRepo extends JpaRepository<Inventory, Long> {
	
	Optional<Inventory> findByProductid(long product_id);

}
