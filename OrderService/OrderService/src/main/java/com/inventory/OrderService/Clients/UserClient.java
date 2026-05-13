package com.inventory.OrderService.Clients;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import com.inventory.OrderService.Configurations.GlobalFeignConfig;

@FeignClient(name = "USERSERVICE", configuration = GlobalFeignConfig.class)
public interface UserClient {
	
	@GetMapping("/userservice/users/validateuser/{userid}")
	boolean isValidateUser(@PathVariable long userid);
}
