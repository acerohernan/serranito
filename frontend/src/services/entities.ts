import api from "./api";

export interface Cliente {
  id: number;
  dniRuc: string;
  nombre: string;
  telefono?: string;
  direccion?: string;
  razonSocial?: string;
}

export interface Proveedor {
  idProveedor: number;
  ruc: string;
  nombre: string;
  telefono?: string;
  direccion?: string;
  razonSocial?: string;
}

export interface Producto {
  idProducto: number;
  codigo?: string;
  descripcion?: string;
  stock?: number;
  precio?: number;
  idProveedor?: number;
}

export interface Venta {
  idVenta: number;
  idCliente?: number;
  fecha?: string;
  total?: number;
}

export interface Empresa {
  idEmpresa: number;
  ruc?: string;
  nombre?: string;
  telefono?: string;
  direccion?: string;
  razonSocial?: string;
}

const list = async <T>(path: string): Promise<T[]> => {
  const response = await api.get<T[]>(path);
  return response.data;
};

const getOne = async <T>(path: string, id: number): Promise<T> => {
  const response = await api.get<T>(`${path}/${id}`);
  return response.data;
};

const create = async <T>(path: string, payload: T): Promise<T> => {
  const response = await api.post<T>(path, payload);
  return response.data;
};

const update = async <T>(path: string, id: number, payload: T): Promise<T> => {
  const response = await api.put<T>(`${path}/${id}`, payload);
  return response.data;
};

const remove = async (path: string, id: number): Promise<void> => {
  await api.delete(`${path}/${id}`);
};

export const clientesService = {
  list: () => list<Cliente>("/clientes"),
  getOne: (id: number) => getOne<Cliente>("/clientes", id),
  create: (payload: Omit<Cliente, "id">) =>
    create<Omit<Cliente, "id">>("/clientes", payload),
  update: (id: number, payload: Omit<Cliente, "id">) =>
    update<Omit<Cliente, "id">>("/clientes", id, payload),
  remove: (id: number) => remove("/clientes", id),
};

export const proveedoresService = {
  list: () => list<Proveedor>("/proveedores"),
  getOne: (id: number) => getOne<Proveedor>("/proveedores", id),
  create: (payload: Omit<Proveedor, "id_proveedor">) =>
    create<Proveedor>("/proveedores", payload),
  update: (id: number, payload: Omit<Proveedor, "id_proveedor">) =>
    update<Proveedor>("/proveedores", id, payload),
  remove: (id: number) => remove("/proveedores", id),
};

export const productosService = {
  list: () => list<Producto>("/productos"),
  getOne: (id: number) => getOne<Producto>("/productos", id),
  create: (payload: Omit<Producto, "id_producto">) =>
    create<Producto>("/productos", payload),
  update: (id: number, payload: Omit<Producto, "id_producto">) =>
    update<Producto>("/productos", id, payload),
  remove: (id: number) => remove("/productos", id),
};

export const ventasService = {
  list: () => list<Venta>("/ventas"),
  getOne: (id: number) => getOne<Venta>("/ventas", id),
  create: (payload: Omit<Venta, "id_venta">) =>
    create<Venta>("/ventas", payload),
  update: (id: number, payload: Omit<Venta, "id_venta">) =>
    update<Venta>("/ventas", id, payload),
  remove: (id: number) => remove("/ventas", id),
};

export const empresaService = {
  list: () => list<Empresa>("/empresa"),
  getOne: (id: number) => getOne<Empresa>("/empresa", id),
  create: (payload: Omit<Empresa, "id_empresa">) =>
    create<Empresa>("/empresa", payload),
  update: (id: number, payload: Omit<Empresa, "id_empresa">) =>
    update<Empresa>("/empresa", id, payload),
  remove: (id: number) => remove("/empresa", id),
};
