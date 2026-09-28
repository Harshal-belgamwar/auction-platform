package project.auctionplatform.Client;


import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.Mapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import project.auctionplatform.Config.FeignConfig;
import project.auctionplatform.DTO.ProductResponse;

@FeignClient(
        name = "product-service",
        url = "http://localhost:8082",
        configuration = FeignConfig.class
)
public interface ProductClient {

    @GetMapping("/api/v1/products/{id}")
    ProductResponse getProductById(@PathVariable Long id);

    @PostMapping("/api/v1/products/{id}/auctioned")
    ResponseEntity<?> updateProductStatusAuctioned(@PathVariable Long id);

    @PostMapping("/api/v1/products/{id}/sold")
    ResponseEntity<?> updateProductStatusSold(@PathVariable Long id);

    @PostMapping("/api/v1/products/{id}/available")
    ResponseEntity<?> updateProductStatusAvailable(@PathVariable Long id);
}
