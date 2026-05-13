package com.inventory.ProductService.Services;

import org.apache.kafka.common.errors.ResourceNotFoundException;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import com.inventory.ProductService.DTOs.ProductCreationDTO;
import com.inventory.ProductService.DTOs.ProductDisplayDTO;
import com.inventory.ProductService.Entity.Product;
import com.inventory.ProductService.Exceptions.DuplicateProductException;
import com.inventory.ProductService.Exceptions.ProductNotFoundException;
import com.inventory.ProductService.Repo.ProductRepo;
import com.inventory.ProductService.Utility.ProductQuantityMessage;

import jakarta.transaction.Transactional;

import java.util.*;

@Service
public class ProductService {
	
	private ModelMapper modelMapper;
	
	private ProductRepo productRepo;
	
	private ProductKafkaService productKafkaService;
	
	public ProductService(ModelMapper modelMapper, ProductRepo productRepo, ProductKafkaService productKafkaService) {
		this.modelMapper = modelMapper;
		this.productRepo = productRepo;
		this.productKafkaService = productKafkaService;
	}
	
	@Transactional
	public ProductDisplayDTO createNewProduct(ProductCreationDTO productDTO) {
		
		if(productRepo.findByProductname(productDTO.getProductname()).isPresent()) 
			throw new DuplicateProductException("Product alreay exixt with name : "+ productDTO.getProductname());
		
		try {
			
			Product product = productRepo.save(modelMapper.map(productDTO, Product.class));
			
			ProductQuantityMessage pqm = new ProductQuantityMessage();
			pqm.setProductId(product.getProductid());
			pqm.setProductQuantity(productDTO.getQuantity());
			
			productKafkaService.updateProductQuantityInInventory(pqm);
			
			return modelMapper.map(product, ProductDisplayDTO.class);
		}
		catch(Exception e) {
			throw new RuntimeException("Product Not Created");
		}
		
	}
	
	public ProductDisplayDTO getProductById(long productid) {
		
		Product product =  productRepo.findById(productid)
				.orElseThrow(() -> new ProductNotFoundException("Product is not avalable with id : "+ productid));
		
		return modelMapper.map(product, ProductDisplayDTO.class);
	}
	
	public boolean validateProductById(long productid) {
		if(productRepo.findById(productid).isPresent()) {
			return true;
		}
		else {
			return false;
		}
	}
	
	public double getProductPriceById(long productid) {
		Product product =  productRepo.findById(productid)
				.orElseThrow(() -> new ProductNotFoundException("Product is not avalable with id : "+ productid));
		
		return product.getProductprice();
	}
	
	public String getProductNameById(long productid) {
		Product product =  productRepo.findById(productid)
				.orElseThrow(() -> new ProductNotFoundException("Product is not avalable with id : "+ productid));
		
		return product.getProductname();
	}
	
	public boolean deletePeoductById(long productid) {
		
		boolean product =  validateProductById(productid);
				
		if(product) {
			productRepo.deleteById(productid);
			return true;
		}
		else {
			return false;
		}
		
	}
	
	public ProductDisplayDTO updateProductPriceByProductId(long productid, double newamount) {
		
		Product product =  productRepo.findById(productid)
				.orElseThrow(() -> new ProductNotFoundException("Product is not avalable with id : "+ productid));
		
		product.setProductprice(newamount);
		productRepo.save(product);
		
		return modelMapper.map(product, ProductDisplayDTO.class);
		
	}

	public List<ProductDisplayDTO> getAllProducts() {

	    List<Product> productList = productRepo.findAll();

	    return productList.stream()
	            .map(product -> modelMapper.map(product, ProductDisplayDTO.class))
	            .toList();
	}
	
	@Transactional
	public ProductDisplayDTO updateProduct(long productid,
            ProductCreationDTO productDTO) {

		// Find Existing Product
		Product product = productRepo.findById(productid)
		.orElseThrow(() ->
		   new ResourceNotFoundException(
		           "Product Not Found"));
		
		// Update Fields
		product.setProductname(productDTO.getProductname());
		
		product.setCategory(productDTO.getCategory());
		
		product.setProductprice(productDTO.getProductprice());
		
		ProductQuantityMessage pqm = new ProductQuantityMessage();
		pqm.setProductId(product.getProductid());
		pqm.setProductQuantity(productDTO.getQuantity());
		
		productKafkaService.updateProductQuantityInInventory(pqm);
		
		// Save Updated Product
		Product updatedProduct =
				productRepo.save(product);
		
		ProductDisplayDTO dto = modelMapper.map(product, ProductDisplayDTO.class);
		
		return dto;
	}
}
