package com.inventory.OrderService.Configurations;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.inventory.OrderService.Components.GlobalFeignInterceptor;

import feign.RequestInterceptor;


@Configuration
public class GlobalFeignConfig {
		
		@Bean
		public RequestInterceptor globalFeignInterceptor() {
			return new GlobalFeignInterceptor();
		}

}