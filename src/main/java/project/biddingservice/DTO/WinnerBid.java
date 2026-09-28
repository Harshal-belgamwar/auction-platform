package project.biddingservice.DTO;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
@Builder
@AllArgsConstructor
public class WinnerBid {
    String name;
    Long auctionId;
    Long bidderId;
    BigDecimal price;
    String email;
}
