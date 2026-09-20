package project.api_gateway.Config;

import org.springframework.http.HttpCookie;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.server.resource.authentication.BearerTokenAuthenticationToken;
import org.springframework.security.web.server.authentication.ServerAuthenticationConverter;
import org.springframework.web.server.ServerWebExchange;
import reactor.core.publisher.Mono;

public class CookieAuthenticationConverter
        implements ServerAuthenticationConverter {

    @Override
    public Mono<Authentication> convert(ServerWebExchange exchange) {

        String path = exchange.getRequest()
                .getPath()
                .value();

        if (path.equals("/api/v1/auth/login")
                || path.equals("/api/v1/auth/register")
                || path.equals("/api/v1/auth/logout")) {

            return Mono.empty();
        }

        // Get accessToken cookie
        HttpCookie cookie = exchange.getRequest()
                .getCookies()
                .getFirst("accessToken");

        // No cookie
        if (cookie == null) {
            return Mono.empty();
        }

        // Get JWT
        String token = cookie.getValue();

        // Empty token
        if (token == null || token.isBlank()) {
            return Mono.empty();
        }

        // Convert JWT into BearerTokenAuthenticationToken
        return Mono.just(
                new BearerTokenAuthenticationToken(token)
        );
    }
}