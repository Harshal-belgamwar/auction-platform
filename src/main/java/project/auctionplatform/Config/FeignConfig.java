package project.auctionplatform.Config;

import feign.RequestInterceptor;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

@Configuration
public class FeignConfig {

    @Bean
    public RequestInterceptor requestInterceptor() {

        return requestTemplate -> {

            ServletRequestAttributes attributes =
                    (ServletRequestAttributes) RequestContextHolder.getRequestAttributes();

            if (attributes == null) {
                return;
            }

            HttpServletRequest request = attributes.getRequest();

            Cookie[] cookies = request.getCookies();

            if (cookies == null) {
                return;
            }

            for (Cookie cookie : cookies) {

                if ("accessToken".equals(cookie.getName())) {

                    requestTemplate.header(
                            "Cookie",
                            "accessToken=" + cookie.getValue()
                    );

                    break;
                }
            }
        };
    }
}