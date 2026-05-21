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
  id: number;
  ruc: string;
  nombre: string;
  telefono?: string;
  direccion?: string;
  razonSocial?: string;
}

export interface Producto {
  id: number;
  codigo?: string;
  descripcion?: string;
  stock?: number;
  precio?: number;
  idProveedor?: number;
}

export interface Venta {
  id: number;
  idCliente?: number;
  fecha?: string;
  total?: number;
}

export interface Empresa {
  id?: number | null;
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

const get = async <T>(path: string): Promise<T> => {
  const response = await api.get<T>(path);
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

const updateNoId = async <T>(path: string, payload: T): Promise<T> => {
  const response = await api.put<T>(path, payload);
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
  create: (payload: Omit<Proveedor, "id">) =>
    create<Omit<Proveedor, "id">>("/proveedores", payload),
  update: (id: number, payload: Omit<Proveedor, "id">) =>
    update<Omit<Proveedor, "id">>("/proveedores", id, payload),
  remove: (id: number) => remove("/proveedores", id),
};

export const productosService = {
  list: () => list<Producto>("/productos"),
  getOne: (id: number) => getOne<Producto>("/productos", id),
  create: (payload: Omit<Producto, "id">) =>
    create<Omit<Producto, "id">>("/productos", payload),
  update: (id: number, payload: Omit<Producto, "id">) =>
    update<Omit<Producto, "id">>("/productos", id, payload),
  remove: (id: number) => remove("/productos", id),
};

export const ventasService = {
  list: () => list<Venta>("/ventas"),
  getOne: (id: number) => getOne<Venta>("/ventas", id),
  create: (payload: Omit<Venta, "id">) =>
    create<Omit<Venta, "id">>("/ventas", payload),
  update: (id: number, payload: Omit<Venta, "id">) =>
    update<Omit<Venta, "id">>("/ventas", id, payload),
  remove: (id: number) => remove("/ventas", id),
};

export const empresaService = {
  list: () => list<Empresa>("/empresa"),
  getOne: (id: number) => getOne<Empresa>("/empresa", id),
  getConfig: () => get<Empresa>("/empresa"),
  create: (payload: Omit<Empresa, "id">) =>
    create<Empresa>("/empresa", payload),
  update: (id: number, payload: Omit<Empresa, "id">) =>
    update<Empresa>("/empresa", id, payload),
  saveConfig: (payload: Omit<Empresa, "id">) =>
    updateNoId<Empresa>("/empresa", payload),
  remove: (id: number) => remove("/empresa", id),
};
