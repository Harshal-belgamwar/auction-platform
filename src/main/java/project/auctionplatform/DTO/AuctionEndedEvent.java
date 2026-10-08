package project.auctionplatform.DTO;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AuctionEndedEvent {

    private Long auctionId;

    // Product details
    private Long productId;
    private String productTitle;

    // Auction detail
    private Long sellerId;
    private String sellerName;
    private String sellerEmail;

    private BigDecimal startingPrice;
    private LocalDateTime startTime;
    private LocalDateTime endTime;

    // Winner details
    private Long winnerId;
    private String winnerName;
    private String winnerEmail;

    // Winning bid
    private BigDecimal winningBidAmount;
}