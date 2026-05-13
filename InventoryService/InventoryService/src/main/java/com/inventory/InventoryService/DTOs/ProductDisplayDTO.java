package com.inventory.InventoryService.DTOs;

import com.inventory.InventoryService.Utilites.Category;

public class ProductDisplayDTO {
	
	private long productid;
    private String productname;
    private Category category;
    private double productprice;
    

    public ProductDisplayDTO() {}

    public ProductDisplayDTO(long productid, String productname, Category category, double productprice) {
        this.productid = productid;
        this.productname = productname;
        this.category = category;
        this.productprice = productprice;
    }

    // Getters and Setters
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

}
