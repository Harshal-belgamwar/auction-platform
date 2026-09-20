package project.productservice.Model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Data
@Getter
@Setter
public class ProductImages {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "product_id", nullable = false)
    private Product product;


    private String imageUrl;


}
