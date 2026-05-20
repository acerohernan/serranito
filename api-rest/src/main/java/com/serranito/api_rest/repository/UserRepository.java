package com.serranito.api_rest.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.serranito.api_rest.model.User;

public interface UserRepository extends JpaRepository<User,Integer> {
    Optional<User> findByUsername(String username); 
}