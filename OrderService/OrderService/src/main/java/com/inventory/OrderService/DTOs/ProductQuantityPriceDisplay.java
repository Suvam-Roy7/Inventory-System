package com.inventory.OrderService.DTOs;

public class ProductQuantityPriceDisplay {
	
	private long productid;
	private String productname;
	private int productQuantity;
	private double productPrice;
	
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
	public ProductQuantityPriceDisplay(long productid, String productname, int productQuantity, int productPrice) {
		super();
		this.productid = productid;
		this.productname = productname;
		this.productQuantity = productQuantity;
		this.productPrice = productPrice;
	}
	public ProductQuantityPriceDisplay() {
		super();
	}
	public double getProductPrice() {
		return productPrice;
	}
	public void setProductPrice(double productPrice) {
		this.productPrice = productPrice;
	}
	
}
