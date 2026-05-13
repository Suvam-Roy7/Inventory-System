package com.inventory.ProductService.Exceptions;

public class DuplicateProductException extends RuntimeException{
	
	public DuplicateProductException(String msg) {
		super(msg);
	}

}
