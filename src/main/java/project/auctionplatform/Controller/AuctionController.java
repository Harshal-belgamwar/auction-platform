package project.auctionplatform.Controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.parameters.P;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;
import project.auctionplatform.DTO.AuctionRequest;
import project.auctionplatform.DTO.AuctionResponse;

import project.auctionplatform.DTO.AuctionUpdateRequest;
import project.auctionplatform.DTO.UpdatePrice;
import project.auctionplatform.Repositories.AuctionRepository;
import project.auctionplatform.Services.ActiveAuctionSseService;
import project.auctionplatform.Services.AuctionService;
import project.auctionplatform.Services.AuctionSseService;


import java.math.BigDecimal;
import java.util.List;

@RestController
@RequestMapping("/api/v1/auctions")
@RequiredArgsConstructor
public class AuctionController {

    private final AuctionService auctionService;
    private final AuctionSseService  auctionSseService;
    private final ActiveAuctionSseService  activeAuctionSseService;


    @PostMapping
    public ResponseEntity<AuctionResponse> createAuction(
            @Valid @RequestBody AuctionRequest request) {



        AuctionResponse response =
                auctionService.createAuction(
                        request
                );

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(response);
    }

    @GetMapping("/{auctionId}")
    public ResponseEntity<AuctionResponse> getAuction(
            @PathVariable Long auctionId) throws Throwable {

        return ResponseEntity.ok(
                auctionService.getAuction(auctionId)
        );
    }

    @PostMapping("/mybids")
    public List<AuctionResponse> getMyParticipatedAuctions(@RequestBody List<Long> auctionIds) {
        return auctionService.getAllAuctions(auctionIds);
    }


    @GetMapping
    public ResponseEntity<List<AuctionResponse>> getAllAuctions() {

        return ResponseEntity.ok(
                auctionService.getAllActiveAuctions()
        );
    }

    @PutMapping("/update/{auctionId}")
    public ResponseEntity<?> updateAuctionPrice(@PathVariable Long auctionId, @RequestBody UpdatePrice currentprice){
        return auctionService.UpdateAuctionCurrentPrice(auctionId, currentprice);
    }

    @GetMapping("/my")
    public ResponseEntity<List<AuctionResponse>> getSellerAuctions() {

        return ResponseEntity.ok(
                auctionService.getSellerAuctions()
        );
    }

    @PutMapping("/cancel/{auctionId}")
    public ResponseEntity<Void> cancelAuction(
            @PathVariable Long auctionId) {



        auctionService.cancelAuction(
                auctionId
        );

        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/{auctionId}")
    public ResponseEntity<Void> deleteAuction(@PathVariable Long auctionId) {
        auctionService.deleteAuction(auctionId);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/{auctionId}")
    public ResponseEntity<AuctionResponse> updateAuction(
            @PathVariable Long auctionId,
            @Valid @RequestBody AuctionUpdateRequest request) {

        AuctionResponse response =
                auctionService.updateAuction(request, auctionId);

        return ResponseEntity.ok(response);
    }

    @GetMapping(
            value = "/seller/events",
            produces = MediaType.TEXT_EVENT_STREAM_VALUE
    )
    public SseEmitter sellerAuctionEvents() {

        return auctionSseService.subscribe();
    }

    @GetMapping(
            value = "/active/events",
            produces = MediaType.TEXT_EVENT_STREAM_VALUE
    )
    public SseEmitter activeAuctionEvents() {

        return activeAuctionSseService.subscribe();
    }


}