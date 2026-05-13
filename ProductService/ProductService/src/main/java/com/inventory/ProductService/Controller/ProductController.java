package com.inventory.ProductService.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.inventory.ProductService.DTOs.ProductCreationDTO;
import com.inventory.ProductService.DTOs.ProductDisplayDTO;
import com.inventory.ProductService.Entity.Category;
import com.inventory.ProductService.Services.ProductKafkaService;
import com.inventory.ProductService.Services.ProductService;

import io.swagger.v3.oas.annotations.Hidden;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/productservice/products")
public class ProductController {
	
	@Autowired
	private ProductService productService;
	
	@PostMapping("/createnewproduct")
	public ResponseEntity<ProductDisplayDTO> createNewProduct(@Valid @RequestBody ProductCreationDTO productDTO){
		return new ResponseEntity<>(productService.createNewProduct(productDTO), HttpStatus.CREATED);
	}
	
	@GetMapping("/getproducbyid/{productid}")
	public ResponseEntity<ProductDisplayDTO> getProductById(@Valid @PathVariable long productid){
		return new ResponseEntity<>(productService.getProductById(productid), HttpStatus.OK);
	}
	
	@GetMapping("/validateproduct/{productid}")
	@Hidden
	public boolean isValidProductById(@Valid @PathVariable long productid) {
		return productService.validateProductById(productid);
	}
	
	@GetMapping("/getproductprice/{productid}")
	public double getProductPrice(@Valid @PathVariable long productid) {
		return productService.getProductPriceById(productid);
	}
	
	@GetMapping("/getproductname/{productid}")
	public String getProductName(@Valid @PathVariable long productid) {
		return productService.getProductNameById(productid);
	}
	
	@PreAuthorize("hasRole('ADMIN')")
	@DeleteMapping("/admin/deleteproductbyid/{productid}")
	public boolean deleteproductById(@Valid @PathVariable long productid) {
		return productService.deletePeoductById(productid);
	}
	
	@GetMapping("/categories")
	@Hidden
	public Category[] getAllCategories() {
	    return Category.values();
	}
	
	@GetMapping("/getallproducts")
	public ResponseEntity<List<ProductDisplayDTO>> getAllProducts(){
		return new ResponseEntity<>(productService.getAllProducts(), HttpStatus.OK);
	}
	
	@PreAuthorize("hasRole('ADMIN')")
	@PutMapping("/admin/updateproduct/{productid}")
    public ResponseEntity<ProductDisplayDTO> updateProduct(
            @PathVariable long productid,
            @Valid @RequestBody ProductCreationDTO productDTO) {

		ProductDisplayDTO updatedProduct =
                productService.updateProduct(productid, productDTO);

        return ResponseEntity.ok(updatedProduct);
    }
	
}
