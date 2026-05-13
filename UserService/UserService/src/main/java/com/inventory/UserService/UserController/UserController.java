package com.inventory.UserService.UserController;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.inventory.UserService.DTOs.AuthLoginRequestDTO;
import com.inventory.UserService.DTOs.UserCreationDTO;
import com.inventory.UserService.DTOs.UserDetailsDTO;
import com.inventory.UserService.DTOs.UserDetailsOutputDTO;
import com.inventory.UserService.Service.UserServices;

import io.swagger.v3.oas.annotations.Operation;
import jakarta.validation.Valid;


@RestController
@RequestMapping("/userservice/users")
public class UserController {
	
	@Autowired
	private UserServices userServices;
	
	@GetMapping("/getuserbyid/{userid}")
	public ResponseEntity<UserDetailsOutputDTO> getUserByUserId(@Valid @PathVariable long userid){
		
		return new ResponseEntity<>(userServices.getUserById(userid), HttpStatus.OK); 
	}
	
	@PostMapping("/createnewuser")
	public ResponseEntity<UserDetailsOutputDTO> createNewUser(@Valid @RequestBody UserCreationDTO userDTO){
		
		return new ResponseEntity<>(userServices.createNewUser(userDTO), HttpStatus.CREATED); 
	}
	
	@GetMapping("/validateuser/{userid}")
	@Operation(hidden = true)
	public boolean validateUser(@Valid @PathVariable long userid) {
		return userServices.validateUser(userid);
	}
	
	@GetMapping("/client/validateuserbyemail/{email}")
	@Operation(hidden = true)
	public boolean validateUserAuth(@Valid @PathVariable String email) {
		return userServices.validateUserByEmail(email);
	}
	
	@GetMapping("/client/getuserbyemail/{email}")
	public ResponseEntity<UserDetailsDTO> getUserByEmail(@Valid @PathVariable String email){
		UserDetailsDTO userDetailsDTO = userServices.getUserByEmail(email);
		return new ResponseEntity<>(userDetailsDTO, HttpStatus.OK);
	}
	
	@PreAuthorize("hasRole('ADMIN')")
	@PutMapping("/admin/promoteusertoadmin/{email}")
	public ResponseEntity<UserDetailsOutputDTO> promoteUserToAdmin(@Valid  @PathVariable String email){
		UserDetailsOutputDTO userDetailsDTO = userServices.promoteUserToAdmin(email);
		return new ResponseEntity<>(userDetailsDTO, HttpStatus.OK);
	}
	
	@PreAuthorize("hasRole('ADMIN')")
	@DeleteMapping("/admin/deleteUserByEmail/{email}")
	public ResponseEntity<Boolean> deleteUserByEmail(@Valid @PathVariable String email){
		return new ResponseEntity<>(userServices.deleteUserByEmail(email), HttpStatus.OK);
	}
}
