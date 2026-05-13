package com.inventory.OrderService.Exceptions;

public class InvalidResourceException extends RuntimeException{
	
	public InvalidResourceException(String msg) {
		super(msg);
	}

}
