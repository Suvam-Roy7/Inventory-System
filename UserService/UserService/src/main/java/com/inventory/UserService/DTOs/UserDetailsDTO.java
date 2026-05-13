package com.inventory.UserService.DTOs;

import java.util.ArrayList;
import java.util.List;

import com.inventory.UserService.Entity.Role;

public class UserDetailsDTO {
	
	private long userid;
	private String username;
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
	public UserDetailsDTO() {
		super();
	}
	
	public UserDetailsDTO(long userid, String username, String email, String password) {
		super();
		this.userid = userid;
		this.username = username;
		this.email = email;
		this.password = password;
		this.role = (role != null) ? new ArrayList<>(role) : new ArrayList<>();
	}
	
	
	

}
