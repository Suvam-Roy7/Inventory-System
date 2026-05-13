package com.inventory.InventoryService.Exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class ProductGlobalExceptionHandeler {
	
	@ExceptionHandler(ProductNotFoundException.class)
	public ResponseEntity<String> productNotFoundException(ProductNotFoundException msg){
		return new ResponseEntity<>(msg.getMessage(), HttpStatus.NOT_FOUND);
	}
	
}
