package com.inventory.OrderService.Clients;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import com.inventory.OrderService.Configurations.GlobalFeignConfig;
import com.inventory.OrderService.Utilities.ProductQuantityByIdDTO;

@FeignClient(name = "INVENTORYSERVICE", configuration = GlobalFeignConfig.class)
public interface InventoryClient {
	
	@GetMapping("/inventoryservice/inventory/getproductquantitybyid/{productid}")
	public ProductQuantityByIdDTO getProductQuantityByProductId(@PathVariable long productid);

}
