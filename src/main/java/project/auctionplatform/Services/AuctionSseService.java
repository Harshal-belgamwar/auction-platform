package project.auctionplatform.Services;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.CopyOnWriteArrayList;

@Service
@RequiredArgsConstructor
public class AuctionSseService {

    private final CurrentUserService currentUserService;


    private final Map<Long, List<SseEmitter>> sellerEmitters =
            new ConcurrentHashMap<>();



    public SseEmitter subscribe() {

        Long sellerId = currentUserService.getUserId();

        SseEmitter emitter = new SseEmitter(0L);

        sellerEmitters
                .computeIfAbsent(
                        sellerId,
                        key -> new CopyOnWriteArrayList<>()
                )
                .add(emitter);

        emitter.onCompletion(
                () -> removeEmitter(sellerId, emitter)
        );

        emitter.onTimeout(
                () -> removeEmitter(sellerId, emitter)
        );

        emitter.onError(
                error -> removeEmitter(sellerId, emitter)
        );

        return emitter;
    }

    public void sendStatusUpdate(
            Long sellerId,
            Long auctionId,
            String status
    ) {

        List<SseEmitter> emitters =
                sellerEmitters.get(sellerId);

        if (emitters == null) {
            return;
        }



        for (SseEmitter emitter : emitters) {

            try {

                emitter.send(
                        SseEmitter.event()
                                .name("auction-status")
                                .data(
                                        new AuctionStatusEvent(
                                                auctionId,
                                                status
                                        )
                                )
                );

            } catch (Exception e) {

                removeEmitter(sellerId, emitter);
            }
        }
    }

    private void removeEmitter(
            Long sellerId,
            SseEmitter emitter
    ) {

        List<SseEmitter> emitters =
                sellerEmitters.get(sellerId);

        if (emitters != null) {

            emitters.remove(emitter);

            if (emitters.isEmpty()) {
                sellerEmitters.remove(sellerId);
            }
        }
    }

    public record AuctionStatusEvent(
            Long auctionId,
            String status
    ) {
    }
}