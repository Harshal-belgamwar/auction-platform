package project.notificationservice.Service;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import project.notificationservice.Model.Notification;
import project.notificationservice.Repository.NotificationRepository;

import java.util.List;

@Service
public class NotificationService {

    NotificationRepository notificationRepository;

    @Autowired
    public NotificationService(NotificationRepository notificationRepository) {
        this.notificationRepository = notificationRepository;
    }

    public List<Notification> findById(Long id){
        return notificationRepository.findByWinnerId(id);
    }





}
