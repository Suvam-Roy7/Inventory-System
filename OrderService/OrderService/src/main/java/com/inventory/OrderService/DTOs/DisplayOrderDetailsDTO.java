package com.inventory.OrderService.DTOs;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import com.inventory.OrderService.Entity.OrderedItems;

public class DisplayOrderDetailsDTO {
	
	private long orderid;
    private String type;
    private long user_id;
    private LocalDateTime date;
    private String status;
    private double totalamount;
    private List<ProductQuantityPriceDisplay> orderedItems = new ArrayList<>();

    public DisplayOrderDetailsDTO() {
        super();
    }

    public DisplayOrderDetailsDTO(long orderid, String type, long user_id, LocalDateTime date, String status, double totalamount) {
        this.orderid = orderid;
        this.type = type;
        this.user_id = user_id;
        this.date = date;
        this.status = status;
        this.totalamount = totalamount;
    }

    public long getOrderid() {
        return orderid;
    }

    public void setOrderid(long orderid) {
        this.orderid = orderid;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public long getUser_id() {
        return user_id;
    }

    public void setUser_id(long user_id) {
        this.user_id = user_id;
    }

    public LocalDateTime getDate() {
        return date;
    }

    public void setDate(LocalDateTime date) {
        this.date = date;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public double getTotalamount() {
        return totalamount;
    }

    public void setTotalamount(double totalamount) {
        this.totalamount = totalamount;
    }

    public List<ProductQuantityPriceDisplay> getOrderedItems() {
        return orderedItems;
    }

    public void setOrderedItems(List<ProductQuantityPriceDisplay> orderedItems) {
        this.orderedItems = orderedItems;
    }


}
