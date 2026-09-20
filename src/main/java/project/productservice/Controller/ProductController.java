package project.productservice.Controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import project.productservice.DTO.*;
import project.productservice.Service.CategoryService;
import project.productservice.Service.ProductService;

import java.util.List;

@RestController
@RequestMapping("/api/v1/products")
@RequiredArgsConstructor
public class ProductController {

    private final ProductService productService;
    private final CategoryService categoryService;




    // CREATE PRODUCT
    @PostMapping(

            consumes = MediaType.MULTIPART_FORM_DATA_VALUE
    )
    public ResponseEntity<ProductResponse> createProduct(
            @Valid @ModelAttribute ProductRequest request) {

        ProductResponse response =
                productService.createProduct(request);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(response);
    }


    // GET MY PRODUCTS
    @GetMapping("/my")
    public List<ProductResponse> getMyProducts() {

        return productService.getAllProducts();

    }


    // GET PRODUCT BY ID
    @GetMapping("/{id}")
    public ResponseEntity<ProductResponse> getProductById(
            @PathVariable Long id) {

        return ResponseEntity.ok(
                productService.getProductById(id)
        );
    }


    // UPDATE PRODUCT
    @PutMapping(path = "/{id}",
    consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<ProductResponse> updateProduct(
            @PathVariable Long id,
            @Valid @ModelAttribute ProductUpdateRequest request) {

        return ResponseEntity.ok(
                productService.updateProduct(id, request)
        );
    }


    // DELETE PRODUCT
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProduct(
            @PathVariable Long id) {

        productService.deleteProduct(id);

        return ResponseEntity.noContent().build();
    }

//    Category

    @PostMapping("/category")
    public ResponseEntity<CategoryResponse> createCategory(
            @Valid @RequestBody CategoryRequest request) {

        CategoryResponse response =
                categoryService.createCategory(request);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(response);
    }


    // GET ALL CATEGORIES
    @GetMapping("/category")
    public ResponseEntity<List<CategoryResponse>> getAllCategories() {

        return ResponseEntity.ok(
                categoryService.getAllCategories()
        );
    }


    // GET CATEGORY BY ID
    @GetMapping("/category/{id}")
    public ResponseEntity<CategoryResponse> getCategoryById(
            @PathVariable Long id) {

        return ResponseEntity.ok(
                categoryService.getCategoryById(id)
        );
    }


    // UPDATE CATEGORY
    @PutMapping("/category/{id}")
    public ResponseEntity<CategoryResponse> updateCategory(
            @PathVariable Long id,
            @Valid @RequestBody CategoryRequest request) {

        return ResponseEntity.ok(
                categoryService.updateCategory(id, request)
        );
    }


    // DELETE CATEGORY
    @DeleteMapping("/category/{id}")
    public ResponseEntity<Void> deleteCategory(
            @PathVariable Long id) {

        categoryService.deleteCategory(id);

        return ResponseEntity.noContent().build();
    }
}