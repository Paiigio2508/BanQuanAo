package com.example.be.controller;
import com.example.be.dto.login.LoginRequest;
import com.example.be.dto.login.LoginRespon;
import com.example.be.entity.NguoiDung;
import com.example.be.service.CustomUserDetailsService;
import com.example.be.util.sercurity.JwtTokenProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
public class AuthController {

    private final AuthenticationManager authenticationManager;
    private final JwtTokenProvider jwtTokenProvider;
    // Inject CustomUserDetailsService
    private final CustomUserDetailsService customUserDetailsService;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword())
            );

            SecurityContextHolder.getContext().setAuthentication(authentication);

            String token = jwtTokenProvider.generateToken(authentication);

            NguoiDung nguoiDung = customUserDetailsService.getNguoiDungByEmail(request.getEmail());
            if (nguoiDung == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
            }

            LoginRespon jwtAuthResponse = new LoginRespon();
            jwtAuthResponse.setAccessToken(token);
            jwtAuthResponse.setEmail(nguoiDung.getEmail());
            jwtAuthResponse.setMa(nguoiDung.getMa());
            jwtAuthResponse.setChucVu(nguoiDung.getChucVu());
            jwtAuthResponse.setTen(nguoiDung.getTen());
            jwtAuthResponse.setAnh(nguoiDung.getAnh());
            jwtAuthResponse.setUserID(nguoiDung.getId());

            return ResponseEntity.ok(jwtAuthResponse);

        } catch (AuthenticationException ex) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid username or password");
        }
    }


}
