package project.notificationservice.Service;

import project.notificationservice.DTO.AuctionEndedEvent;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    private final JavaMailSender mailSender;

    public EmailService(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }

    public void sendSellerEmail(AuctionEndedEvent event) {

        SimpleMailMessage message = new SimpleMailMessage();

        message.setTo(event.getSellerEmail());
        message.setSubject("Auction Ended - " + event.getProductTitle());

        String winnerDetails;

        if (event.getWinnerId() == null || event.getWinnerEmail() == null) {

            winnerDetails = """
                    Auction Status: UNSOLD

                    No winner was found for this auction.
                    """;

        } else {

            winnerDetails = """
                    Auction Status: SOLD

                    Winner Name: %s
                    Winner Email: %s
                    Winning Bid: ₹%s
                    """.formatted(
                    event.getWinnerName(),
                    event.getWinnerEmail(),
                    event.getWinningBidAmount()
            );
        }

        String body = """
                Hello %s,

                Your auction has ended.

                ----- Product Details -----

                Product: %s
                Auction ID: %d
                Starting Price: ₹%s
                Start Time: %s
                End Time: %s

                ----- Auction Result -----

                %s

                Thank you for using Auction Platform.

                Regards,
                Auction Platform
                """.formatted(
                event.getSellerName(),
                event.getProductTitle(),
                event.getAuctionId(),
                event.getStartingPrice(),
                event.getStartTime(),
                event.getEndTime(),
                winnerDetails
        );

        message.setText(body);

        mailSender.send(message);
    }


    public void sendWinnerEmail(AuctionEndedEvent event) {

        if (event.getWinnerEmail() == null) {
            return;
        }

        SimpleMailMessage message = new SimpleMailMessage();

        message.setTo(event.getWinnerEmail());
        message.setSubject("Congratulations! You Won the Auction");

        String body = """
                Hello %s,

                Congratulations! 🎉

                You are the winner of the auction.

                ----- Auction Details -----

                Product: %s
                Auction ID: %d
                Starting Price: ₹%s
                Your Winning Bid: ₹%s
                Auction Start Time: %s
                Auction End Time: %s

                You have successfully won this auction.

                Thank you for participating in Auction Platform.

                Regards,
                Auction Platform
                """.formatted(
                event.getWinnerName(),
                event.getProductTitle(),
                event.getAuctionId(),
                event.getStartingPrice(),
                event.getWinningBidAmount(),
                event.getStartTime(),
                event.getEndTime()
        );

        message.setText(body);

        mailSender.send(message);
    }
}