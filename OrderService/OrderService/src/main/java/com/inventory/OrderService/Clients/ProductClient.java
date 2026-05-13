package com.inventory.OrderService.Clients;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import com.inventory.OrderService.Configurations.GlobalFeignConfig;
import com.inventory.OrderService.Utilities.ProductDisplayDTO;

import jakarta.validation.Valid;

@FeignClient(name = "PRODUCTSERVICE", configuration = GlobalFeignConfig.class)
public interface ProductClient {
	
	@GetMapping("/productservice/products/getproducbyid/{productid}")
	public ProductDisplayDTO getProductById(@Valid @PathVariable long productid);
	
	@GetMapping("/productservice/products/validateproduct/{productid}")
	public boolean isValidProductById(@Valid @PathVariable long productid);
	
	@GetMapping("/productservice/products/getproductprice/{productid}")
	public double getProductPrice(@Valid @PathVariable long productid);
	
	@GetMapping("/productservice/products/getproductname/{productid}")
	public String getProductName(@Valid @PathVariable long productid);

}
