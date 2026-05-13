package com.inventory.AuthenticationService.Clients;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;

import com.inventory.AuthenticationService.Configuration.GlobalFeignConfig;
import com.inventory.AuthenticationService.DTOs.AuthLoginRequestDTO;
import com.inventory.AuthenticationService.DTOs.UserDetailsDTO;
import com.inventory.AuthenticationService.DTOs.UserDetailsResponseDTO;

@FeignClient(name = "USERSERVICE", configuration = GlobalFeignConfig.class)
public interface UserClient {
	
	@GetMapping("/userservice/users/client/validateuserbyemail/{email}")
	public boolean validateUserByEmail(@PathVariable String email);
	
	@GetMapping("/userservice/users/client/getuserbyemail/{email}")
	public UserDetailsDTO getUserByEmail(@PathVariable String email);
	
	@GetMapping("/userservice/users/client/getuserbyemail/{email}")
	public UserDetailsResponseDTO getUserByEmail2(@PathVariable String email);

}
