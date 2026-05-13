package com.inventory.OrderService.Configurations;

import java.util.jar.Attributes.Name;

import org.apache.kafka.clients.admin.NewTopic;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.kafka.config.TopicBuilder;

@Configuration
public class KafkaTopicConfiguration {
	
	@Bean
	public NewTopic topic() {
		
		return TopicBuilder
					.name(ApplicationConstants.INVENTORY_PRODUCT_QUANTITY_UPDATE)
					.build();
	}
		

}
