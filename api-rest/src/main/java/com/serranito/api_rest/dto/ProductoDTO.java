package com.serranito.api_rest.dto;

import lombok.*;
import java.math.BigDecimal;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ProductoDTO {
    private Integer id;
    private String codigo;
    private String descripcion;
    private Integer stock;
    private BigDecimal precio;
    private Integer idProveedor;
}
