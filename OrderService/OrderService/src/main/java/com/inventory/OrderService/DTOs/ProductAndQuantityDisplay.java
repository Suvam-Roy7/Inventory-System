package com.inventory.OrderService.DTOs;

public class ProductAndQuantityDisplay {
	
	private long productid;
	private String productname;
	private int productQuantity;
	
	public long getProductid() {
		return productid;
	}
	public void setProductid(long productid) {
		this.productid = productid;
	}
	public String getProductname() {
		return productname;
	}
	public void setProductname(String productname) {
		this.productname = productname;
	}
	public int getProductQuantity() {
		return productQuantity;
	}
	public void setProductQuantity(int productQuantity) {
		this.productQuantity = productQuantity;
	}
	public ProductAndQuantityDisplay(long productid, String productname, int productQuantity) {
		super();
		this.productid = productid;
		this.productname = productname;
		this.productQuantity = productQuantity;
	}
	public ProductAndQuantityDisplay() {
		super();
	}
}
