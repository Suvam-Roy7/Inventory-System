package com.inventory.UserService.UserAuthFilter;

import java.io.IOException;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.http.HttpHeaders;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import com.inventory.UserService.Utilities.JWTUtility;

import io.jsonwebtoken.Claims;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final JWTUtility jwtUtility;

    public JwtAuthenticationFilter(JWTUtility jwtUtility) {
        this.jwtUtility = jwtUtility;
    }

    @Override
    protected boolean shouldNotFilter(HttpServletRequest request) {

        String path = request.getRequestURI();

        System.out.println("🟡 [UserService] shouldNotFilter PATH = " + path);

        boolean skip =
                path.startsWith("/v3/api-docs") ||
                path.startsWith("/swagger-ui") ||
                path.equals("/swagger-ui.html") ||
                path.startsWith("/userservice/users/createnewuser") ||
                path.startsWith("/userservice/users/getRoles") ||
                path.startsWith("/userservice/users/client");

        System.out.println("🟡 [UserService] shouldNotFilter RESULT = " + skip);

        return skip;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain)
            throws ServletException, IOException {

        String path = request.getRequestURI();
        String method = request.getMethod();
        String authHeader = request.getHeader(HttpHeaders.AUTHORIZATION);

        // 🔥 DEBUG: Incoming request details
        System.out.println("==================================================");
        System.out.println("🔵 [UserService] REQUEST RECEIVED");
        System.out.println("➡ Method  : " + method);
        System.out.println("➡ Path    : " + path);
        System.out.println("➡ AuthHdr : " + authHeader);
        System.out.println("➡ RemoteIP: " + request.getRemoteAddr());
        System.out.println("==================================================");

        if (authHeader != null && authHeader.startsWith("Bearer ")) {

            String token = authHeader.substring(7);

            System.out.println("🟢 [UserService] Token received (first 20 chars): "
                    + token.substring(0, Math.min(token.length(), 20)) + "...");

            if (jwtUtility.validateJwtToken(token)) {

                Claims claims = jwtUtility.getClaims(token);

                System.out.println("🟢 [UserService] JWT VALID");
                System.out.println("➡ Subject (user): " + claims.getSubject());
                System.out.println("➡ Roles        : " + claims.get("roles"));

                List<String> roles = claims.get("roles", List.class);

                List<GrantedAuthority> authorities = roles.stream()
                        .map(r -> r.startsWith("ROLE_") ? r : "ROLE_" + r)
                        .map(SimpleGrantedAuthority::new)
                        .collect(Collectors.toList());

                Authentication authentication =
                        new UsernamePasswordAuthenticationToken(
                                claims.getSubject(),
                                token,
                                authorities
                        );

                SecurityContextHolder.getContext().setAuthentication(authentication);

                System.out.println("🟢 [UserService] SecurityContext SET");
            } else {
                System.out.println("🔴 [UserService] INVALID JWT TOKEN");
            }

        } else {
            System.out.println("🟠 [UserService] NO AUTH HEADER FOUND");
        }

        filterChain.doFilter(request, response);
    }
}