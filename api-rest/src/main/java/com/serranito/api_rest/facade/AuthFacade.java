package com.serranito.api_rest.facade;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.serranito.api_rest.dto.AuthDTO;
import com.serranito.api_rest.dto.LoginDTO;
import com.serranito.api_rest.dto.RegisterDTO;
import com.serranito.api_rest.model.Role;
import com.serranito.api_rest.model.User;
import com.serranito.api_rest.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthFacade {
    private final UserRepository userRepository;
    private final JwtFacade jwtFacade;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;

    public AuthDTO login(LoginDTO request) {
        authenticationManager
                .authenticate(new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword()));
        UserDetails user = userRepository.findByUsername(request.getUsername()).orElseThrow();
        String token = jwtFacade.getToken(user);
        return AuthDTO.builder()
                .token(token)
                .build();

    }

    public AuthDTO register(RegisterDTO request) {
        User user = User.builder()
                .username(request.getUsername())
                .password(passwordEncoder.encode(request.getPassword()))
                .firstname(request.getFirstname())
                .lastname(request.getLastname())
                .role(Role.USER)
                .build();

        userRepository.save(user);

        return AuthDTO.builder()
                .token(jwtFacade.getToken(user))
                .build();
    }
}
