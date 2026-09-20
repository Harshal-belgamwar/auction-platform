package project.productservice.Config;

import jakarta.servlet.http.Cookie;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;

import org.springframework.security.oauth2.jose.jws.MacAlgorithm;
import org.springframework.security.oauth2.jwt.JwtDecoder;
import org.springframework.security.oauth2.jwt.NimbusJwtDecoder;
import org.springframework.security.oauth2.server.resource.web.BearerTokenResolver;

import org.springframework.security.web.SecurityFilterChain;

import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import javax.crypto.spec.SecretKeySpec;
import java.nio.charset.StandardCharsets;
import java.util.List;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Value("${jwt.secret}")
    private String jwtSecret;


    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http)
            throws Exception {

        http
//                .cors(Customizer.withDefaults())

                .csrf(csrf -> csrf.disable())

                .sessionManagement(session ->
                        session.sessionCreationPolicy(
                                SessionCreationPolicy.STATELESS
                        )
                )

                .authorizeHttpRequests(auth -> auth
                        .requestMatchers("/actuator/health").permitAll()
                        .anyRequest().authenticated()
                )

                .oauth2ResourceServer(oauth2 ->
                        oauth2
                                .bearerTokenResolver(bearerTokenResolver())
                                .jwt(Customizer.withDefaults())
                );

        return http.build();
    }


    // Read JWT from accessToken cookie
    @Bean
    public BearerTokenResolver bearerTokenResolver() {

        return request -> {

            Cookie[] cookies = request.getCookies();

            if (cookies == null) {
                return null;
            }

            for (Cookie cookie : cookies) {

                if ("accessToken".equals(cookie.getName())) {
                    return cookie.getValue();
                }
            }

            return null;
        };
    }


    // JWT Decoder
    @Bean
    public JwtDecoder jwtDecoder() {

        SecretKeySpec secretKey = new SecretKeySpec(
                jwtSecret.getBytes(StandardCharsets.UTF_8),
                "HmacSHA256"
        );

        return NimbusJwtDecoder
                .withSecretKey(secretKey)
                .macAlgorithm(MacAlgorithm.HS256)
                .build();
    }

//
//    // CORS
//    @Bean
//    public CorsConfigurationSource corsConfigurationSource() {
//
//        CorsConfiguration configuration =
//                new CorsConfiguration();
//
//        configuration.setAllowedOrigins(
//                List.of("http://localhost:5173")
//        );
//
//        configuration.setAllowedMethods(
//                List.of(
//                        "GET",
//                        "POST",
//                        "PUT",
//                        "DELETE",
//                        "OPTIONS"
//                )
//        );
//
//        configuration.setAllowedHeaders(
//                List.of("*")
//        );
//
//        configuration.setAllowCredentials(true);
//
//        UrlBasedCorsConfigurationSource source =
//                new UrlBasedCorsConfigurationSource();
//
//        source.registerCorsConfiguration(
//                "/**",
//                configuration
//        );
//
//        return source;
//    }
}