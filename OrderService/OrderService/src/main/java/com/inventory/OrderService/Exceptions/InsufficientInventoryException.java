package com.inventory.OrderService.Exceptions;

public class InsufficientInventoryException extends RuntimeException{
	
	public InsufficientInventoryException(String message) {
		super(message);
	}
}
