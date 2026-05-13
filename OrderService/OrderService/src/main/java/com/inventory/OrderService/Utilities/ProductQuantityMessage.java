package com.inventory.OrderService.Utilities;

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

	public ProductQuantityMessage(Long productId, int productQuantity) {
		super();
		this.productId = productId;
		this.productQuantity = productQuantity;
	}

    
}
