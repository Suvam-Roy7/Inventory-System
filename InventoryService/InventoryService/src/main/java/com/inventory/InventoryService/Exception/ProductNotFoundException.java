package com.inventory.InventoryService.Exception;

public class ProductNotFoundException extends RuntimeException{
	
	public ProductNotFoundException(String msg) {
		super(msg);
	}

}
