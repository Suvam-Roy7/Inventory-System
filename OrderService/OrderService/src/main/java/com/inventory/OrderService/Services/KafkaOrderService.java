package com.inventory.OrderService.Services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

import com.inventory.OrderService.Configurations.ApplicationConstants;
import com.inventory.OrderService.Utilities.ProductQuantityMessage;

@Service
public class KafkaOrderService {
	
	@Autowired
	private KafkaTemplate<Long, ProductQuantityMessage> kafkaTemplate;
	
	public boolean inventoryProductQuantityUpdate(ProductQuantityMessage ium) {
		
		kafkaTemplate.send(ApplicationConstants.INVENTORY_PRODUCT_QUANTITY_UPDATE, ium);
		
		return true;
	}

}
