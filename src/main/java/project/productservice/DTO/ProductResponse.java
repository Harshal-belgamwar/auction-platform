package project.productservice.DTO;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import project.productservice.Enum.ProductCondition;
import project.productservice.Enum.ProductStatus;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ProductResponse {

    private Long id;

    private Long sellerId;

    private String name;

    private String description;

    private Long categoryId;

    private String categoryName;

    private ProductStatus status;

    private Map<Long,String> imageUrls;

    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;
}