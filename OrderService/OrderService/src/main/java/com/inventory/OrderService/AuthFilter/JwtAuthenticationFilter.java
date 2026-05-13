package com.inventory.OrderService.AuthFilter;



import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.util.List;
import java.util.stream.Collectors;

import javax.crypto.SecretKey;
import jakarta.annotation.PostConstruct;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.HttpHeaders;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;
import org.springframework.web.filter.OncePerRequestFilter;

import com.inventory.OrderService.Utilities.JWTUtility;

import org.springframework.security.core.Authentication;


import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;

@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {
    @Autowired
    private JWTUtility jwtUtility;
    

	@Override
	protected boolean shouldNotFilter(HttpServletRequest request) {
	    String path = request.getRequestURI();
	    return path.startsWith("/v3/api-docs") ||
	           path.startsWith("/swagger-ui") ||
	           path.equals("/swagger-ui.html") ||
	           path.startsWith("/userservice/users/client")||
	           path.startsWith("/orderservice/orders/updatequantity");
	}


	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
	        throws ServletException, IOException {

	    String authHeader = request.getHeader(HttpHeaders.AUTHORIZATION);
	    if (authHeader != null && authHeader.startsWith("Bearer ")) {
	        String token = authHeader.substring(7);

	        if (jwtUtility.validateJwtToken(token)) {
	            Claims claims = jwtUtility.getClaims(token);
	            String username = claims.getSubject();
	            List<String> roles = claims.get("roles", List.class);

	            List<GrantedAuthority> authorities = roles.stream()
                        .map(r -> r.startsWith("ROLE_") ? r : "ROLE_" + r)
                        .map(SimpleGrantedAuthority::new)
                        .collect(Collectors.toList());

	            Authentication authentication = new UsernamePasswordAuthenticationToken(username, token, authorities);
	            SecurityContextHolder.getContext().setAuthentication(authentication);
	        }
	    }

	    filterChain.doFilter(request, response);
	}

}