package com.inventory.AuthenticationService.Exceptions;

public class InvalidUserException extends RuntimeException{
	
	public InvalidUserException(String message){
		super(message);
	}

}
