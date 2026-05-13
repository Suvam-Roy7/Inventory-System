package com.inventory.ProductService.Entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Product {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long productid;
	
	@Column(unique = true)
	private String productname;
	private Category category;
	private double productprice;
	
	
	public Product(String productname, Category category, double productprice) {
		super();
		this.productname = productname;
		this.category = category;
		this.productprice = productprice;
		
	}

	public Product() {
		super();
	}

	public String getProductname() {
		return productname;
	}

	public void setProductname(String productname) {
		this.productname = productname;
	}

	public Category getCategory() {
		return category;
	}

	public void setCategory(Category category) {
		this.category = category;
	}

	public double getProductprice() {
		return productprice;
	}

	public void setProductprice(double productprice) {
		this.productprice = productprice;
	}


	public long getProductid() {
		return productid;
	}

}
