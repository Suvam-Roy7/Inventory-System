package com.inventory.OrderService.Entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class OrderedItems {
	
	//id, order_id, product_id, quantity, price
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long orderitemid;
	
	private long order_id;
	private long product_id;
	private int quantity;
	private double price;
	
	
	public OrderedItems(long order_id, long product_id, int quantity, double price) {
		super();
		
		this.order_id = order_id;
		this.product_id = product_id;
		this.quantity = quantity;
		this.price = price;
	}


	public long getOrder_id() {
		return order_id;
	}


	public void setOrder_id(long order_id) {
		this.order_id = order_id;
	}


	public long getProduct_id() {
		return product_id;
	}


	public void setProduct_id(long product_id) {
		this.product_id = product_id;
	}


	public int getQuantity() {
		return quantity;
	}


	public void setQuantity(int quantity) {
		this.quantity = quantity;
	}


	public double getPrice() {
		return price;
	}


	public void setPrice(double price) {
		this.price = price;
	}


	public long getOrderitemid() {
		return orderitemid;
	}


	public OrderedItems() {
		super();
	}
	
	
}
