package com.inventory.OrderService.Utilities;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;

public class ProductQuantityByIdDTO {
	
    private long productid;

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
