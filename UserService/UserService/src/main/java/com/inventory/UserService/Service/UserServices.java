package com.inventory.UserService.Service;

import java.util.Optional;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.inventory.UserService.DTOs.UserCreationDTO;
import com.inventory.UserService.DTOs.UserDetailsDTO;
import com.inventory.UserService.DTOs.UserDetailsOutputDTO;
import com.inventory.UserService.Entity.Role;
import com.inventory.UserService.Entity.User;
import com.inventory.UserService.Exceptions.DuplicateResource;
import com.inventory.UserService.Exceptions.ResourceNotFoundException;
import com.inventory.UserService.Repo.UsersRepo;

import jakarta.transaction.Transactional;
import jakarta.validation.Valid;

@Service
public class UserServices {

	private UsersRepo usersRepo;

	private ModelMapper modelMapper;

	private PasswordEncoder passwordEncoder;

	@Autowired
	public UserServices(UsersRepo usersRepo, ModelMapper modelMapper, PasswordEncoder passwordEncoder) {
		this.usersRepo = usersRepo;
		this.modelMapper = modelMapper;
		this.passwordEncoder = passwordEncoder;
	}

	public UserDetailsOutputDTO createNewUser(UserCreationDTO userDTO) {

		if (usersRepo.findByEmail(userDTO.getEmail()).isPresent()) {
			throw new DuplicateResource("User already exists with email");
		}

		try {
			User user = new User();

			user.setEmail(userDTO.getEmail());
			user.setPassword(passwordEncoder.encode(userDTO.getPassword()));
			user.setUsername(userDTO.getUsername());
			user.setRole(Role.ASSOCIATE);

			usersRepo.save(user);
			return modelMapper.map(user, UserDetailsOutputDTO.class);
		} catch (Exception e) {
			throw new RuntimeException("Failed to create user", e);
		}

	}

	public UserDetailsOutputDTO getUserById(long userId) {

		User user = usersRepo.findById(userId)
				.orElseThrow(() -> new ResourceNotFoundException("User not found with given userId: " + userId));

		try {
			UserDetailsOutputDTO userDetailsOutputDTO = modelMapper.map(user, UserDetailsOutputDTO.class);
			return userDetailsOutputDTO;
		} catch (Exception e) {
			throw new RuntimeException("Failed to create user", e);
		}

	}

	public boolean validateUser(long userid) {

		Optional<User> optionalUser = usersRepo.findById(userid);

		if (optionalUser.isPresent()) {
			return true;
		} else {
			return false;
		}
	}

	public UserDetailsDTO getUserByEmail(String email) {

		System.out.println("UserService validation email : " + email);

		User user = usersRepo.findByEmail(email).orElseThrow(
				() -> new ResourceNotFoundException("Authentication Fail : User not found with provided email"));

		UserDetailsDTO dto = new UserDetailsDTO(user.getUserid(), user.getUsername(), user.getEmail(), user.getPassword());
		// role list is initialized; safe to add
		dto.getRole().add(user.getRole());

		return dto;

	}

	public boolean validateUserByEmail(String email) {

		Optional<User> optionalUser = usersRepo.findByEmail(email);

		if (optionalUser.isPresent()) {
			System.out.println("User validation sucessfull for email : " + email);
			return true;
		} else {
			return false;
		}

	}
	
	public UserDetailsOutputDTO promoteUserToAdmin(String useremail) {
		
		User user = usersRepo.findByEmail(useremail)
				.orElseThrow(() -> new ResourceNotFoundException("User not found with email: " + useremail));
		
		user.setRole(Role.ADMIN);
		usersRepo.save(user);
		
		return modelMapper.map(user, UserDetailsOutputDTO.class);	
	}
	
	@Transactional
	public boolean deleteUserByEmail(String email) {
		
		User user = usersRepo.findByEmail(email)
				.orElseThrow(() -> new ResourceNotFoundException("User not found with email: " + email));
		
		usersRepo.deleteByEmail(email);
		return true;
		
	}

}