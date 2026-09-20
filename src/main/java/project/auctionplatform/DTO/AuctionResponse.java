package project.auctionplatform.DTO;


import lombok.Builder;
import lombok.Getter;
import project.auctionplatform.Enum.AuctionStatus;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.Map;

@Getter
@Builder
public class AuctionResponse {

    private Long id;

    private ProductResponse product;

    private Long sellerId;

    private BigDecimal startingPrice;

    private BigDecimal currentPrice;

    private LocalDateTime startTime;

    private LocalDateTime endTime;

    private AuctionStatus status;

    private Long winnerId;

    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;
}