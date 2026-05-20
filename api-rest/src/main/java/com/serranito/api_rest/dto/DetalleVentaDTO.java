package com.serranito.api_rest.dto;

import lombok.*;
import java.math.BigDecimal;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class DetalleVentaDTO {
    private Integer id;
    private Integer idVenta;
    private Integer idProducto;
    private Integer cantidad;
    private BigDecimal precio;
    private BigDecimal subtotal;
}
