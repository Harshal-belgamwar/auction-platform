package project.auctionplatform.Scheduler;

import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;
import project.auctionplatform.Client.AuthClient;
import project.auctionplatform.Client.BidClient;
import project.auctionplatform.Client.ProductClient;
import project.auctionplatform.DTO.AuctionEndedEvent;
import project.auctionplatform.DTO.GetUser;
import project.auctionplatform.DTO.ProductResponse;
import project.auctionplatform.DTO.WinnerInfo;
import project.auctionplatform.Enum.AuctionStatus;
import project.auctionplatform.Model.Auction;
import project.auctionplatform.Repositories.AuctionRepository;

import project.auctionplatform.Services.ActiveAuctionSseService;
import project.auctionplatform.Services.AuctionSseService;
import project.auctionplatform.Services.KafkaProducerService;
import project.auctionplatform.Services.RedisService;


import java.time.LocalDateTime;
import java.util.List;

@Component
@RequiredArgsConstructor
@Transactional
public class AuctionScheduler {

    private final AuctionRepository auctionRepository;
    private final AuctionSseService auctionSseService;
    private final ActiveAuctionSseService activeAuctionSseService;
    private final RedisService redisService;
    private final ProductClient productClient;
    private final BidClient bidClient;
    private final KafkaProducerService kafkaProducerService;
    private final AuthClient authClient;


    @Scheduled(fixedRate = 60000)
    public void updateAuctionStatuses() {

        LocalDateTime now = LocalDateTime.now();

        List<Auction> auctionsToActivate =
                auctionRepository.findAuctionsToActivate(now);

        for (Auction auction : auctionsToActivate) {

            auction.setStatus(AuctionStatus.ACTIVE);

            auctionSseService.sendStatusUpdate(
                    auction.getSellerId(),
                    auction.getId(),
                    "ACTIVE"
            );
            redisService.setCurrentBid(auction.getId(), auction.getStartingPrice());


        }

        List<Auction> auctionsToEnd =
                auctionRepository.findAuctionsToEnd(now);

        for (Auction auction : auctionsToEnd) {

            auction.setStatus(AuctionStatus.ENDED);



            auctionSseService.sendStatusUpdate(
                    auction.getSellerId(),
                    auction.getId(),
                    "ENDED"
            );
            redisService.deleteCurrentBid(auction.getId());

            int count = bidClient.getCountBids(auction.getId());

            ProductResponse product = productClient.getProductById(auction.getProductId());
            WinnerInfo winner = bidClient.getWinner(auction.getId());
            GetUser seller = authClient.getUser(auction.getSellerId());

//            update product status
            if(count>0){

                productClient.updateProductStatusSold(auction.getProductId());

                if(winner != null){
                    auction.setWinnerId(winner.getBidderId());
                }

            }else{
                productClient.updateProductStatusAvailable(auction.getProductId());
            }


            AuctionEndedEvent auctionEndedEvent = AuctionEndedEvent.builder()
                    .auctionId(auction.getId())
                    .productId(auction.getProductId())
                    .productTitle(product.getName())
                    .winnerId(winner != null ? winner.getBidderId() : null)
                    .winnerName(winner != null ? winner.getName() : null)
                    .winnerEmail(winner != null ? winner.getEmail() : null)
                    .winningBidAmount(winner != null ? winner.getPrice() : null)
                    .startingPrice(auction.getStartingPrice())
                    .startTime(auction.getStartTime())
                    .endTime(auction.getEndTime())
                    .sellerId(auction.getSellerId())
                    .sellerEmail(seller.getEmail())
                    .sellerName(seller.getName())
                    .build();

            kafkaProducerService.publishAuctionEnded(auctionEndedEvent);



            auctionRepository.save(auction);


        }

        if(!auctionsToEnd.isEmpty()){
            activeAuctionSseService.sendAuctionEnded();
        }
    }
}