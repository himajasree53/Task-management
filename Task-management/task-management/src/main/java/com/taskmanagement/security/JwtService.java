package com.taskmanagement.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.JwtException;
import org.springframework.stereotype.Service;

import java.nio.charset.StandardCharsets;
import java.util.Date;

@Service
public class JwtService {

    private static final String SECRET_KEY =
            "TaskManagementSecretKey123456789012345678901234567890";

    // 24 Hours
    private static final long EXPIRATION =
            1000 * 60 * 60 * 24;

    /**
     * Generate JWT Token
     */
    public String generateToken(String email, String role) {

        if (role != null && !role.startsWith("ROLE_")) {
            role = "ROLE_" + role;
        }

        return Jwts.builder()
                .setSubject(email)
                .claim("role", role)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION))
                .signWith(
                        SignatureAlgorithm.HS256,
                        SECRET_KEY.getBytes(StandardCharsets.UTF_8)
                )
                .compact();
    }

    /**
     * Extract all claims
     */
    public Claims extractClaims(String token) {

        return Jwts.parser()
                .setSigningKey(SECRET_KEY.getBytes(StandardCharsets.UTF_8))
                .parseClaimsJws(token)
                .getBody();
    }

    /**
     * Extract email
     */
    public String extractUsername(String token) {
        return extractClaims(token).getSubject();
    }

    /**
     * Extract role
     */
    public String extractRole(String token) {
        return extractClaims(token).get("role", String.class);
    }

    /**
     * Validate token
     */
    public boolean isTokenValid(String token) {

        try {
            extractClaims(token);
            return true;
        } catch (JwtException | IllegalArgumentException e) {
            return false;
        }

    }

}