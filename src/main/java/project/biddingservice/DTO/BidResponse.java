package project.biddingservice.DTO;

import lombok.Builder;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
@Builder
public class BidResponse {

    private Long id;



    private Long auctionId;

    private String bidderName;

    private BigDecimal bidAmount;

    private BigDecimal currentBidAmount;

    private LocalDateTime bidTime;

}