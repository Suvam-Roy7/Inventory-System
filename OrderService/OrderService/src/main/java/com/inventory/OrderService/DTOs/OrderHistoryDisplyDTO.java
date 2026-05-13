package com.inventory.OrderService.DTOs;

import java.time.LocalDateTime;

import java.util.*;

import com.inventory.OrderService.Entity.OrderedItems;

public class OrderHistoryDisplyDTO {
	
	private long orderid;
	private String type;
	private LocalDateTime date;
	private String status;
	private double totalamount;
	
	private List<OrderedItems> orderItems;

	public long getOrderid() {
		return orderid;
	}

	public void setOrderid(long orderid) {
		this.orderid = orderid;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public LocalDateTime getDate() {
		return date;
	}

	public void setDate(LocalDateTime date) {
		this.date = date;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public double getTotalamount() {
		return totalamount;
	}

	public void setTotalamount(double totalamount) {
		this.totalamount = totalamount;
	}

	public List<OrderedItems> getOrderItems() {
		return orderItems;
	}

	public void setOrderItems(List<OrderedItems> orderItems) {
		this.orderItems = orderItems;
	}

	public OrderHistoryDisplyDTO(long orderid, String type,  LocalDateTime date, String status,
			double totalamount, List<OrderedItems> orderItems) {
		super();
		this.orderid = orderid;
		this.type = type;
		
		this.date = date;
		this.status = status;
		this.totalamount = totalamount;
		this.orderItems = orderItems;
	}

	public OrderHistoryDisplyDTO() {
		super();
	}

}
