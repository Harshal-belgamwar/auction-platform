package project.auctionplatform.Client;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import project.auctionplatform.Config.FeignConfig;
import project.auctionplatform.DTO.WinnerInfo;

@FeignClient(
        name = "bidding-service",
        url = "http://localhost:8084",
        configuration = FeignConfig.class
)
public interface BidClient {
    @GetMapping("/api/v1/bidding/{auctionId}/bidcount")
    int getCountBids(@PathVariable Long auctionId);

    @GetMapping("/api/v1/bidding/{auctionId}/winner")
    WinnerInfo getWinner(@PathVariable Long auctionId);
}
