package com.inventory.OrderService.Exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class OrderGlobalExceptionHandeler {
	
	@ExceptionHandler(InsufficientInventoryException.class)
	public ResponseEntity<String> indufficientInventory(InsufficientInventoryException ex){
		return new ResponseEntity<>(ex.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
	}
	
	@ExceptionHandler(InvalidResourceException.class)
	public ResponseEntity<String> invalidResourceException(InvalidResourceException ex){
		return new ResponseEntity<>(ex.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
	}
	
	@ExceptionHandler(OrderNotFoundException.class)
	public ResponseEntity<String> orderNotFoundException(OrderNotFoundException ex){
		return new ResponseEntity<>(ex.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
	}

}
