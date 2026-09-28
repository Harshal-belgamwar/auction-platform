package project.biddingservice.DTO;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Builder
@Data
@AllArgsConstructor
public class GetUser {
    String name;
    String email;
}
