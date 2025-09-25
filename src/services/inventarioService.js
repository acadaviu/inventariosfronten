import { axiosConfig } from '../helpers/axios-config';

const getInventarios = () => {
    return axiosConfig.get('inventario');
}

const createInventario = (data) => {
    return axiosConfig.post('inventario', data);
}

const updateInventario = (inventarioId, data) => {
    return axiosConfig.put(`inventario/${inventarioId}`, data);
}

const getInventarioPorId = (inventarioId) => {
    return axiosConfig.get(`inventario/${inventarioId}`);
}

export {
    getInventarios, createInventario, updateInventario, getInventarioPorId
}

