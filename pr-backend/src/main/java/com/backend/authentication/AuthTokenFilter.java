package com.backend.authentication;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

public class AuthTokenFilter extends OncePerRequestFilter {

    // Inject JwtUtils for handling JWT operations
    @Autowired
    private JwtUtils jwtUtils;

    // Inject custom UserDetailsServiceImpl to load user details by username
    @Autowired
    private UserDetailsServiceImpl userDetailsService;

    // Logger for error tracking
    private static final Logger logger = LoggerFactory.getLogger(AuthTokenFilter.class);

    // Method to intercept requests and validate JWT tokens
    @Override
    protected void doFilterInternal(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse, FilterChain filterChain) throws ServletException, IOException {

        try {
            // Extract the JWT token from the request
            String jwt = parseJwt(httpServletRequest);

            // Validate the JWT token
            if(jwt != null && jwtUtils.validateJwtToken(jwt)) {
                // Extract username from the JWT token
                String username = jwtUtils.getEmailFromJwt(jwt);

                // Load user details by username
                UserDetails userDetails = userDetailsService.loadUserByUsername(username);

                // Create an authentication object with the user details and set it in the security context
                UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(
                        userDetails, null, userDetails.getAuthorities()
                );

                // Attach the authentication details from the HTTP request
                authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(httpServletRequest));

                // Set the authentication in the security context
                SecurityContextHolder.getContext().setAuthentication(authentication);
            }
        } catch (Exception e) {
            // Log any errors that occur during authentication
            logger.error("Cannot set user authentication:{}",e);
        }
        // Proceed with the filter chain
        filterChain.doFilter(httpServletRequest,httpServletResponse);
    }

    // Method to parse the JWT from the Authorization header
    private String parseJwt(HttpServletRequest request) {
        // Get the Authorization header
        String headerAuth = request.getHeader("Authorization");

        // If the header starts with "Bearer ", extract the token
        if (StringUtils.hasText(headerAuth) && headerAuth.startsWith("Bearer ")){
            return headerAuth.substring(7, headerAuth.length());    // Remove "Bearer " and return the token
        }

        // Return null if the token is not found or is invalid
        return null;
    }
}
