package project.biddingservice.Client;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import project.biddingservice.Config.FeignConfig;
import project.biddingservice.DTO.GetUser;

@FeignClient(
        name = "Auth-Service",
        url = "http://localhost:8081",
        configuration = FeignConfig.class
)
public interface AuthClient {

    @GetMapping("/{id}/user")
    GetUser getUser(@PathVariable Long id);
}
