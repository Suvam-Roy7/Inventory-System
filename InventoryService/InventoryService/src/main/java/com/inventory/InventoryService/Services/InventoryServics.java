package com.inventory.InventoryService.Services;



import java.util.Optional;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.inventory.InventoryService.Client.ProductClient;
import com.inventory.InventoryService.DTOs.ProductAddedDisplayDTO;
import com.inventory.InventoryService.DTOs.ProductQuantityByIdDTO;
import com.inventory.InventoryService.Entity.Inventory;
import com.inventory.InventoryService.Exception.ProductNotFoundException;
import com.inventory.InventoryService.Repo.InventoryRepo;

@Service
public class InventoryServics {
	
	private InventoryRepo inventoryRepo;
	
	private ModelMapper modelMapper;
	
	private ProductClient productClient;
	
	@Autowired
	public InventoryServics(InventoryRepo inventoryRepo, ModelMapper modelMapper, ProductClient productClient) {
		this.inventoryRepo = inventoryRepo;
		this.modelMapper = modelMapper;
		this.productClient = productClient;
	}
	
	public ProductAddedDisplayDTO createProductQuantity(long productid, int quantity) {
		
		if(!productClient.isValidProductById(productid))
			throw new ProductNotFoundException("Product is not avalable in Inventory with id : "+ productid);
		
		try {
	        Optional<Inventory> inventoryOpt = inventoryRepo.findByProductid(productid);

	        if (inventoryOpt.isPresent()) {
	        	
	            Inventory inventory = inventoryOpt.get();
	            
	            ProductAddedDisplayDTO productAddedDisplayDTO = new ProductAddedDisplayDTO();
	            
	            productAddedDisplayDTO.setInventoryid(inventory.getInventoryid());
	            productAddedDisplayDTO.setProductid(productid);
	            productAddedDisplayDTO.setPastQuantity(inventory.getQuantity());
	            productAddedDisplayDTO.setQuantityAdded(quantity);
	            productAddedDisplayDTO.setCurrentAvailableQuantity(inventory.getQuantity() + quantity);
	            
	            inventory.setQuantity(inventory.getQuantity() + quantity);
	            
	            inventoryRepo.save(inventory);
	            
	            return productAddedDisplayDTO;
	            
	        } else {
	            Inventory inventory = new Inventory(productid, quantity);
	            
	            Inventory inventoryTemp =  inventoryRepo.save(inventory);
	            
	            ProductAddedDisplayDTO productAddedDisplayDTO = new ProductAddedDisplayDTO();
	            
	            productAddedDisplayDTO.setInventoryid(inventoryTemp.getInventoryid());
	            productAddedDisplayDTO.setProductid(productid);
	            productAddedDisplayDTO.setPastQuantity(0);
	            productAddedDisplayDTO.setQuantityAdded(quantity);
	            productAddedDisplayDTO.setCurrentAvailableQuantity(quantity);
	            
	            return productAddedDisplayDTO;
	        }

	    } catch (Exception ex) {
	        // Log the actual exception for debugging
	        System.err.println("Error updating product quantity for product ID " + productid + ": " + ex.getMessage());
	        ex.printStackTrace();

	        // Optionally wrap the original exception
	        throw new RuntimeException("Product Quantity cannot be updated to inventory", ex);
	    }

	}
	
	public ProductQuantityByIdDTO getProductQuantityById(long productId) {
		
		Inventory productInv =  inventoryRepo.findByProductid(productId)
				.orElseThrow(() -> new ProductNotFoundException("Product is not avalable in Inventory with id : "+ productId));
		
		return modelMapper.map(productInv, ProductQuantityByIdDTO.class);
		
	}
	
	public void updateProductQuantity(long productid, int quantity) {
		
		Inventory inventory = inventoryRepo.findByProductid(productid).orElseThrow( 
				() -> new ProductNotFoundException("Product is not avalable in Inventory with id : "+ productid));
		
		inventory.setQuantity(inventory.getQuantity() - quantity);
		
		inventoryRepo.save(inventory);
	}

}
