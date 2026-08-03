package com.taskmanagement.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.util.Collections;

@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private static final String SECRET_KEY =
            "TaskManagementSecretKey123456789012345678901234567890";

    /**
     * Skip JWT validation for Login and Register APIs
     */
    @Override
    protected boolean shouldNotFilter(HttpServletRequest request)
            throws ServletException {

        String path = request.getServletPath();

        return path.startsWith("/api/auth/");
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain)
            throws ServletException, IOException {

        System.out.println("======================================");
        System.out.println("JWT FILTER");
        System.out.println("URI : " + request.getRequestURI());

        String authHeader = request.getHeader("Authorization");

        System.out.println("Authorization Header : " + authHeader);

        // No JWT Token
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {

            System.out.println("No JWT Token Found");

            filterChain.doFilter(request, response);
            return;
        }

        try {

            String token = authHeader.substring(7);

            Claims claims = Jwts.parser()
                    .setSigningKey(SECRET_KEY.getBytes(StandardCharsets.UTF_8))
                    .parseClaimsJws(token)
                    .getBody();

            String email = claims.getSubject();
            String role = claims.get("role", String.class);

            System.out.println("Email : " + email);
            System.out.println("Role : " + role);

            if (role != null && !role.startsWith("ROLE_")) {
                role = "ROLE_" + role;
            }

            UsernamePasswordAuthenticationToken authentication =
                    new UsernamePasswordAuthenticationToken(
                            email,
                            null,
                            Collections.singletonList(
                                    new SimpleGrantedAuthority(role)
                            )
                    );

            authentication.setDetails(
                    new WebAuthenticationDetailsSource().buildDetails(request)
            );

            SecurityContextHolder.getContext().setAuthentication(authentication);

            System.out.println("Authentication SUCCESS");
            System.out.println(SecurityContextHolder.getContext().getAuthentication());

        } catch (Exception e) {

            System.out.println("JWT ERROR : " + e.getMessage());

            SecurityContextHolder.clearContext();

            // Continue the request.
            // Spring Security will decide whether authentication is required.
            filterChain.doFilter(request, response);
            return;
        }

        filterChain.doFilter(request, response);
    }
}