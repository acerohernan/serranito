package com.serranito.api_rest.dto;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class EmpresaDTO {
    private Integer id;
    private String ruc;
    private String nombre;
    private String telefono;
    private String direccion;
    private String razonSocial;
}
