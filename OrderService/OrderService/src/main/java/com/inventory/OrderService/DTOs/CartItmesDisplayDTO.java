package com.inventory.OrderService.DTOs;

import java.util.ArrayList;
import java.util.List;

public class CartItmesDisplayDTO {

    private Long userid;

    private List<ProductAndQuantityDisplay> productlist = new ArrayList<>();

    private Double totalAmount;

    public CartItmesDisplayDTO() {
    }

    public CartItmesDisplayDTO(Long userid, List<ProductAndQuantityDisplay> productlist, Double totalAmount) {
        this.userid = userid;
        this.productlist = productlist;
        this.totalAmount = totalAmount;
    }

    public Long getUserid() {
        return userid;
    }

    public void setUserid(Long userid) {
        this.userid = userid;
    }

    public List<ProductAndQuantityDisplay> getProductlist() {
        return productlist;
    }

    public void setProductlist(List<ProductAndQuantityDisplay> productlist) {
        this.productlist = productlist;
    }

    public Double getTotalAmount() {
        return totalAmount;
    }

    public void setTotalAmount(Double totalAmount) {
        this.totalAmount = totalAmount;
    }
}