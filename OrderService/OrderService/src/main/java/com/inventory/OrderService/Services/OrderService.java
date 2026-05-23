package com.inventory.OrderService.Services;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.Month;
import java.util.*;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.inventory.OrderService.Clients.InventoryClient;
import com.inventory.OrderService.Clients.ProductClient;
import com.inventory.OrderService.Clients.UserClient;
import com.inventory.OrderService.DTOs.AddCartItemDTO;
import com.inventory.OrderService.DTOs.CartItmesDisplayDTO;
import com.inventory.OrderService.DTOs.DisplayOrderDetailsDTO;
import com.inventory.OrderService.DTOs.OrderHistoryDisplyDTO;
import com.inventory.OrderService.DTOs.ProductAndQuantityDisplay;
import com.inventory.OrderService.DTOs.ProductQuantityPriceDisplay;
import com.inventory.OrderService.Entity.Cart;
import com.inventory.OrderService.Entity.CartItem;
import com.inventory.OrderService.Entity.Order;
import com.inventory.OrderService.Entity.OrderedItems;
import com.inventory.OrderService.Exceptions.InsufficientInventoryException;
import com.inventory.OrderService.Exceptions.InvalidResourceException;
import com.inventory.OrderService.Repo.CartItemRepo;
import com.inventory.OrderService.Repo.CartRepo;
import com.inventory.OrderService.Repo.OrderItemRepo;
import com.inventory.OrderService.Repo.OrderRepo;
import com.inventory.OrderService.Utilities.ProductQuantityMessage;

import jakarta.transaction.Transactional;



@Service
public class OrderService {
	
	private ModelMapper modelMapper;
	
	private OrderRepo orderRepo;
	
	private OrderItemRepo orderItemRepo;
	
	private CartRepo cartRepo;
	
	private UserClient userClient;
	
	private InventoryClient inventoryClient;
	
	private KafkaOrderService kafkaOrderService;
	
	private ProductClient productClient;
	
	private CartItemRepo cartItemRepo;
	
	@Autowired
	public OrderService(ModelMapper modelMapper, OrderRepo orderRepo, OrderItemRepo orderItemRepo, 
			CartRepo cartRepo, UserClient userClient, InventoryClient inventoryClient, 
			KafkaOrderService kafkaOrderService, ProductClient productClient, CartItemRepo cartItemRepo) {
		this.modelMapper = modelMapper;
		this.orderItemRepo = orderItemRepo;
		this.orderRepo = orderRepo;
		this.cartRepo = cartRepo;
		this.userClient = userClient;
		this.inventoryClient = inventoryClient;
		this.kafkaOrderService = kafkaOrderService;
		this.productClient = productClient;
		this.cartItemRepo = cartItemRepo;
	}
	
	@Transactional
	public DisplayOrderDetailsDTO placeNewOrder(long userid) {
		
		if(!userClient.isValidateUser(userid)) throw new InvalidResourceException("User not found with userid : "+ userid);
		
		Cart cart = cartRepo.findById(userid).orElseThrow(() -> new InvalidResourceException("Cart not found with userid : "+ userid));
		
		if(cart.getItems().size() == 0) throw new InvalidResourceException("User cart is empty, userid : "+ userid);
		
		Order order = new Order("Sales", userid, "Completed");
		double totalamt = 0;
		
		for(CartItem caritem : cart.getItems()) {
			
			int productQuantity = inventoryClient.getProductQuantityByProductId(caritem.getProductId()).getQuantity();
			
			if(productQuantity < caritem.getQuantity()) throw new InsufficientInventoryException("Required quantity for productid "+caritem.getProductId()+" is not Avalable");
			
			double itemTotal = productClient.getProductPrice(caritem.getProductId()) * caritem.getQuantity();
			
			totalamt = totalamt + itemTotal;
			
			ProductQuantityMessage ium = new ProductQuantityMessage();
			ium.setProductId(caritem.getProductId());
			ium.setProductQuantity(caritem.getQuantity());
			
			kafkaOrderService.inventoryProductQuantityUpdate(ium);
		}
		
		order.setTotalamount(totalamt);
		Order newOrder = orderRepo.save(order);
		
		DisplayOrderDetailsDTO dodd = modelMapper.map(newOrder, DisplayOrderDetailsDTO.class);
		
		for(CartItem caritem : cart.getItems()) {
			
			OrderedItems ordereditem = new OrderedItems(newOrder.getOrderid(), caritem.getProductId(), caritem.getQuantity(), productClient.getProductPrice(caritem.getProductId()));
			OrderedItems iop = orderItemRepo.save(ordereditem);
			
			ProductQuantityPriceDisplay pqpd = new ProductQuantityPriceDisplay();
			pqpd.setProductid(iop.getProduct_id());
			pqpd.setProductname(productClient.getProductName(iop.getProduct_id()));
			pqpd.setProductPrice(productClient.getProductPrice(iop.getProduct_id()));
			pqpd.setProductQuantity(iop.getQuantity());
			
			dodd.getOrderedItems().add(pqpd);
			
			cartItemRepo.deleteById(caritem.getId());
		}
		
		cart.getItems().clear();
		cartRepo.save(cart);
		
		return dodd;
		
	}
	
	@Transactional
	public void updateQuantity(
	        long userid,
	        String operation,
	        AddCartItemDTO dto) {

	    Cart cart = cartRepo.findById(userid)
	            .orElseThrow(() ->
	                new InvalidResourceException(
	                        "Cart not found"));

	    CartItem item = cart.getItems()
	            .stream()
	            .filter(i ->
	                i.getProductId()
	                 .equals(dto.getProductid()))
	            .findFirst()
	            .orElseThrow(() ->
	                new InvalidResourceException(
	                        "Product not found in cart"));

	    // ADD QUANTITY
	    if(operation.equalsIgnoreCase("add")) {

	        item.setQuantity(
	                item.getQuantity() + 1);

	    }

	    // SUBTRACT QUANTITY
	    else if(operation.equalsIgnoreCase("subtract")) {

	        int updatedQty = item.getQuantity() - 1;
	        
	        System.out.println("*************************************************************");
	        System.out.println("Quantity : "+ updatedQty);
	        System.out.println("*************************************************************");
	        
	        // REMOVE ITEM IF 0
	        if(updatedQty <= 0) {

	            cart.getItems().remove(item);

	            cartItemRepo.delete(item);

	            cartRepo.save(cart); // 🔥 IMPORTANT FIX

	            return;
	        }

	        item.setQuantity(updatedQty);
	    }
	    
	    else if (operation.equalsIgnoreCase("manual")) {

	        if (dto.getQuantity() <= 0) {

	            cart.getItems().remove(item);

	            cartItemRepo.delete(item);

	            cartRepo.save(cart);

	            return;
	        }

	        item.setQuantity(dto.getQuantity());
	    }

	    else {

	        throw new InvalidResourceException(
	                "Invalid operation");
	    }

	    cartItemRepo.save(item);
	}
	
	@Transactional
	public CartItmesDisplayDTO getCartByUser(long userid) {

	    // Validate User
	    if (!userClient.isValidateUser(userid)) {

	        throw new InvalidResourceException(
	                "User not found with userid : " + userid);
	    }

	    // Get Cart
	    Cart cart = cartRepo.findById(userid)
	            .orElseThrow(() ->
	                    new InvalidResourceException(
	                            "Cart not found"));

	    // Fetch Cart Items
	    List<CartItem> items =
	            cartItemRepo.findAllByCart_UserId(userid);

	    // DTO Response
	    CartItmesDisplayDTO response =
	            new CartItmesDisplayDTO();

	    response.setUserid(userid);

	    // Total Amount
	    double totalAmount = 0;

	    for (CartItem item : items) {

	        ProductAndQuantityDisplay dto =
	                new ProductAndQuantityDisplay();

	        dto.setProductid(item.getProductId());

	        dto.setProductname(
	                productClient.getProductName(
	                        item.getProductId()));

	        dto.setProductQuantity(
	                item.getQuantity());

	        response.getProductlist().add(dto);

	        // Calculate Total
	        double productPrice =
	                productClient.getProductPrice(
	                        item.getProductId());

	        totalAmount +=
	                productPrice * item.getQuantity();
	    }

	    response.setTotalAmount(totalAmount);

	    return response;
	}
	 
	public List<OrderHistoryDisplyDTO> getOrderHistoryByUserId(long userid){
		
		List<Order> orderList = orderRepo.findByUserId(userid);
		
		System.out.println("Order List : "+orderList);
		
		Map<Long, List<OrderedItems>> map = new HashMap<>();
		
		for(Order ord : orderList) {
			map.put(ord.getOrderid(), orderItemRepo.findByOrderId(ord.getOrderid()));
		}
		

		System.out.println("Map : "+map);
		
		
		List<OrderHistoryDisplyDTO> ordDisplayList = new ArrayList<>();
		
		for(Order ord : orderList) {
			
			OrderHistoryDisplyDTO o = new OrderHistoryDisplyDTO();
			o.setOrderid(ord.getOrderid());
			o.setType(ord.getType());
			o.setTotalamount(ord.getTotalamount());
			o.setDate(ord.getDate());
			o.setStatus(ord.getStatus());
			o.setOrderItems(map.get(ord.getOrderid()));
			
			ordDisplayList.add(o);
			
		}
		
		return ordDisplayList;
	}
	
	public Map<String, Double> getMonthilySales(){
		
		LocalDateTime date = LocalDateTime.now();
		
		int year = date.getYear();
		
		List<Order> oredrList = orderRepo.findOrdersByYear(year);
		
		Map<String, Double> result = new HashMap<>();
		
		for(Order o : oredrList) {
			
			String mon = o.getDate().getMonth().toString();
			
			if(result.containsKey(mon)) {
				result.put(mon, result.get(mon) + o.getTotalamount());
			}
			else {
				result.put(mon, o.getTotalamount());
			}
		}
		
		
		return result;
		
	}
}
