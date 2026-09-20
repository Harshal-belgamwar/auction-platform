package project.biddingservice.Client;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import project.biddingservice.Config.FeignConfig;
import project.biddingservice.DTO.AuctionResponse;
import project.biddingservice.DTO.UpdatePrice;

import java.util.List;


@FeignClient(
        name = "auction-service",
        url = "http://localhost:8083",
        configuration = FeignConfig.class
)
public  interface AuctionClient {

    @PostMapping("/api/v1/auctions/mybids")
    List<AuctionResponse> getMyParticipatedAuctions(@RequestBody  List<Long> auctionIds);

    @PutMapping("/api/v1/auctions/update/{auctionId}")
    ResponseEntity<?> updateAuctionPrice(@PathVariable Long auctionId, @RequestBody UpdatePrice currentprice);


}
