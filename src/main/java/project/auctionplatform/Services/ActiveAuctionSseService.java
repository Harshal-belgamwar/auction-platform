package project.auctionplatform.Services;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.util.List;
import java.util.concurrent.CopyOnWriteArrayList;

@Service
@RequiredArgsConstructor
public class ActiveAuctionSseService {

    private final List<SseEmitter> activeAuctionEmitters =
            new CopyOnWriteArrayList<>();

    public SseEmitter subscribe() {

        SseEmitter emitter = new SseEmitter(0L);

        activeAuctionEmitters.add(emitter);

        emitter.onCompletion(
                () -> activeAuctionEmitters.remove(emitter)
        );

        emitter.onTimeout(
                () -> activeAuctionEmitters.remove(emitter)
        );

        emitter.onError(
                error -> activeAuctionEmitters.remove(emitter)
        );

        return emitter;
    }

    public void sendAuctionEnded() {

        for (SseEmitter emitter : activeAuctionEmitters) {

            try {

                emitter.send(
                        SseEmitter.event()
                                .name("auction-ended")
                                .data(
                                        "data changed!"
                                )
                );

            } catch (Exception e) {

                activeAuctionEmitters.remove(emitter);
            }
        }
    }

}