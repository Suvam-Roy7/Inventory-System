package com.inventory.OrderService.Exceptions;

public class OrderNotFoundException extends RuntimeException{
	
	public OrderNotFoundException(String msg) {
		super(msg);
	}

}
