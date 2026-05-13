package com.inventory.InventoryService.DTOs;

public class ProductAddedDisplayDTO {
	
	private Long inventoryid;
    private long productid;

    // Represents the quantity added in the current operation
    private int quantityAdded;

    // Represents the quantity before the current update
    private int pastQuantity;

    // Represents the total quantity after the update
    private int currentAvailableQuantity;

    // Constructors
    public ProductAddedDisplayDTO() {}

    public ProductAddedDisplayDTO(Long inventoryid, long productid, int quantityAdded, int pastQuantity, int currentAvailableQuantity) {
        this.inventoryid = inventoryid;
        this.productid = productid;
        this.quantityAdded = quantityAdded;
        this.pastQuantity = pastQuantity;
        this.currentAvailableQuantity = currentAvailableQuantity;
    }

    // Getters and Setters
    public Long getInventoryid() {
        return inventoryid;
    }

    public void setInventoryid(Long inventoryid) {
        this.inventoryid = inventoryid;
    }

    public long getProductid() {
        return productid;
    }

    public void setProductid(long productid) {
        this.productid = productid;
    }

    public int getQuantityAdded() {
        return quantityAdded;
    }

    public void setQuantityAdded(int quantityAdded) {
        this.quantityAdded = quantityAdded;
    }

    public int getPastQuantity() {
        return pastQuantity;
    }

    public void setPastQuantity(int pastQuantity) {
        this.pastQuantity = pastQuantity;
    }

    public int getCurrentAvailableQuantity() {
        return currentAvailableQuantity;
    }

    public void setCurrentAvailableQuantity(int currentAvailableQuantity) {
        this.currentAvailableQuantity = currentAvailableQuantity;
    }


}
