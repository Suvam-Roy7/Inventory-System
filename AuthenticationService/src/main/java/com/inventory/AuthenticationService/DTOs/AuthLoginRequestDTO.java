package com.inventory.AuthenticationService.DTOs;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

public class AuthLoginRequestDTO {
	
	@Email(message = "Correct email id required")
	private String email;
	@NotBlank(message = "Password is required")
	private String password;
	
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public AuthLoginRequestDTO(String email, String password) {
		super();
		this.email = email;
		this.password = password;
	}
	public AuthLoginRequestDTO() {
		super();
	}

}
