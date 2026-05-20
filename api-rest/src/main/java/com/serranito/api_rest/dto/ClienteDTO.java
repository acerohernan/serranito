package com.serranito.api_rest.dto;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ClienteDTO {
    private Integer id;
    private String dniRuc;
    private String nombre;
    private String telefono;
    private String direccion;
    private String razonSocial;
}
