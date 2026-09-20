package project.productservice.Service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import project.productservice.DTO.ProductRequest;
import project.productservice.DTO.ProductResponse;
import project.productservice.DTO.ProductUpdateRequest;
import project.productservice.Enum.ProductStatus;
import project.productservice.ExceptionHandler.ResourceNotFoundException;
import project.productservice.Model.Category;
import project.productservice.Model.Product;
import project.productservice.Model.ProductImages;
import project.productservice.Repository.CategoryRepository;
import project.productservice.Repository.ProductImagesRepository;
import project.productservice.Repository.ProductRepository;
import project.productservice.Service.CurrentUserService;

import java.time.LocalDateTime;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ProductService {

    private final ProductRepository productRepository;
    private final CategoryRepository categoryRepository;
    private final CurrentUserService currentUserService;
    private final CloudinaryService cloudinaryService;
    private final ProductImagesRepository productImagesRepository;


    // CREATE PRODUCT
    public ProductResponse createProduct(ProductRequest request) {

//        fetch current user
        Long userId = currentUserService.getUserId();


        Category category = categoryRepository
                .findById(request.getCategoryId())
                .orElseThrow(() ->
                        new ResourceNotFoundException("Category not found"));

//        create a product

        Product product = new Product();

        product.setCategory(category);
        product.setName(request.getName());
        product.setDescription(request.getDescription());
//        product.setCondition(request.getCondition());
        product.setCreatedAt(LocalDateTime.now());
        product.setSellerId(userId);
        product.setStatus(ProductStatus.AVAILABLE);

//      Save Product
        Product savedProduct = productRepository.save(product);


//        ADD Product to each Image and save it

        for (MultipartFile image : request.getImages()) {

            String imageUrl =
                    cloudinaryService.uploadImage(image);

            // 4. Create ProductImage
            ProductImages productImage = new ProductImages();
            productImage.setImageUrl(imageUrl);
            productImage.setProduct(savedProduct);


            // 5. Save image
            productImagesRepository.save(productImage);
        }




        return mapToResponse(savedProduct);
    }


    // GET MY PRODUCTS
    public List<ProductResponse> getAllProducts() {

        Long userId = currentUserService.getUserId();

        return productRepository.findBySellerId(userId)
                .stream()
                .map(product -> {

                    Map<Long, String> imageMap = productImagesRepository
                            .findByProductId(product.getId())
                            .stream()
                            .collect(Collectors.toMap(
                                    ProductImages::getId,
                                    ProductImages::getImageUrl
                            ));

                    ProductResponse response = mapToResponse(product);

                    response.setImageUrls(imageMap);

                    return response;
                })
                .collect(Collectors.toList());
    }


    // GET PRODUCT BY ID
    public ProductResponse getProductById(Long id) {

        Optional<Product> pro = productRepository.findById(id);

        if (!pro.isPresent()) {
            throw new ResourceNotFoundException("Product not found");
        }

        Map<Long, String> imageMap = productImagesRepository
                .findByProductId(pro.get().getId())
                .stream()
                .collect(Collectors.toMap(
                        ProductImages::getId,
                        ProductImages::getImageUrl
                ));

        ProductResponse response = mapToResponse(pro.get());

        response.setImageUrls(imageMap);

        return response;
    }


    // UPDATE PRODUCT
    public ProductResponse updateProduct(
            Long id,
            ProductUpdateRequest updatedProduct) {

        Product product = productRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Product not found"));

        product.setName(updatedProduct.getName());
        product.setDescription(updatedProduct.getDescription());
//        product.setCondition(updatedProduct.getCondition());

        if (updatedProduct.getCategoryId() != null) {

            Category category = categoryRepository
                    .findById(updatedProduct.getCategoryId())
                    .orElseThrow(() ->
                            new ResourceNotFoundException("Category not found"));

            product.setCategory(category);
        }
        List<ProductImages> productImages = productImagesRepository.findByProductId(id);

        for(ProductImages productImage : productImages) {
            if(!updatedProduct.getImageUrls().containsKey(productImage.getId())) {
                productImagesRepository.deleteById(productImage.getId());
            }
        }

        if (updatedProduct.getImages() != null) {

            for (MultipartFile image : updatedProduct.getImages()) {

                if (image == null || image.isEmpty()) {
                    continue;
                }

                String imageUrl =
                        cloudinaryService.uploadImage(image);

                ProductImages productImage =
                        new ProductImages();

                productImage.setImageUrl(imageUrl);
                productImage.setProduct(product);

                productImagesRepository.save(productImage);
            }
        }



        Product savedProduct = productRepository.save(product);

        return mapToResponse(savedProduct);
    }


    // DELETE PRODUCT
    public void deleteProduct(Long id) {

        Product product = productRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Product not found"));

        productRepository.delete(product);
    }

//    update product status



    // PRODUCT → PRODUCT RESPONSE
    private ProductResponse mapToResponse(Product product) {

        return ProductResponse.builder()
                .id(product.getId())
                .sellerId(product.getSellerId())
                .name(product.getName())
                .description(product.getDescription())
                .categoryId(product.getCategory().getId())
                .categoryName(product.getCategory().getName())
//                .condition(product.getCondition())
                .status(product.getStatus())
                .createdAt(product.getCreatedAt())
                .updatedAt(product.getUpdatedAt())
                .build();
    }
}