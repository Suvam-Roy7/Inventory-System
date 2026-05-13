package com.inventory.OrderService.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.inventory.OrderService.DTOs.AddCartItemDTO;
import com.inventory.OrderService.DTOs.CartItmesDisplayDTO;
import com.inventory.OrderService.DTOs.DisplayOrderDetailsDTO;
import com.inventory.OrderService.DTOs.OrderHistoryDisplyDTO;
import com.inventory.OrderService.Entity.Cart;
import com.inventory.OrderService.Services.CartService;
import com.inventory.OrderService.Services.KafkaOrderService;
import com.inventory.OrderService.Services.OrderService;
import com.inventory.OrderService.Utilities.ProductQuantityMessage;

import io.swagger.v3.oas.annotations.Hidden;
import io.swagger.v3.oas.annotations.Operation;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/orderservice/orders")
public class OrderController {
	
	private final CartService cartService;
	
	private final OrderService orderService;
	
	@Autowired
	public OrderController(CartService cartService, OrderService orderService) {
		this.cartService = cartService;
		this.orderService = orderService;
	}
	
	@Autowired
	private KafkaOrderService kafkaOrderService;
	
	@PostMapping("/cart/addproducttocart/{userid}")
	public ResponseEntity<CartItmesDisplayDTO> addToProductCart(@PathVariable long userid, @RequestBody AddCartItemDTO addCartItemDTO){
		System.out.println("Received productid: " + addCartItemDTO.getProductid());
		System.out.println("Received quantity: " + addCartItemDTO.getQuantity());
		return new ResponseEntity<>(cartService.addToCart(userid, addCartItemDTO), HttpStatus.CREATED);
	}
	
	@PostMapping("/testkaftamessages/{proId}/{qua}")
	@Operation(hidden = true)
	public void testOrderKafkaMessages(@PathVariable long proId, @PathVariable int qua) {
		
		ProductQuantityMessage ium = new ProductQuantityMessage(proId, qua);
		
		kafkaOrderService.inventoryProductQuantityUpdate(ium);
	}
	
	@PostMapping("/placeneworder/{userid}")
	public ResponseEntity<DisplayOrderDetailsDTO> placeNewOrder(@PathVariable long userid){
		
		return new ResponseEntity<>(orderService.placeNewOrder(userid), HttpStatus.CREATED);
	}
	
	@Hidden
	@PutMapping("/updatequantity/{userid}/{operation}")
	public ResponseEntity<String> updateQuantity(
	        @PathVariable long userid,
	        @PathVariable String operation,
	        @Valid @RequestBody AddCartItemDTO dto) {

	    orderService.updateQuantity(
	            userid,
	            operation,
	            dto);

	    return ResponseEntity.ok(
	            "Quantity Updated Successfully");
	}
	
	@PreAuthorize("hasRole('ASSOCIATE')")
	@GetMapping("/getcart/{userid}")
	public ResponseEntity<CartItmesDisplayDTO> getCartByUser(
	        @PathVariable long userid) {

	    CartItmesDisplayDTO cart =
	            orderService.getCartByUser(userid);

	    return ResponseEntity.ok(cart);
	}
	
	@GetMapping("/getorderhistoryofuser/{userid}")
	public ResponseEntity<List<OrderHistoryDisplyDTO>> getOrderHistoryByUserId(@PathVariable long userid){
		List<OrderHistoryDisplyDTO> list = orderService.getOrderHistoryByUserId(userid);
		
		return new ResponseEntity<>(list, HttpStatus.OK);
	}

}
