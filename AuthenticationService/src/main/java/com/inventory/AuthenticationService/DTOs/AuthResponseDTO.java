package com.inventory.AuthenticationService.DTOs;

public class AuthResponseDTO {
	
	private String token;
	
	private UserDetailsResponseDTO user;

	public String getToken() {
		return token;
	}

	public void setToken(String token) {
		this.token = token;
	}

	public UserDetailsResponseDTO getUser() {
		return user;
	}

	public void setUser(UserDetailsResponseDTO user) {
		this.user = user;
	}

	public AuthResponseDTO(String token, UserDetailsResponseDTO user) {
		super();
		this.token = token;
		this.user = user;
	}

	public AuthResponseDTO() {
		super();
	}
	

}
