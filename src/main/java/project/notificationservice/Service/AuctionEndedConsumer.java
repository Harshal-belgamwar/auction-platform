package project.notificationservice.Service;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;
import project.notificationservice.Config.ModelMapperConfig;
import project.notificationservice.DTO.AuctionEndedEvent;
import project.notificationservice.Model.Notification;
import project.notificationservice.Repository.NotificationRepository;

@Service
public class AuctionEndedConsumer {

    NotificationRepository notificationRepository;
    private final ModelMapper modelMapper;
    private final EmailService emailService;

    @Autowired
    public AuctionEndedConsumer(NotificationRepository notificationRepository, ModelMapper modelMapper,EmailService emailService) {
        this.notificationRepository = notificationRepository;
        this.modelMapper = modelMapper;
        this.emailService = emailService;
    }


    @KafkaListener(
            topics = "auction-ended",
            groupId = "notification-group"
    )
    public void consume(AuctionEndedEvent event) {

        Notification notification = modelMapper.map(event,Notification.class);
        notificationRepository.save(notification);

        // Send email to seller
        emailService.sendSellerEmail(event);

        // Send email to winner
        emailService.sendWinnerEmail(event);

    }
}
