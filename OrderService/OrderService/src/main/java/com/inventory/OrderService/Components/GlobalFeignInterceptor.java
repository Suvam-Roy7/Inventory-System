package com.inventory.OrderService.Components;


import feign.RequestInterceptor;
import feign.RequestTemplate;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.util.StringUtils;
import org.springframework.web.context.request.RequestAttributes;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;



public class GlobalFeignInterceptor implements RequestInterceptor {
	

	private static final String AUTH_HEADER = "Authorization";
    private static final String BEARER_PREFIX = "Bearer ";


	@Override
    public void apply(RequestTemplate template) {
        RequestAttributes attrs = RequestContextHolder.getRequestAttributes();
        if (!(attrs instanceof ServletRequestAttributes servletAttrs)) {
            // Not on a web request thread (async/background) — cannot read inbound header
            return;
        }
        HttpServletRequest request = servletAttrs.getRequest();
        String auth = request.getHeader(AUTH_HEADER);

        if (StringUtils.hasText(auth)
                && auth.regionMatches(true, 0, BEARER_PREFIX, 0, BEARER_PREFIX.length())) {
            // Clear existing to avoid duplicates on retries
            template.header(AUTH_HEADER, (String) null);
            template.header(AUTH_HEADER, auth);
        }
    }


}
