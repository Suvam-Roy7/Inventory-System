package com.inventory.OrderService.Utilities;

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import jakarta.annotation.PostConstruct;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;


import java.nio.charset.StandardCharsets;
import java.security.Key;
import java.util.Date;


import org.slf4j.Logger;
import org.slf4j.LoggerFactory;


@Component
public class JWTUtility {

    @Value("${jwt.secret}")
    private String jwtSecret;

    @Value("${jwt.expiration}")
    private long jwtExpiration; // in milliseconds

    private Key key;
    
    private static final Logger log = LoggerFactory.getLogger(JWTUtility.class);
    
    @PostConstruct
    public void init() {
        key = Keys.hmacShaKeyFor(jwtSecret.getBytes(StandardCharsets.UTF_8));
    }

    // ✅ Validate JWT Token
    public boolean validateJwtToken(String token) {
        try {
            Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(token);
            return true;
        } 
        catch (ExpiredJwtException e) {
            log.warn("JWT expired at {}", e.getClaims().getExpiration());
          } catch (io.jsonwebtoken.security.SignatureException e) {
            log.error("Invalid JWT signature (secret mismatch?)", e);
          } catch (MalformedJwtException e) {
            log.error("Malformed JWT", e);
          } catch (UnsupportedJwtException e) {
            log.error("Unsupported JWT", e);
          } catch (IllegalArgumentException e) {
            log.error("Empty or null JWT", e);
          }
        return false;
    }

    // ✅ Extract Claims
    public Claims getClaims(String token) {
        return Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(token).getBody();
    }
}