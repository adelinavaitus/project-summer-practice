package com.backend.authentication;

import io.jsonwebtoken.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.stereotype.Component;

import javax.servlet.http.HttpServletRequest;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Date;

@Component
public class JwtUtils {

    // Inject JWT secret and expiration time from application properties
    @Value("${app.jwtSecret}")
    private String jwtSecret;

    @Value("${app.jwtExpirationInMs}")
    private int jwtExpirationMs;

    // Logger for error tracking
    private static final Logger logger = LoggerFactory.getLogger(JwtUtils.class);

    // Method to generate a JWT token for an authenticated user
    public String generateJwtToken (Authentication authentication){

        //The getPrincipal() method normally returns UserDetails object in Spring Security, which contains all the details of currently logged in user.
        // Retrieve user details (UserDetails implementation) from the authentication object
        UserDetailImpl userPrincipal = (UserDetailImpl) authentication.getPrincipal();

        //Get authorities (roles) granted to the user.
        Collection<? extends GrantedAuthority> authorities = userPrincipal.getAuthorities();

        // Create a list of authorities for the user
        ArrayList<String> authsList = new ArrayList<>(authorities.size());
        for (GrantedAuthority authority:authorities) {
            authsList.add(authority.getAuthority());  // Add each authority to the list
        }

        // Build and return the JWT token
        return Jwts.builder()
                .setSubject(userPrincipal.getEmail())   // Set email as the subject
                .setAudience(String.valueOf((userPrincipal.getId())))   // Set the user ID as the audience
                .setIssuedAt(new Date())    // Set the token issue date
                .setExpiration(new Date((new Date()).getTime()+jwtExpirationMs))    // Set the token expiration time
                .signWith(SignatureAlgorithm.HS512, jwtSecret.getBytes(StandardCharsets.UTF_8)) // Sign with the secret key
                .compact();     // Build the JWT token
    }

    // Method to extract email from the JWT token
    public String getEmailFromJwt(String token) {
        return Jwts.parser().setSigningKey(jwtSecret.getBytes(StandardCharsets.UTF_8)).parseClaimsJws(token).getBody().getSubject();
    }

    // Method to extract user ID from the JWT token
    public String getIdFromJwt(String token) {
        return Jwts.parser().setSigningKey(jwtSecret.getBytes(StandardCharsets.UTF_8)).parseClaimsJws(token).getBody().getAudience();
    }

    // Method to validate the JWT token
    public boolean validateJwtToken (String authToken){
        try{
            // Parse the JWT token using the secret key
            Jwts.parser().setSigningKey(jwtSecret.getBytes(StandardCharsets.UTF_8)).parseClaimsJws(authToken);
            return true;    // Return true if the token is valid
        } catch(SignatureException e) {
            logger.error("Invalid JWT signature:{}",e.getMessage());
        }catch (MalformedJwtException e) {
            logger.error("Invalid JWT token:{}",e.getMessage());
        }   catch (ExpiredJwtException e) {
            logger.error("Jwt token is expired:{}",e.getMessage());
        }   catch (IllegalArgumentException e) {
            logger.error("JWT claims string is empty:{}",e.getMessage());
        }

        return false;    // Return false if the token is invalid
    }

    // Method to extract the JWT token from the HTTP request
    public String getJwtToken(HttpServletRequest request) {
        String header = request.getHeader("Authorization");
        String jwtToken = header.replace("Bearer ", "");    // Remove the "Bearer " prefix
        return jwtToken;
    }
}
