package o2.o2web;

import o2.o2web.interceptor.LoginCheckInterceptor;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        registry.addInterceptor(new LoginCheckInterceptor())
                .order(1)
                .addPathPatterns("/**")
                .excludePathPatterns("/login", "/css/**", "/font/**", "/images/**", "/js/**", "/lib/**",
                                     "/popup/**", "/js-loader.js", "/js-package.js", "/favicon.ico","/error");
    }
}
