package project.notificationservice.DTO;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AuctionEndedEvent {

    private Long auctionId;

    private String productTitle;

    private Long sellerId;
    private String sellerName;
    private String sellerEmail;

    private BigDecimal startingPrice;
    private LocalDateTime startTime;
    private LocalDateTime endTime;

    private Long winnerId;
    private String winnerName;
    private String winnerEmail;
    private BigDecimal winningBidAmount;
}