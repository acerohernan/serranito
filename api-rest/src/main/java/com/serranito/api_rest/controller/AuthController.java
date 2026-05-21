package com.serranito.api_rest.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.serranito.api_rest.dto.AuthDTO;
import com.serranito.api_rest.dto.LoginDTO;
import com.serranito.api_rest.dto.RegisterDTO;
import com.serranito.api_rest.facade.AuthFacade;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("api/auth")
@RequiredArgsConstructor
public class AuthController {
    private final AuthFacade facade;

    @PostMapping("/login")
    public ResponseEntity<AuthDTO> login(@RequestBody LoginDTO request) {
        return ResponseEntity.ok(facade.login(request));
    }

    @PostMapping("/register")
    public ResponseEntity<AuthDTO> register(@RequestBody RegisterDTO request) {
        return ResponseEntity.ok(facade.register(request));
    }
}
