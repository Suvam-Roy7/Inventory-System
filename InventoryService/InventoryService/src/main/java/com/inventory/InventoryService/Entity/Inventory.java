package com.inventory.InventoryService.Entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
public class Inventory {
	
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long inventoryid;

    private long productid;

    private int quantity;

	
	public long getInventoryid() {
		return inventoryid;
	}
	public void setInventoryid(long inventoryid) {
		this.inventoryid = inventoryid;
	}
	public int getQuantity() {
		return quantity;
	}
	public void setQuantity(int quantity) {
		this.quantity = quantity;
	}
	public long getProductid() {
		return productid;
	}
	
	public void setProductid(long product_id) {
		this.productid = product_id;
	}
	public Inventory(long productid, int quantity) {
		super();
		this.productid = productid;
		this.quantity = quantity;
	}
	public Inventory() {
		super();
	}
	
	
	

}
