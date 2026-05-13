package com.inventory.OrderService.Services;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.inventory.OrderService.Clients.ProductClient;
import com.inventory.OrderService.Clients.UserClient;
import com.inventory.OrderService.DTOs.AddCartItemDTO;
import com.inventory.OrderService.DTOs.CartItmesDisplayDTO;
import com.inventory.OrderService.DTOs.ProductAndQuantityDisplay;
import com.inventory.OrderService.Entity.Cart;
import com.inventory.OrderService.Entity.CartItem;
import com.inventory.OrderService.Exceptions.InvalidResourceException;
import com.inventory.OrderService.Repo.CartItemRepo;
import com.inventory.OrderService.Repo.CartRepo;

import jakarta.transaction.Transactional;

@Service
public class CartService {
	
	
	private final CartRepo cartRepo;
	
	private final CartItemRepo cartItemRepo;
	
	private final UserClient userClient;
	
	private final ProductClient productClient;
	
	@Autowired
	public CartService(CartRepo cartRepo, UserClient userClient, ProductClient productClient, CartItemRepo cartItemRepo) {
		this.cartRepo = cartRepo;
		this.userClient = userClient;
		this.productClient = productClient;
		this.cartItemRepo = cartItemRepo;
	}
	
	@Transactional
	public CartItmesDisplayDTO addToCart(long userid, AddCartItemDTO products) {
		
		if(userClient.isValidateUser(userid)) {
			
			Cart cart = cartRepo.findById(userid).orElse(new Cart(userid, new ArrayList<>()));
			
			Optional<CartItem> optionalItem = cart.getItems().stream().filter(i -> i.getProductId().equals(products.getProductid())).findFirst();
			
			if(optionalItem.isPresent()) {
				
				CartItem cartitem = optionalItem.get();
				cartitem.setQuantity(optionalItem.get().getQuantity() + products.getQuantity());
				
				cartItemRepo.save(cartitem);
				
			}
			else {
				
				if(productClient.isValidProductById(products.getProductid())) {
					CartItem newItem = new CartItem(products.getProductid(), products.getQuantity(), cart);
					cartItemRepo.save(newItem);
					cart.getItems().add(newItem);
				}
				else {
					throw new InvalidResourceException("Product not found with productid : "+ products.getProductid());
				}
				
			}
			
			Cart newCar = cartRepo.save(cart);
			
			List<CartItem> items = cartItemRepo.findAllByCart_UserId(userid);
			
			CartItmesDisplayDTO cid = new CartItmesDisplayDTO();
			cid.setUserid(userid);
			
			for(CartItem citm : items) {
				ProductAndQuantityDisplay paqd = new ProductAndQuantityDisplay();
				paqd.setProductid(citm.getProductId());
				paqd.setProductname(productClient.getProductName(citm.getProductId()));
				paqd.setProductQuantity(citm.getQuantity());
				cid.getProductlist().add(paqd);
			}
			
			return cid;
			
		}else {
			throw new InvalidResourceException("User not found with userid : "+ userid);
		}
		
	}

}
