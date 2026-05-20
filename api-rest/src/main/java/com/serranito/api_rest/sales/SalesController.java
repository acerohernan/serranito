package com.serranito.api_rest.sales;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/v1/sales")
@RequiredArgsConstructor
public class SalesController {
    @GetMapping
    public String getSales() {
        return "Sales endpoint";
    }
}
