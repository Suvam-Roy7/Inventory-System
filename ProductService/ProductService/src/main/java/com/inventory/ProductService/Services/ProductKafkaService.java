package com.inventory.ProductService.Services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

import com.inventory.ProductService.Configurations.ApplicationConstants;
import com.inventory.ProductService.Utility.ProductQuantityMessage;

@Service
public class ProductKafkaService {
	
	@Autowired
	private KafkaTemplate<Long, ProductQuantityMessage> kafkaTemplate;
	
	
	public boolean updateProductQuantityInInventory(ProductQuantityMessage pqm) {
		
		kafkaTemplate.send(ApplicationConstants.PRODUCT_QUANTITY_UPDATE_TOPIC, pqm);
		
		return true;
	}
}
