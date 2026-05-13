package com.inventory.InventoryService.Client;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import com.inventory.InventoryService.DTOs.ProductDisplayDTO;

import jakarta.validation.Valid;

@FeignClient(name = "PRODUCTSERVICE")
public interface ProductClient {
	
	@GetMapping("/productservice/products/getproducbyid/{productid}")
	public ProductDisplayDTO getProductById(@Valid @PathVariable long productid);
	
	@GetMapping("/productservice/products/validateproduct/{productid}")
	public boolean isValidProductById(@Valid @PathVariable long productid);
	
	@GetMapping("/productservice/products/getproductprice/{productid}")
	public double getProductPrice(@Valid @PathVariable long productid);

}
