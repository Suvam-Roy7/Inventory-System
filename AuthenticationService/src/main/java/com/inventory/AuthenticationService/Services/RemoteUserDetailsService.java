package com.inventory.AuthenticationService.Services;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.inventory.AuthenticationService.Clients.UserClient;
import com.inventory.AuthenticationService.DTOs.UserDetailsDTO;
import com.inventory.AuthenticationService.DTOs.UserDetailsResponseDTO;
import com.inventory.AuthenticationService.Utilities.Role;

import org.springframework.security.core.GrantedAuthority;

import feign.FeignException;

@Service
public class RemoteUserDetailsService implements UserDetailsService {

	@Autowired
	private UserClient userClient;

	@Override
	public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
		
	    try {
	        UserDetailsDTO dto = userClient.getUserByEmail(email);
	        if (dto == null) {
	            throw new UsernameNotFoundException("User not found: " + email);
	        }

	        List<GrantedAuthority> authorities = 
	            (dto.getRole() == null ? List.<Role>of() : dto.getRole())
	                .stream()
	                .map(r -> "ROLE_" + (r instanceof Enum ? ((Enum<?>) r).name() : String.valueOf(r)))
	                .map(SimpleGrantedAuthority::new)
	                .collect(Collectors.toList());

	        return new org.springframework.security.core.userdetails.User(
	            dto.getEmail(),
	            dto.getPassword(), // must be BCrypt hash from DB
	            authorities
	        );
	    } catch (FeignException.NotFound e) {
	        throw new UsernameNotFoundException("User not found: " + email);
	    } catch (FeignException e) {
	        throw new UsernameNotFoundException("User service error: " + e.status(), e);
	    } catch (Exception e) {
	        throw new UsernameNotFoundException("Unexpected error: " + e.getMessage(), e);
	    }
	}
	
	public UserDetailsResponseDTO getUserResponseDetails(String email) {
		UserDetailsResponseDTO user = userClient.getUserByEmail2(email);
		return user;
	}
}
