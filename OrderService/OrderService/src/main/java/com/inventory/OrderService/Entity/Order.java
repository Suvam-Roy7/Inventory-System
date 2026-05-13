package com.inventory.OrderService.Entity;

import java.time.LocalDate;
import java.time.LocalDateTime;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "Orders")
public class Order {

	
	//id, type (purchase/sales), user_id, supplier_id, order_date, status
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long orderid;
	private String type;
	private long user_id;
	private LocalDateTime date;
	private String status;
	private double totalamount;
	
	
	public Order(String type, long user_id, String status) {
		super();
		this.type = type;
		this.user_id = user_id;
		this.date = LocalDateTime.now();
		this.status = status;
	}
	
	

	public Order() {
		super();
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public long getUser_id() {
		return user_id;
	}

	public void setUser_id(long user_id) {
		this.user_id = user_id;
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

	public long getOrderid() {
		return orderid;
	}

	public double getTotalamount() {
		return totalamount;
	}

	public void setTotalamount(double totalamount) {
		this.totalamount = totalamount;
	}
	
	
}
