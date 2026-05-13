package com.inventory.AuthenticationService.Controller;

import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.inventory.AuthenticationService.Clients.UserClient;
import com.inventory.AuthenticationService.DTOs.AuthLoginRequestDTO;
import com.inventory.AuthenticationService.DTOs.AuthResponseDTO;
import com.inventory.AuthenticationService.DTOs.UserDetailsDTO;
import com.inventory.AuthenticationService.DTOs.UserDetailsResponseDTO;
import com.inventory.AuthenticationService.Exceptions.InvalidUserException;
import com.inventory.AuthenticationService.Services.RemoteUserDetailsService;
import com.inventory.AuthenticationService.Utilities.JWTUtility;

import feign.FeignException;

@RestController
@RequestMapping("/authenticationservice/auth")
public class AuthController {
	
	@Autowired
	private JWTUtility jwtUtility;
	
	@Autowired
	private AuthenticationManager authenticationManager;
	
	@Autowired
	private PasswordEncoder passwordEncoder;
	
	@Autowired
	private RemoteUserDetailsService remoteUserDetailsService;
	

	
	@PostMapping("/login")
	public ResponseEntity<AuthResponseDTO> login(@RequestBody AuthLoginRequestDTO login){
		
		try {
			
			Authentication auth = authenticationManager.authenticate(
					new UsernamePasswordAuthenticationToken(login.getEmail(), login.getPassword())
					);
			
			/*If the credentials are invalid, Spring Security will automatically throw an AuthenticationException, 
			  which you're already catching. */
			
			
			List<String> roles = auth.getAuthorities().stream().map(aut -> aut.getAuthority().replace("ROLE_", ""))
									.collect(Collectors.toList());
			
			String token = jwtUtility.generateToken(login.getEmail(), roles);
			
			UserDetailsResponseDTO user = remoteUserDetailsService.getUserResponseDetails(login.getEmail());
			
			AuthResponseDTO resopnse = new AuthResponseDTO(token, user);
			
			
			return new ResponseEntity<>(resopnse, HttpStatus.OK);

		}
		catch (AuthenticationException e) {
		        throw new InvalidUserException("Invalid credentials");
		}

	}
	
	
}
