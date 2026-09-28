package project.auctionplatform.DTO;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@Builder
@AllArgsConstructor
public class WinnerInfo {
    String name;
    Long auctionId;
    Long bidderId;
    BigDecimal price;
    String email;
}
