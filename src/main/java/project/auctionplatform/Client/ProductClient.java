package project.auctionplatform.Client;


import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
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
}
