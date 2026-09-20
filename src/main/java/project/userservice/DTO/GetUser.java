package project.userservice.DTO;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class GetUser {
    String name;
    String email;
}
