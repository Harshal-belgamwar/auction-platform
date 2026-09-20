package project.productservice.Repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import project.productservice.Model.ProductImages;

import java.util.List;

@Repository
public interface ProductImagesRepository extends CrudRepository<ProductImages, Long> {
    List<ProductImages> findByProductId(Long productId);
}
