package com.inventory.InventoryService.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.inventory.InventoryService.DTOs.ProductAddedDisplayDTO;
import com.inventory.InventoryService.DTOs.ProductQuantityByIdDTO;
import com.inventory.InventoryService.Services.InventoryServics;

import io.swagger.v3.oas.annotations.Hidden;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/inventoryservice/inventory")
public class InventoryController {
	
	@Autowired
	private InventoryServics inventoryServics;
	
	@PostMapping("/updateproductquantity/product_id/{product_id}/quantity/{quantity}")
	public ResponseEntity<ProductAddedDisplayDTO> updateProductQuantity(@Valid @PathVariable long product_id,@Valid @PathVariable int quantity) {
		
		ProductAddedDisplayDTO dto = inventoryServics.createProductQuantity(product_id, quantity);
		
		return new ResponseEntity<>(dto, HttpStatus.CREATED);
	}
	
	@Hidden
	@GetMapping("/getproductquantitybyid/{productid}")
	public ResponseEntity<ProductQuantityByIdDTO> getProductQuantityById(@Valid @PathVariable long productid){
		return new ResponseEntity<>(inventoryServics.getProductQuantityById(productid), HttpStatus.OK);
	}

}
