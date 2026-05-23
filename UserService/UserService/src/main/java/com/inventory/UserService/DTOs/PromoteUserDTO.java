package com.inventory.UserService.DTOs;

import com.inventory.UserService.Entity.Role;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;

public class PromoteUserDTO {
	
	@NotBlank
	private String email;
	@NotEmpty
	private String role;
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	
	public PromoteUserDTO(@NotBlank String email, @NotEmpty String role) {
		super();
		this.email = email;
		this.role = role;
	}
	public PromoteUserDTO() {
		super();
	}
	public String getRole() {
		return role;
	}
	public void setRole(String role) {
		this.role = role;
	}
	
	

}
