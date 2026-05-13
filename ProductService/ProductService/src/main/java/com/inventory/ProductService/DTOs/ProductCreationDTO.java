package com.inventory.ProductService.DTOs;

import com.inventory.ProductService.Entity.Category;

import jakarta.validation.constraints.*;

public class ProductCreationDTO {
	
	@NotBlank(message = "Product name is required")
    private String productname;

    @NotNull(message = "Category is required")
    private Category category;

    @Min(value = 0, message = "Product price must be non-negative")
    private double productprice;

    @Min(value = 0, message = "Quantity must be non-negative")
    private int quantity;

    public ProductCreationDTO() {}

    public ProductCreationDTO(String productname, Category category, double productprice, int quantity) {
        this.productname = productname;
        this.category = category;
        this.productprice = productprice;
        this.quantity = quantity;
    }

    // Getters and Setters
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

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

}
