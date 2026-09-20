package project.biddingservice.Service;



import lombok.RequiredArgsConstructor;
import org.redisson.api.RLock;
import org.redisson.api.RedissonClient;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import project.biddingservice.Client.AuctionClient;
import project.biddingservice.DTO.AuctionResponse;
import project.biddingservice.DTO.BidRequest;
import project.biddingservice.DTO.BidResponse;
import project.biddingservice.DTO.UpdatePrice;
import project.biddingservice.Entity.Bid;

import project.biddingservice.Repository.BidRepository;

import java.math.BigDecimal;

import java.util.List;
import java.util.concurrent.TimeUnit;

@Service
@RequiredArgsConstructor
public class BiddingService {

    private final BidRepository bidRepository;
    private final AuctionClient auctionClient;
    private final CurrentUserService currentUserService;
    private final RedisService redisService;
    private  final RedissonClient redissonClient;

    // ==============================
    // PLACE BID
    // ==============================

    @Transactional
    public BidResponse placeBid(BidRequest request) {

        Long bidderId = currentUserService.getUserId();

        String lockKey =
                "auction:bid:" + request.getAuctionId();

        RLock lock =
                redissonClient.getLock(lockKey);

        boolean acquired = false;

        try {

            acquired = lock.tryLock(
                    5,
                    8,
                    TimeUnit.SECONDS
            );

            if (!acquired) {
                throw new RuntimeException(
                        "Unable to process bid. Please try again."
                );
            }

            // Critical section starts here

            BigDecimal currentAmount =
                    redisService.getCurrentBid(
                            request.getAuctionId()
                    );




            if (currentAmount == null) {
                throw new RuntimeException(
                        "Current bid not found"
                );
            }

            if (request.getAmount()
                    .compareTo(currentAmount) <= 0) {

                throw new RuntimeException(
                        "Bid amount must be greater than current amount"
                );
            }

            // Update Redis

            redisService.setCurrentBid(
                    request.getAuctionId(),
                    request.getAmount()
            );

//            add kafka event

            // Save bid

            Bid bid = new Bid();

            bid.setBidderId(bidderId);
            bid.setAmount(request.getAmount());
            bid.setAuctionId(request.getAuctionId());

            Bid savedBid =
                    bidRepository.save(bid);

            auctionClient.updateAuctionPrice(bid.getAuctionId(), UpdatePrice.builder().amount(bid.getAmount()).build());


            return convertToResponse(savedBid);

        } catch (InterruptedException e) {

            Thread.currentThread().interrupt();

            throw new RuntimeException(
                    "Bid processing interrupted",
                    e
            );

        } finally {

            if (acquired &&
                    lock.isHeldByCurrentThread()) {

                lock.unlock();
            }
        }
    }

    public BigDecimal getCurrentBid(Long auctionId) {
        return redisService.getCurrentBid(auctionId);
    }


    // ==============================
    // GET ALL BIDS FOR AUCTION
    // ==============================

    public List<BidResponse> getAuctionBids(
            Long auctionId
    ) {

        return bidRepository
                .findByAuctionIdOrderByCreatedAtDesc(
                        auctionId
                )
                .stream()
                .map(this::convertToResponse)
                .toList();
    }





//    GET PARTICIPATED AUCTIONS
    public List<AuctionResponse>  getMyBids(
    ) {

        Long bidderId = currentUserService.getUserId();
        List<Long> auctionIds = bidRepository.findParticipatedAuction(bidderId);

        return auctionClient.getMyParticipatedAuctions(auctionIds);

    }





    // ==============================
    // CONVERT ENTITY → RESPONSE
    // ==============================

    private BidResponse convertToResponse(
            Bid bid
    ) {

        String name = currentUserService.getUserName();

        return BidResponse.builder()
                .bidAmount(bid.getAmount())
                .auctionId(bid.getAuctionId())
                .bidTime(bid.getCreatedAt())
                .bidderName(name)
                .build();

    }
}