package project.auctionplatform.Client;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import project.auctionplatform.Config.FeignConfig;
import project.auctionplatform.DTO.GetUser;

@FeignClient(
        name = "auth-service",
        url = "http://localhost:8081",
        configuration = FeignConfig.class
)
public interface AuthClient {
    @GetMapping("api/v1/auth/{id}/user")
    GetUser getUser(@PathVariable Long sellerId);
}
