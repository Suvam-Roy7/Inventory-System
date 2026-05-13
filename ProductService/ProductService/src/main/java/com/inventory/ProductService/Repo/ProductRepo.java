package com.inventory.ProductService.Repo;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.inventory.ProductService.Entity.Product;

public interface ProductRepo extends JpaRepository<Product, Long> {
	Optional<Product> findByProductname(String productname);
}
