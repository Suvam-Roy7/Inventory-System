package com.inventory.UserService.Exceptions;

public class ResourceNotFoundException extends RuntimeException{
	
	public ResourceNotFoundException(String message) {
        super(message);
    }

}