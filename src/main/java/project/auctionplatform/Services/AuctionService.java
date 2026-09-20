package project.auctionplatform.Services;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;


import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import project.auctionplatform.Client.ProductClient;
import project.auctionplatform.DTO.*;
import project.auctionplatform.DTO.AuctionRequest;
import project.auctionplatform.Enum.AuctionStatus;
import project.auctionplatform.Exception.AuctionNotFoundException;
import project.auctionplatform.Exception.InvalidAuctionException;
import project.auctionplatform.Model.Auction;
import project.auctionplatform.Enum.AuctionStatus;
//import project.auctionplatform.exception.AuctionNotFoundException;
import project.auctionplatform.Repositories.AuctionRepository;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional
public class AuctionService {

    private final AuctionRepository auctionRepository;
    private final CurrentUserService currentUserService;
    private final ProductClient productClient;


    public AuctionResponse createAuction(AuctionRequest request) {

        Long sellerId = currentUserService.getUserId();
        LocalDateTime now = LocalDateTime.now();

        if (!request.getEndTime().isAfter(request.getStartTime())) {
            throw new InvalidAuctionException(
                    "End time must be after start time"
            );
        }

        if (request.getStartTime().isBefore(now)) {
            throw new InvalidAuctionException(
                    "Start time cannot be before current time"
            );
        }

        AuctionStatus status;

        if (request.getStartTime().isAfter(now)) {
            status = AuctionStatus.UPCOMING;
        } else {
            status = AuctionStatus.ACTIVE;
        }

        Auction auction = Auction.builder()
                .productId(request.getProductId())
                .sellerId(sellerId)
                .startingPrice(request.getStartingPrice())
                .currentPrice(request.getStartingPrice())
                .startTime(request.getStartTime())
                .endTime(request.getEndTime())
                .status(status)
                .createdAt(now)
                .updatedAt(now)
                .build();

        Auction savedAuction = auctionRepository.save(auction);

        return mapToResponse(savedAuction);
    }


    //    view auction
    public AuctionResponse getAuction(Long auctionId) {
        Auction auction = auctionRepository.findById(auctionId).orElseThrow(() -> new AuctionNotFoundException("Auction not found with id: " + auctionId));
        return mapToResponse(auction);
    }

//    get all participated auction
    public List<AuctionResponse> getAllAuctions(List<Long> auctionIds) {

        List<Auction> auctions = auctionRepository.findAllByIdIn(auctionIds);

        return auctions.stream()
                .map(this::mapToResponse)
                .toList();

    }

    public ResponseEntity<?>  UpdateAuctionCurrentPrice(Long auctionId, UpdatePrice req) {
        int x = auctionRepository.updateAuctionCurentPrice(auctionId,req.getAmount());
        return x>0?ResponseEntity.ok().build():ResponseEntity.notFound().build();
    }


    //  get all active auction
    public List<AuctionResponse> getAllActiveAuctions() {

        List<Auction> activeAuction = auctionRepository.findByStatus(AuctionStatus.ACTIVE);
        return activeAuction
                .stream()
                .map(this::mapToResponse)
                .toList();
    }


    //    get all user Auction
    public List<AuctionResponse> getSellerAuctions() {
        Long sellerId = currentUserService.getUserId();

        return auctionRepository.findBySellerId(sellerId)
                .stream()
                .map(this::mapToResponse)
                .toList();
    }


    public void cancelAuction(Long auctionId) {
        Long sellerId = currentUserService.getUserId();
        Auction auction = auctionRepository.findById(auctionId).orElseThrow(() -> new AuctionNotFoundException("Auction not found with id: " + auctionId));

        if (auction.getStatus() == AuctionStatus.ENDED) {
            throw new InvalidAuctionException("Ended auction cannot be cancelled");
        }
        if (auction.getStatus() == AuctionStatus.CANCELLED) {
            throw new InvalidAuctionException("Auction is already cancelled");
        }
        if (auction.getStatus() == AuctionStatus.ACTIVE) {
            throw new InvalidAuctionException("Active auction cannot be cancelled");
        }

        auction.setStatus(AuctionStatus.CANCELLED);
        auction.setUpdatedAt(LocalDateTime.now());
        auctionRepository.save(auction);
    }


    private AuctionResponse mapToResponse(Auction auction) {

        ProductResponse product = productClient.getProductById(auction.getProductId());

        return AuctionResponse.builder()
                .id(auction.getId())
                .product(product)
                .sellerId(auction.getSellerId())
                .startingPrice(auction.getStartingPrice())
                .currentPrice(auction.getCurrentPrice())
                .startTime(auction.getStartTime())
                .endTime(auction.getEndTime())
                .status(auction.getStatus())
                .winnerId(auction.getWinnerId())
                .createdAt(auction.getCreatedAt())
                .updatedAt(auction.getUpdatedAt())
                .build();
    }

    public AuctionResponse updateAuction(
            AuctionUpdateRequest request,
            Long auctionId) {

//        Long sellerId = currentUserService.getUserId();

        Auction auction = auctionRepository.findById(auctionId)
                .orElseThrow(() ->
                        new AuctionNotFoundException(
                                "Auction not found with id: " + auctionId
                        )
                );



        if (auction.getStatus() != AuctionStatus.UPCOMING) {
            throw new InvalidAuctionException(
                    "Only upcoming auctions can be updated"
            );
        }

        LocalDateTime now = LocalDateTime.now();

        if (request.getStartTime().isBefore(now)) {
            throw new InvalidAuctionException(
                    "Start time cannot be before current time"
            );
        }

        if (!request.getEndTime().isAfter(request.getStartTime())) {
            throw new InvalidAuctionException(
                    "End time must be after start time"
            );
        }

        auction.setStartingPrice(request.getStartingPrice());
        auction.setStartTime(request.getStartTime());
        auction.setEndTime(request.getEndTime());
        auction.setUpdatedAt(now);
        auction.setCurrentPrice(request.getStartingPrice());

        Auction updatedAuction = auctionRepository.save(auction);

        return mapToResponse(updatedAuction);
    }

    public void deleteAuction(Long auctionId) {

        Long sellerId = currentUserService.getUserId();

        Auction auction = auctionRepository.findById(auctionId)
                .orElseThrow(() ->
                        new AuctionNotFoundException(
                                "Auction not found with id: " + auctionId
                        )
                );


        if (auction.getStatus() == AuctionStatus.ACTIVE) {
            throw new InvalidAuctionException(
                    "Active auction cannot be deleted"
            );
        }

        if (auction.getStatus() == AuctionStatus.ENDED) {
            throw new InvalidAuctionException(
                    "Ended auction cannot be deleted"
            );
        }

        if (auction.getStatus() == AuctionStatus.CANCELLED) {
            throw new InvalidAuctionException(
                    "Cancelled auction cannot be deleted"
            );
        }

        auctionRepository.delete(auction);
    }
}