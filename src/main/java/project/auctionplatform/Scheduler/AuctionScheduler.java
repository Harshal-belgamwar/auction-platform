package project.auctionplatform.Scheduler;

import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;
import project.auctionplatform.Enum.AuctionStatus;
import project.auctionplatform.Model.Auction;
import project.auctionplatform.Repositories.AuctionRepository;

import project.auctionplatform.Services.ActiveAuctionSseService;
import project.auctionplatform.Services.AuctionSseService;
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
        }

        if(!auctionsToEnd.isEmpty()){
            activeAuctionSseService.sendAuctionEnded();
        }
    }
}