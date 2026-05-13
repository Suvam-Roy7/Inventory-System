package com.inventory.InventoryService.Utilites;

public class ProductQuantityMessage {
	
	private Long productId;
    private int productQuantity;

    public ProductQuantityMessage() {}

    public Long getProductId() {
        return productId;
    }

    public void setProductId(Long productId) {
        this.productId = productId;
    }

    public int getProductQuantity() {
        return productQuantity;
    }

    public void setProductQuantity(int productQuantity) {
        this.productQuantity = productQuantity;
    }


}
