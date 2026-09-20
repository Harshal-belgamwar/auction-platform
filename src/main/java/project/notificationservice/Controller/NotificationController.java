package project.notificationservice.Controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;
import project.notificationservice.Model.Notification;
import project.notificationservice.Service.NotificationService;

import java.util.List;

@RestController("/api/v1/notification")
public class NotificationController {

    private NotificationService notificationService;

    NotificationController(NotificationService notificationService){
        this.notificationService = notificationService;
    }

    @GetMapping("/{id}")
    public List<Notification> findById(@PathVariable Long id){
        return notificationService.findById(id);
    }
}
