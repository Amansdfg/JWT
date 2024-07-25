package kz.kalabay.jwtyt.utils;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import java.time.Duration;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
@Component
public class JwtTokenUtils {
    @Value("${jwt.secret}")
    private String secret;
    @Value("${jwt.expiration}")
    private Duration jwtExpirationTime;
    public String generateToken(UserDetails userDetails) {
        Map<String, Object> claims = new HashMap<>();
        List<String> roles=userDetails.getAuthorities()
                .stream()
                .map(GrantedAuthority::getAuthority)
                .toList();
        claims.put("roles", roles);
        return Jwts.builder()
                .setClaims(claims)
                .setSubject(userDetails.getUsername())
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + jwtExpirationTime.toMillis()))
                .signWith(SignatureAlgorithm.HS256, secret)
                .compact();
    }
    public String getUserName(String token) {
        return getClaimsFromToken(token).getSubject();
    }
    public List<String> getRoles(String token) {
        return getClaimsFromToken(token).get("roles", List.class);
    }

    private Claims getClaimsFromToken(String token) {
        return Jwts.parser()
                .setSigningKey(secret)
                .parseClaimsJws(token)
                .getBody();
    }
}
