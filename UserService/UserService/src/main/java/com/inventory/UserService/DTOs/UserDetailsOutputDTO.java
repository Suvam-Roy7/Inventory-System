package com.inventory.UserService.DTOs;

import com.inventory.UserService.Entity.Role;

public class UserDetailsOutputDTO {
	
	private Long userid;
    private String username;
    private String email;
    private Role role;

    public UserDetailsOutputDTO() {
    }

    public UserDetailsOutputDTO(Long userid, String username, String email, Role role) {
        this.userid = userid;
        this.username = username;
        this.email = email;
        this.role = role;
    }

    // Getters and Setters
    public Long getUserid() {
        return userid;
    }

    public void setUserid(Long userid) {
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

    public Role getRole() {
        return role;
    }

    public void setRole(Role role) {
        this.role = role;
    }


}
