package project.productservice.DTO;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import project.productservice.Enum.ProductCondition;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ProductRequest {

    @NotBlank(message = "Product name is required")
    @Size(min = 2, max = 200,
            message = "Product name must be between 2 and 200 characters")
    private String name;

    @NotBlank(message = "Product description is required")
    @Size(max = 2000,
            message = "Product description cannot exceed 2000 characters")
    private String description;

    @NotNull(message = "Category is required")
    private Long categoryId;

//    @NotNull(message = "Product condition is required")
//    private ProductCondition condition;
    @NotNull(message = "Images is required")
    List<MultipartFile> images;

}