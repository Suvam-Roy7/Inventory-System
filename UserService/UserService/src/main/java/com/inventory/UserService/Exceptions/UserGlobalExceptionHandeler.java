package com.inventory.UserService.Exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import java.util.*;

@RestControllerAdvice
public class UserGlobalExceptionHandeler {
	
	@ExceptionHandler(ResourceNotFoundException.class)
	public ResponseEntity<String> resourceNotFoundExceptionhandeler(ResourceNotFoundException message){
		return new ResponseEntity<>(message.getMessage(), HttpStatus.NOT_FOUND);
	}
	
	@ExceptionHandler(DuplicateResource.class)
	public ResponseEntity<String> duplicateResource(DuplicateResource message){
		return new ResponseEntity<>(message.getMessage(), HttpStatus.BAD_REQUEST);
	}
	
	@ExceptionHandler(MethodArgumentNotValidException.class)
	public ResponseEntity<Map<String, String>> handleValidationExceptions(
	        MethodArgumentNotValidException ex) {

	    Map<String, String> errors = new HashMap<>();

	    ex.getBindingResult().getFieldErrors()
	        .forEach(error -> errors.put(error.getField(), error.getDefaultMessage()));

	    return ResponseEntity.badRequest().body(errors);
	}
}
