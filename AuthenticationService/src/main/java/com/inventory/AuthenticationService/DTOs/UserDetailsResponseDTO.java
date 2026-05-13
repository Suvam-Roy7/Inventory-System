package com.inventory.AuthenticationService.DTOs;

import java.util.ArrayList;
import java.util.List;

import com.inventory.AuthenticationService.Utilities.Role;

public class UserDetailsResponseDTO {
	
	private long userid;
	private String username;
	private String email;
	private List<Role> role = new ArrayList<>();
	
	public UserDetailsResponseDTO(long userid, String username, String email) {
		super();
		this.userid = userid;
		this.username = username;
		this.email = email;
		this.role = (role != null) ? new ArrayList<>(role) : new ArrayList<>();
	}

	public UserDetailsResponseDTO() {
		super();
	}

	public long getUserid() {
		return userid;
	}

	public void setUserid(long userid) {
		this.userid = userid;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

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
	
	

}
