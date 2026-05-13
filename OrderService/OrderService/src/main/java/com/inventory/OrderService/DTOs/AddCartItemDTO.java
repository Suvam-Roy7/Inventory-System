package com.inventory.OrderService.DTOs;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;

public class AddCartItemDTO {

    @NotNull(message = "Product ID must not be null")
    @JsonProperty("productid")
    private Long productid;

    @NotNull(message = "Quantity must not be null")
    @JsonProperty("quantity")
    private Integer quantity;

    public AddCartItemDTO() {
        // No-args constructor required for Jackson
    }

    public AddCartItemDTO(Long productid, Integer quantity) {
        this.productid = productid;
        this.quantity = quantity;
    }

    public Long getProductid() {
        return productid;
    }

    public void setProductid(Long productid) {
        this.productid = productid;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }
}