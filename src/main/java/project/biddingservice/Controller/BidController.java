package project.biddingservice.Controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import project.biddingservice.DTO.AuctionResponse;
import project.biddingservice.DTO.BidRequest;
import project.biddingservice.DTO.BidResponse;
import project.biddingservice.Service.BiddingService;

import java.math.BigDecimal;
import java.util.List;

@RestController
@RequestMapping("/api/v1/bidding")
@RequiredArgsConstructor
public class BidController {

    private final BiddingService biddingService;

    // ==============================
    // PLACE BID
    // ==============================

    @PostMapping
    public ResponseEntity<BidResponse> placeBid(
            @RequestBody BidRequest request
    ) {

        BidResponse response =
                biddingService.placeBid(request);

        return ResponseEntity.ok(response);
    }


    // ==============================
    // GET CURRENT BID
    // ==============================

    @GetMapping("/{auctionId}/current")
    public ResponseEntity<BigDecimal> getCurrentBid(
            @PathVariable Long auctionId
    ) {

        BigDecimal currentBid =
                biddingService.getCurrentBid(auctionId);

        return ResponseEntity.ok(currentBid);
    }


    // ==============================
    // GET ALL BIDS FOR AUCTION
    // ==============================

    @GetMapping("/{auctionId}/bids")
    public ResponseEntity<List<BidResponse>> getAuctionBids(
            @PathVariable Long auctionId
    ) {

        List<BidResponse> bids =
                biddingService.getAuctionBids(auctionId);

        return ResponseEntity.ok(bids);
    }


    // ==============================
    // GET MY PARTICIPATED AUCTIONS
    // ==============================

    @GetMapping("/my-bids")
    public ResponseEntity<List<AuctionResponse>> getMyBids() {

        List<AuctionResponse> auctions =
                biddingService.getMyBids();

        return ResponseEntity.ok(auctions);
    }
}
