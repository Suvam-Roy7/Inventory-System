package com.inventory.AuthenticationService.Exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandeler {
	
	@ExceptionHandler(InvalidUserException.class)
	public ResponseEntity<String> resourceNotFoundExceptionhandeler(InvalidUserException message){
		return new ResponseEntity<>(message.getMessage(), HttpStatus.NOT_FOUND);
	}

}
