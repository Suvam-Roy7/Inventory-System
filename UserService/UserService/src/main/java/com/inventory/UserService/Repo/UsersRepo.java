package com.inventory.UserService.Repo;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.inventory.UserService.Entity.User;

public interface UsersRepo extends JpaRepository<User, Long> {
	
	public Optional<User> findByEmail(String email);
	
	public void deleteByEmail(String email);

}
