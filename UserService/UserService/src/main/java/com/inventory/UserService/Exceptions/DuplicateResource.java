package com.inventory.UserService.Exceptions;

public class DuplicateResource extends RuntimeException {
	
	public DuplicateResource(String message) {
        super(message);
    }
}
