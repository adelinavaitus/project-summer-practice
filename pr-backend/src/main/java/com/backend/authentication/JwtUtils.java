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

    @Value("${app.jwtSecret}")
    private String jwtSecret;

    @Value("${app.jwtExpirationInMs}")
    private int jwtExpirationMs;

    private static final Logger logger = LoggerFactory.getLogger(JwtUtils.class);


    public String generateJwtToken (Authentication authentication){

        //The getPrincipal() method normally returns UserDetails object in Spring Security, which contains all the details of currently logged in user.
        UserDetailImpl userPrincipal = (UserDetailImpl) authentication.getPrincipal();

        //Returns the authorities granted to the user.
        Collection<? extends GrantedAuthority> authorities = userPrincipal.getAuthorities();

        //se creaza un array list de dimensiunea colectiei de mai sus de autorizari/autoritati
        ArrayList<String> authsList = new ArrayList<>(authorities.size());
        for (GrantedAuthority authority:authorities) {  //pentru fiecare autorizare/autoritate din colectie
            authsList.add(authority.getAuthority());  //se adauga la array list
        }
        
        return Jwts.builder()
                .setSubject(userPrincipal.getEmail())
                .setAudience(String.valueOf((userPrincipal.getId())))
                .setIssuedAt(new Date())
                .setExpiration(new Date((new Date()).getTime()+jwtExpirationMs))
                .signWith(SignatureAlgorithm.HS512, jwtSecret.getBytes(StandardCharsets.UTF_8))
                .compact();
    }

    public String getEmailFromJwt(String token) {
        return Jwts.parser().setSigningKey(jwtSecret.getBytes(StandardCharsets.UTF_8)).parseClaimsJws(token).getBody().getSubject();
    }

    public String getIdFromJwt(String token) {
        return Jwts.parser().setSigningKey(jwtSecret.getBytes(StandardCharsets.UTF_8)).parseClaimsJws(token).getBody().getAudience();
    }

    public boolean validateJwtToken (String authToken){
        try{
            Jwts.parser().setSigningKey(jwtSecret.getBytes(StandardCharsets.UTF_8)).parseClaimsJws(authToken);
            return true;
        } catch(SignatureException e) {
            logger.error("Invalid JWT signature:{}",e.getMessage());
        }catch (MalformedJwtException e) {
            logger.error("Invalid JWT token:{}",e.getMessage());
        }   catch (ExpiredJwtException e) {
            logger.error("Jwt token is expired:{}",e.getMessage());
        }   catch (IllegalArgumentException e) {
            logger.error("JWT claims string is empty:{}",e.getMessage());
        }

        return false;
    }

    public String getJwtToken(HttpServletRequest request) {
        String header = request.getHeader("Authorization");
        String jwtToken = header.replace("Bearer ", "");
        return jwtToken;
    }
}
