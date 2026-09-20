package project.notificationservice.Repository;

import org.springframework.data.repository.CrudRepository;
import project.notificationservice.Model.Notification;

import java.util.List;

public interface NotificationRepository extends CrudRepository<Notification, String> {
    List<Notification> findByWinnerId(Long id);
}
