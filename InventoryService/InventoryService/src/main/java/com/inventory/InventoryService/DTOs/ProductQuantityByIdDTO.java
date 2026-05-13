package com.inventory.InventoryService.DTOs;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;

public class ProductQuantityByIdDTO {
	
	@NotNull(message = "Product ID cannot be null")
    @Min(value = 1, message = "Product ID must be greater than 0")
    private long productid;

    @Min(value = 0, message = "Quantity cannot be negative")
    private int quantity;

    public long getProductid() {
        return productid;
    }

    public void setProductid(long productId) {
        this.productid = productId;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public ProductQuantityByIdDTO(long productId, int quantity) {
        super();
        this.productid = productId;
        this.quantity = quantity;
    }

    public ProductQuantityByIdDTO() {
        super();
    }

}
