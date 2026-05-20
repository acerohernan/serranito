package com.serranito.api_rest.dto;

import lombok.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class VentaDTO {
    private Integer id;
    private Integer idCliente;
    private LocalDateTime fecha;
    private BigDecimal total;
}
