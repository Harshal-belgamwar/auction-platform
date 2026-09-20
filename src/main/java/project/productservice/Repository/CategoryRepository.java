package project.productservice.Repository;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import org.springframework.data.jpa.repository.JpaRepository;
import project.productservice.Model.Category;

public interface CategoryRepository extends JpaRepository<Category,Long> {

    boolean existsByName(String name);
}
