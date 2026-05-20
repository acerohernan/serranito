package com.serranito.api_rest.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "empresa")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Empresa {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_empresa")
    private Integer idEmpresa;

    @Column(name = "ruc", length = 15)
    private String ruc;

    @Column(name = "nombre", length = 150)
    private String nombre;

    @Column(name = "telefono", length = 15)
    private String telefono;

    @Column(name = "direccion", length = 150)
    private String direccion;

    @Column(name = "razon_social", length = 150)
    private String razonSocial;
}
