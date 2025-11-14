package com.leetcodemini.controller;

import com.leetcodemini.model.User;
import com.leetcodemini.repository.UserRepository;
import com.leetcodemini.util.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/user")
public class AuthController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JwtUtil jwtUtil;

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody Map<String,String> body) {
        String username = body.get("username");
        String email = body.get("email");
        String password = body.get("password");
        if (username == null || email == null || password == null)
            return ResponseEntity.badRequest().body("username, email, password required");

        Optional<User> found = userRepository.findByEmail(email);
        if (found.isPresent()) return ResponseEntity.status(409).body("Email already used");

        User u = new User();
        u.username = username;
        u.email = email;
        u.passwordHash = BCrypt.hashpw(password, BCrypt.gensalt());
        userRepository.save(u);

        String token = jwtUtil.generateToken(u.id);
        return ResponseEntity.ok(Map.of("token", token, "userId", u.id));
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String,String> body) {
        String email = body.get("email");
        String password = body.get("password");
        if (email == null || password == null) return ResponseEntity.badRequest().body("email and password required");
        Optional<User> found = userRepository.findByEmail(email);
        if (found.isEmpty()) return ResponseEntity.status(401).body("invalid credentials");
        User u = found.get();
        if (!BCrypt.checkpw(password, u.passwordHash)) return ResponseEntity.status(401).body("invalid credentials");
        String token = jwtUtil.generateToken(u.id);
        return ResponseEntity.ok(Map.of("token", token, "userId", u.id));
    }
}
