package com.inventory.InventoryService.Services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

import com.inventory.InventoryService.Configurations.ApplicationConstants;
import com.inventory.InventoryService.Utilites.ProductQuantityMessage;

@Service
public class InventoryConsumerKafkaService {
	
	@Autowired
	private InventoryServics inventoryServics;
	
	@KafkaListener(
			topics = ApplicationConstants.PRODUCT_QUANTITY_UPDATE_TOPIC, 
			groupId = ApplicationConstants.PRODUCT_QUANTITY_UPDATE_GOUP
			)
	public void consumeProductQuantity(ProductQuantityMessage message) {
		System.out.println("Kafka message received: productId=" + message.getProductId() + ", quantity=" + message.getProductQuantity());

		inventoryServics.createProductQuantity(message.getProductId(), message.getProductQuantity());
	}
	
	
	
	@KafkaListener(
			topics = ApplicationConstants.INVENTORY_PRODUCT_QUANTITY_UPDATE_TOPIC,
			groupId = ApplicationConstants.INVENTORY_PRODUCT_QUANTITY_UPDATE_GROUP
			)
	public void consumeProductUpdateQuantity(ProductQuantityMessage message) {
		
		System.out.println("Kafka message received: productId=" + message.getProductId() + ", quantity=" + message.getProductQuantity());

		inventoryServics.updateProductQuantity(message.getProductId(), message.getProductQuantity());
	}

}
