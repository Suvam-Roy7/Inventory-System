package com.inventory.AuthenticationService.DTOs;

import java.util.ArrayList;
import java.util.List;

import com.inventory.AuthenticationService.Utilities.Role;




public class UserDetailsDTO {
	
	private String email;
	private String password;
	private List<Role> role = new ArrayList<>();
	
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public List<Role> getRole() {
		return role;
	}

	public void setRole(List<Role> role) {
	        this.role = (role != null) ? role : new ArrayList<>();
	    }

	
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public UserDetailsDTO() {
		super();
	}
	public UserDetailsDTO(String email, String password) {
		super();
		this.email = email;
		this.password = password;
		this.role = (role != null) ? new ArrayList<>(role) : new ArrayList<>();
	}
	

}
